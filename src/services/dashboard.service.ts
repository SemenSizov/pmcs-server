import { selectDashboardData } from '../db/dashboard.db';
import { DashboardEntry, DashboardEntryWithStatus, LocationGroup, UnitGroup } from '../types/dashboard';
import { logger } from '../utils/logger';

const getDashboardRawData = async () => {
    const data = await selectDashboardData();
    return data;
};

export const getDashboardData = async (): Promise<LocationGroup[]> => {
    const entries = await getDashboardEntries();
    return groupByLocationAndUnit(entries);
};

const getDashboardEntries = async (): Promise<
    DashboardEntryWithStatus[]
> => {
    const rawData = await getDashboardRawData();
    return rawData.map((entry) => ({
        ...entry,
        status: getStatus(entry),
    })) as DashboardEntryWithStatus[];
};

const getStatus = (
    entry: DashboardEntry,
): 'ok' | 'warning' | 'error' | undefined => {
    if (entry.procedure_type === 'hours') {
        if (!entry.last_log_hours || !entry.last_meter_hours) return undefined;
        return getStatusForHours(entry);
    }
    if (entry.procedure_type === 'period') {
        if (!entry.last_log_date) return undefined;
        return getStatusForPeriod(entry);
    }
};

const getStatusForHours = (
    entry: DashboardEntry,
): 'ok' | 'warning' | 'error' | undefined => {
    const delta =
        entry.last_log_hours + entry.procedure_hours - entry.last_meter_hours;

    if (delta < 25) {
        return 'error';
    }
    if (delta < 45) {
        return 'warning';
    }
    return 'ok';
};

const getStatusForPeriod = (
    entry: DashboardEntry,
): 'ok' | 'warning' | 'error' | undefined => {
    logger.logInfo(JSON.stringify(entry))
    const lastLogDate = entry.last_log_date;
    logger.logInfo(typeof entry.last_log_date)
    switch (entry.procedure_period) {
        case 'weekly':
            if (diffDaysFromToday(lastLogDate) + 7 < 2) {
                return 'error';
            }
            if (diffDaysFromToday(lastLogDate) + 7 < 3) {
                return 'warning';
            }
            return 'ok';
        case 'monthly':
            if (diffDaysFromToday(lastLogDate) + 30 < 3) {
                return 'error';
            }
            if (diffDaysFromToday(lastLogDate) + 30 < 7) {
                return 'warning';
            }
            return 'ok';
        case 'quarterly':
            if (diffDaysFromToday(lastLogDate) + 90 < 10) {
                return 'error';
            }
            if (diffDaysFromToday(lastLogDate) + 90 < 15) {
                return 'warning';
            }
            return 'ok';
        case 'semiannual':
            if (diffDaysFromToday(lastLogDate) + 180 < 15) {
                return 'error';
            }
            if (diffDaysFromToday(lastLogDate) + 180 < 25) {
                return 'warning';
            }
            return 'ok';
        case 'annual':
            if (diffDaysFromToday(lastLogDate) + 360 < 15) {
                return 'error';
            }
            if (diffDaysFromToday(lastLogDate) + 360 < 25) {
                return 'warning';
            }
            return 'ok';
    }
};

function diffDaysFromToday(date: Date) {
    const now = new Date();
    const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const inputUTC = date.getTime();

    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    return Math.round((todayUTC - inputUTC) / MS_PER_DAY);
}

function parseYMDtoUTC(ymd: string) {
    logger.logInfo(`Actual last_log_date value: ${ymd}`)
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
    if (!m) return null;
    const y = +m[1],
        mo = +m[2],
        d = +m[3];
    const dt = new Date(Date.UTC(y, mo - 1, d));
    // Валідація на випадок 2025-02-31 тощо
    if (
        dt.getUTCFullYear() !== y ||
        dt.getUTCMonth() !== mo - 1 ||
        dt.getUTCDate() !== d
    ) {
        return null;
    }
    return dt;
}


function groupByLocationAndUnit(rows: DashboardEntryWithStatus[]): LocationGroup[] {
    const locMap = new Map<number, { name: string; unitMap: Map<string, UnitGroup> }>();

    for (const item of rows) {
        // 1) Група локації
        let loc = locMap.get(item.location_id);
        if (!loc) {
            loc = { name: item.location_name, unitMap: new Map() };
            locMap.set(item.location_id, loc);
        } else if (loc.name !== item.location_name) {
            // за бажанням: перевірка на узгодженість даних
            // console.warn(`Location name mismatch for id=${item.location_id}: '${loc.name}' vs '${item.location_name}'`);
        }

        // 2) Група юніта всередині локації
        let unit = loc.unitMap.get(item.unit_serial);
        if (!unit) {
            unit = { serial: item.unit_serial, equipment_type: item.equipment_type, hours: item.last_meter_hours, entries: [] };
            loc.unitMap.set(item.unit_serial, unit);
        } else if (unit.equipment_type !== item.equipment_type) {
            // якщо тип обладнання відрізняється між записами — залишаємо перший
            // можна обрати іншу політику (наприклад, замінювати, якщо зустрівся новий)
            // unit.equipment_type = item.equipment_type;
        }

        unit.entries.push(item);
    }

    // 3) Перетворення Map -> масивів з збереженням порядку появи
    const result: LocationGroup[] = [];
    for (const [id, { name, unitMap }] of locMap) {
        result.push({
            id,
            name,
            units: Array.from(unitMap.values()),
        });
    }
    return result;
}

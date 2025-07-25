import { selectAllTypes } from '../db/equipmentTypeDb';
import {
    insertProcedure,
    selectAllProcedures,
    deleteProcedure as delete_uprocedure,
    updateProcedure as update_procedure,
} from '../db/procedureDb';
import { Procedure, ProcedureDTO } from '../models/procedure';

export const getProcedures = async (): Promise<ProcedureDTO[]> => {
    const types = await selectAllTypes();
    const procedures = await selectAllProcedures();
    if (!procedures) {
        return [];
    } else {
        const procedureDTOs = procedures.map((p) => {
            const type = types?.find((t) => t.id === +p.unit_type_id)!;
            const procedureDTO: ProcedureDTO = {
                id: p.id,
                name: p.name,
                type: p.type,
                period: p.period,
                hours: p.hours,
                unitType: {
                    id: type.id,
                    name: type.name,
                },
            };
            return procedureDTO;
        });
        return procedureDTOs;
    }
};

export const addProcedure = async (procedure: Procedure) => {
    return insertProcedure(procedure);
};

export const deleteProcedure = async (id: string) => {
    return delete_uprocedure(id);
};

export const updateProcedure = async (procedure: Procedure) => {
    return update_procedure(procedure);
};

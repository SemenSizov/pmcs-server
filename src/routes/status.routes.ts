import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { readFileSync } from 'node:fs';

const router = Router();

const isAlive = async (req: Request, res: Response) => {
    res.send(`I'm alive!`);
};

const getLogs = async (req: Request, res: Response) => {
    const LOG_DIR = './logs';
    const fs = require('node:fs');
    const path = require('node:path');
    const files = fs
        .readdirSync(LOG_DIR)
        .filter((file: string) => file.endsWith('.log'));
    let latestFile = null;
    let latestModifiedTime = 0;

    for (const file of files) {
        const filePath = path.join(LOG_DIR, file);
        try {
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                if (stats.mtimeMs > latestModifiedTime) {
                    latestModifiedTime = stats.mtimeMs;
                    latestFile = file;
                }
            }
        } catch (statErr) {
            console.error(`Error getting stats for ${file}:`, statErr);
        }
    }
    const data = readFileSync(path.join(LOG_DIR, latestFile), 'utf8');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=${latestFile}`);
    res.send(data);
};

router.get('/isAlive', isAlive);
router.get('/get-logs', getLogs);

export default router;

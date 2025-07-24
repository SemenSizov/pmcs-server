import { getAuthResponse } from '../services/auth.service';
import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export const googleAuth = async (req: Request, res: Response) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Missing auth code' });
    }
    try {
        const { responseBody, status } = await getAuthResponse(code);
        return res.status(status).json(responseBody);
    } catch (err) {
        logger.logError('Google auth failed:', err as object);
        res.status(500).json({ error: 'Google auth failed' });
    }
};

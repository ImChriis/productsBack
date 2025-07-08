import { Request, Response } from 'express';
import * as configService from '../services/configuration.service'
import { Configuration } from '../interfaces/configuration.interface';

export const getConfig = async (req: Request, res: Response)  => {
    try {
        const config = await configService.getConfig();
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving configuration' });
    }
};

export const updateConfig = async (req: Request, res: Response): Promise<void> => {
    const idConfiguration = Number(req.params.id);
    const { iva } = req.body as Configuration;

    if (!iva) {
        res.status(400).json({ error: 'IVA is required' });
        return;
    }

    try {
        const updatedConfig = await configService.updateConfig({ idConfiguration, iva });
        res.json(updatedConfig);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};
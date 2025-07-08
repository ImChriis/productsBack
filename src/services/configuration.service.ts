import { db } from '../database';
import { Configuration } from 'src/interfaces/configuration.interface';

export const getConfig = async (): Promise<Configuration[]> => {
    const config = await db.query('SELECT * FROM configuration');
    return config as Configuration[];
};

export const updateConfig = async (configData: Configuration): Promise<Configuration[]> => {
    const { idConfiguration, iva } = configData;
    await db.query(
        'UPDATE configuration SET iva = ? WHERE idConfiguration = ?',
        [iva, idConfiguration]
    );
    return [{ idConfiguration, iva }];
};

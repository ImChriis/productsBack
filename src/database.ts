import { createPool, Pool, PoolConnection } from 'mysql2/promise';

class Database {
    private pool!: Pool;

    constructor() {
        this.pool = createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'inventory',
            connectionLimit: 10,
            waitForConnections: true,
        })
    }

    public async getConnection(): Promise<PoolConnection>{
        return await this.pool.getConnection();
    }

    // Ejemplo de método para consultas
  public async query(sql: string, values?: any[]): Promise<any> {
    const conn = await this.getConnection();
    try {
      const [rows] = await conn.query(sql, values);
      return rows;
    } finally {
      conn.release();
    }
  }
}

export const db = new Database();
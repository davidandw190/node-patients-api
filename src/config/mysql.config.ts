import mysql, { Pool, PoolConfig } from 'mysql';
import dotenv from 'dotenv'

dotenv.config();

/**
 * Configuration options for creating a MySQL connection pool.
 */
const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_database',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0', 10)
};

const pool: Pool = mysql.createPool(poolConfig);

export default pool;
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv'
import { PoolConfig } from './pool.config';

dotenv.config();

/**
 * Configuration options for creating a MySQL connection pool.
 */
export const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'patients',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0', 10)
};

/**
 * Establishes a MySQL connection pool.
 * @returns A Promise that resolves to a MySQL connection pool.
 */
export const connection = async () => {
  try {
    const pool = await createPool(poolConfig);
    return pool;
    
  } catch (error) {
    console.error('Error establishing database connection pool:', error);
    throw error;
  }
};
export interface PoolConfig {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
    connectionLimit: number,
    queueLimit: number
  };
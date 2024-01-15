import path from 'node:path';
import { DataSourceOptions } from 'typeorm';

export class DatabaseConfig {
    static configure(): DataSourceOptions {
        return {
            type: "sqlite",
            database: path.resolve('src', 'db', 'sqlite3')
        }
    }
}
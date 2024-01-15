import path from 'node:path'
import { type DataSourceOptions } from 'typeorm'
import { OutputServer } from '../models/OutputServer'

export class DatabaseConfig {
  static configure (): DataSourceOptions {
    return {
      type: 'sqlite',
      synchronize: true,
      database: path.resolve('src', 'db', 'sqlite3'),
      entities: [
        OutputServer
      ]
    }
  }
}

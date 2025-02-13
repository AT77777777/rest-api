import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../config/config.type';

import * as path from 'node:path';
import * as process from 'node:process';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.name,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}

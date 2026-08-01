import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const CONFIG = 'CONFIG';

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: 'postgres';
  url: string;
  username: string;
  password: string;
}

export const configProvider = {
  provide: CONFIG,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      driver: configService.getOrThrow<'postgres'>('DATABASE_DRIVER'),
      url: configService.getOrThrow<string>('DATABASE_URL'),
      username: configService.getOrThrow<string>('DATABASE_USERNAME'),
      password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
    },
  }),
};

@Module({
  providers: [configProvider],
  exports: [CONFIG],
})
export class AppConfigModule {}

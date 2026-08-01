import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { AppConfig, AppConfigModule, CONFIG } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/film.entity';
import { Schedule } from './films/schedule.entity';
import { FilmsPostgresRepository } from './repository/films.repository';
import { FILMS_REPOSITORY } from './repository/films.repository.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [CONFIG],
      useFactory: (config: AppConfig) => ({
        type: config.database.driver,
        url: config.database.url,
        username: config.database.username,
        password: config.database.password,
        entities: [Film, Schedule],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    FilmsService,
    OrderService,
    {
      provide: FILMS_REPOSITORY,
      useClass: FilmsPostgresRepository,
    },
  ],
})
export class AppModule {}

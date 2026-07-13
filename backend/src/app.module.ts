import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/film.entity';
import { Schedule } from './films/schedule.entity';
import { FilmsPostgresRepository } from './repository/films.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.getOrThrow<'postgres'>('DATABASE_DRIVER'),
        url: configService.get<string>('DATABASE_URL'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
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
    configProvider,
    FilmsService,
    OrderService,
    FilmsPostgresRepository,
  ],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as path from 'node:path';
// import { configProvider } from './app.config.provider';
// import { FilmsController } from './films/films.controller';
// import { FilmsService } from './films/films.service';
// import { OrderController } from './order/order.controller';
// import { OrderService } from './order/order.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Film, FilmSchema } from './films/film.schema';
// import { FilmsMongoDbRepository } from './repository/films.repository';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       cache: true,
//     }),
//     MongooseModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         uri: configService.get<string>('DATABASE_URL'),
//       }),
//     }),
//     MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
//     ServeStaticModule.forRoot({
//       rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
//       serveRoot: '/content/afisha',
//     }),
//     // @todo: Добавьте раздачу статических файлов из public
//   ],
//   controllers: [FilmsController, OrderController],
//   providers: [
//     configProvider,
//     FilmsService,
//     OrderService,
//     FilmsMongoDbRepository,
//   ],
// })
// export class AppModule {}

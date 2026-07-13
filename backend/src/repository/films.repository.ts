import { InjectRepository } from '@nestjs/typeorm';
import { FilmsRepository } from './films.repository.interface';
import { Film } from 'src/films/film.entity';
import { Repository } from 'typeorm';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import { Injectable } from '@nestjs/common';
import { GetFilmScheduleDto } from 'src/films/dto/get-schedule.dto';
import { Schedule } from 'src/films/schedule.entity';

@Injectable()
export class FilmsPostgresRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<GetFilmsDto> {
    const [items, total] = await this.filmRepository.findAndCount();

    return {
      total,
      items,
    };
  }

  async findById(id: string): Promise<GetFilmScheduleDto | null> {
    const film = await this.filmRepository.findOne({
      where: { id: id },
      relations: { schedules: true },
      order: {
        schedules: {
          daytime: 'ASC',
        },
      },
    });

    if (!film) {
      return null;
    }

    const items = film.schedules;
    const total = film.schedules.length;

    return {
      total,
      items,
    };
  }

  async updateSeats(id: string, seats: string): Promise<void> {
    const session = await this.scheduleRepository.findOneBy({ id });
    const taken = session.taken;
    taken.push(seats);
    await this.scheduleRepository.save(session);
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Film } from '../films/film.schema';
// import { FilmsRepository } from './films.repository.interface';
// import { GetFilmsDto } from 'src/films/dto/get-films.dto';
// import {
//   GetScheduleItemDto,
//   GetFilmScheduleDto,
// } from 'src/films/dto/get-schedule.dto';

// @Injectable()
// export class FilmsMongoDbRepository implements FilmsRepository {
//   constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

//   private getFilmMapperFn() {
//     return (film: Film) => ({
//       id: film.id,
//       rating: film.rating,
//       director: film.director,
//       tags: film.tags,
//       title: film.title,
//       about: film.about,
//       description: film.description,
//       image: film.image,
//       cover: film.cover,
//     });
//   }

//   private getfilmScheduleMapperFn() {
//     return (filmSchedule: GetScheduleItemDto) => ({
//       id: filmSchedule.id,
//       daytime: filmSchedule.daytime,
//       hall: filmSchedule.hall,
//       rows: filmSchedule.rows,
//       seats: filmSchedule.seats,
//       price: filmSchedule.price,
//       taken: filmSchedule.taken,
//     });
//   }

//   async findAll(): Promise<GetFilmsDto> {
//     const items = await this.filmModel.find({});
//     const total = await this.filmModel.countDocuments();
//     return {
//       total,
//       items: items.map(this.getFilmMapperFn()),
//     };
//   }

//   async findById(id: string): Promise<GetFilmScheduleDto | null> {
//     const film = await this.filmModel.findOne({ id });
//     if (!film) {
//       return null;
//     }
//     const total = film.schedule.length;
//     return {
//       total,
//       items: film.schedule.map(this.getfilmScheduleMapperFn()),
//     };
//   }

//   async updateSeats(sessionId: string, seat: string): Promise<void> {
//     await this.filmModel.findOneAndUpdate(
//       { 'schedule.id': sessionId },
//       { $push: { 'schedule.$.taken': seat } },
//     );
//   }
// }

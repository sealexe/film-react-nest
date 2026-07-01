import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from '../films/film.schema';
import { FilmsRepository } from './films.repository.interface';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import {
  GetScheduleItemDto,
  GetFilmScheduleDto,
} from 'src/films/dto/get-schedule.dto';

@Injectable()
export class FilmsMongoDbRepository implements FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  private getFilmMapperFn() {
    return (film: Film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    });
  }

  private getfilmScheduleMapperFn() {
    return (filmSchedule: GetScheduleItemDto) => ({
      id: filmSchedule.id,
      daytime: filmSchedule.daytime,
      hall: filmSchedule.hall,
      rows: filmSchedule.rows,
      seats: filmSchedule.seats,
      price: filmSchedule.price,
      taken: filmSchedule.taken,
    });
  }

  async findAll(): Promise<GetFilmsDto> {
    const items = await this.filmModel.find({});
    const total = await this.filmModel.countDocuments();
    return {
      total,
      items: items.map(this.getFilmMapperFn()),
    };
  }

  async findById(id: string): Promise<GetFilmScheduleDto | null> {
    const film = await this.filmModel.findOne({ id });
    if (!film) {
      return null;
    }
    const total = film.schedule.length;
    return {
      total,
      items: film.schedule.map(this.getfilmScheduleMapperFn()),
    };
  }

  async updateSeats(sessionId: string, seat: string): Promise<void> {
    await this.filmModel.findOneAndUpdate(
      { 'schedule.id': sessionId },
      { $push: { 'schedule.$.taken': seat } },
    );
  }
}

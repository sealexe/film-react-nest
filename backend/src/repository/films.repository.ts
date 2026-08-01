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

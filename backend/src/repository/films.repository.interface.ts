import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import { GetFilmScheduleDto } from 'src/films/dto/get-schedule.dto';

export interface FilmsRepository {
  findAll(): Promise<GetFilmsDto>;
  findById(id: string): Promise<GetFilmScheduleDto | null>;
}

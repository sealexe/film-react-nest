import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsPostgresRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsPostgresRepository) {}

  async findAll() {
    return this.filmsRepository.findAll();
  }

  async findById(id: string) {
    const film = await this.filmsRepository.findById(id);
    if (!film) {
      throw new NotFoundException('Фильм не найден!');
    }
    return film;
  }
}

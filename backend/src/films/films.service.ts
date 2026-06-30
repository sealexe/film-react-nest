import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}

  async findAll() {
    return this.filmsRepository.findAll();
  }

  async findById(id: string) {
    return this.filmsRepository.findById(id);
  }
}

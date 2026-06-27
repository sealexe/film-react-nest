import { Controller, Get, Param } from '@nestjs/common';
import { FilmDto, FilmsDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  @Get()
  findAll(): FilmsDto {
    return {
      total: 1,
      items: [
        {
          id: '1',
          rating: 8.5,
          director: 'Тест',
          tags: ['Драма'],
          title: 'Тестовый фильм',
          about: 'Описание',
          description: 'Полное описание',
          image: '/bg1s.jpg',
          cover: '/bg1c.jpg',
        },
      ],
    };
  }

  @Get(':id/schedule')
  findById(@Param('id') id: string): FilmDto {
    return {
      id: id,
      rating: 0,
      director: '',
      tags: [],
      title: 'Id route test',
      about: '',
      description: '',
      image: '',
      cover: '',
    };
  }
}

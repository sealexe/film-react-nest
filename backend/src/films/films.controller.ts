import { Controller, Get, Param } from '@nestjs/common';
import { GetFilmsDto } from './dto/get-films.dto';
import { GetFilmScheduleDto } from './dto/get-schedule.dto';

@Controller('films')
export class FilmsController {
  @Get()
  findAll(): GetFilmsDto {
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
  findById(@Param('id') _id: string): GetFilmScheduleDto {
    return {
      total: 0,
      items: [
        {
          id: '',
          daytime: '',
          hall: 0,
          rows: 0,
          seats: 0,
          price: 0,
          taken: [],
        },
      ],
    };
  }
}

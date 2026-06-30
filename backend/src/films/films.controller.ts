import { Controller, Get, Param } from '@nestjs/common';
import { GetFilmsDto } from './dto/get-films.dto';
import { GetFilmScheduleDto } from './dto/get-schedule.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}
  @Get()
  findAll(): Promise<GetFilmsDto> {
    return this.filmService.findAll();
  }

  @Get(':id/schedule')
  findById(@Param('id') id: string): Promise<GetFilmScheduleDto> {
    return this.filmService.findById(id);
  }
}

import { GetFilmDto } from './dto/get-films.dto';
import { GetFilmScheduleDto } from './dto/get-schedule.dto';

const film: GetFilmDto = {
  id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  rating: 2.9,
  director: 'Итан Райт',
  tags: ['Документальный'],
  title: 'Архитекторы общества',
  about:
    'Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.',
  description:
    'Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.',
  image: '/bg3s.jpg',
  cover: '/bg3c.jpg',
};

const films = {
  page: 1,
  size: 1,
  total: 1,
  items: [film],
};

const filmSchedule: GetFilmScheduleDto = {
  total: 1,
  items: [
    {
      id: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
      daytime: '2024-06-30T18:00:53+03:00',
      hall: 2,
      rows: 5,
      seats: 10,
      price: 350,
      taken: ['2:9', '2:10'],
    },
  ],
};

export const fixtures = {
  film,
  films,
  filmSchedule,
};

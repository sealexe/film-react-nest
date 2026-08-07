import { GetFilmScheduleDto } from 'src/films/dto/get-schedule.dto';
import {
  CreateOrderDto,
  PostOrderDto,
  PostOrdersDto,
} from './dto/post-order.dto';

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

const postOrder: PostOrderDto = {
  film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  session: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
  daytime: '2024-06-30T18:00:53+03:00',
  row: 1,
  seat: 5,
  price: 350,
  day: '30 июня',
  time: '11:00',
};

const createOrder: CreateOrderDto = {
  email: 'test@test.ru',
  phone: '+79031111111',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
      daytime: '2024-06-30T18:00:53+03:00',
      row: 1,
      seat: 5,
      price: 350,
      day: '30 июня',
      time: '11:00',
    },
  ],
};

const createdOrder: PostOrdersDto = {
  total: 1,
  items: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
      daytime: '2024-06-30T18:00:53+03:00',
      row: 1,
      seat: 5,
      price: 350,
      day: '30 июня',
      time: '11:00',
      id: 'b3f958ba-a1a3-4201-a57b-1cba642cdc62',
    },
  ],
};

export const fixtures = {
  postOrder,
  createOrder,
  createdOrder,
  filmSchedule,
};

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PostOrderDto, PostOrdersDto } from './dto/post-order.dto';
import { FilmsPostgresRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsPostgresRepository) {}

  async createOrder(orders: PostOrderDto[]): Promise<PostOrdersDto> {
    const items = [];
    for (const order of orders) {
      const { session, row, seat } = order;
      const takenSeat = `${row}:${seat}`;

      const film = await this.filmsRepository.findById(order.film);

      if (!film) {
        throw new NotFoundException('Фильм не найден!');
      }

      const schedule = film.items;
      const targetSession = schedule.find((item) => item.id === session);

      if (!targetSession) {
        throw new NotFoundException('Сеанс не найден');
      }

      if (targetSession.taken.includes(takenSeat)) {
        throw new BadRequestException('Место уже занято');
      }
      items.push({ ...order, id: randomUUID() });
      await this.filmsRepository.updateSeats(targetSession.id, takenSeat);
    }
    return {
      total: items.length,
      items,
    };
  }
}

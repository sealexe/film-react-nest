import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto, OrdersDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  @Post()
  create(@Body() _body: OrderDto[]): OrdersDto {
    return {
      total: 0,
      items: [],
    };
  }
}

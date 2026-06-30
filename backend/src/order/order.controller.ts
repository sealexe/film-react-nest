import { Body, Controller, Post } from '@nestjs/common';
import { PostOrderDto, PostOrdersDto } from './dto/post-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  create(@Body() body: PostOrderDto[]): Promise<PostOrdersDto> {
    return this.orderService.createOrder(body);
  }
}

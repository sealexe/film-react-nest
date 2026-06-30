//TODO реализовать DTO для /orders

export class PostOrderDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  id?: string;
}

export class PostOrdersDto {
  total: number;
  items: PostOrderDto[];
}

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: PostOrderDto[];
}

//TODO реализовать DTO для /orders

import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Matches,
} from 'class-validator';

export class PostOrderDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsOptional()
  @IsString()
  id?: string;
}

export class PostOrdersDto {
  @IsNumber()
  total: number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostOrderDto)
  items: PostOrderDto[];
}

export class CreateOrderDto {
  @IsEmail()
  email: string;
  @IsString()
  @Matches(/^\+7\d{10}$/)
  phone: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostOrderDto)
  tickets: PostOrderDto[];
}

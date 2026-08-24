import { TestingModule, Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { fixtures } from './order.fixtures';
import * as crypto from 'crypto';

describe('OrderController', () => {
  let controller: OrderController;
  const updateSeatsMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .useMocker((token) => {
        if (token === 'FILMS_REPOSITORY') {
          return {
            findById: jest.fn().mockResolvedValue(fixtures.filmSchedule),
            updateSeats: updateSeatsMock,
          };
        }
        throw new Error(`Token ${token.toString()} not found!`);
      })
      .compile();
    controller = module.get<OrderController>(OrderController);
  });

  it('заказ должен создаваться', async () => {
    jest
      .spyOn(crypto, 'randomUUID')
      .mockReturnValue('b3f958ba-a1a3-4201-a57b-1cba642cdc62');
    const result = await controller.create(fixtures.createOrder);
    expect(result).toEqual(fixtures.createdOrder);
    expect(updateSeatsMock).toHaveBeenCalledTimes(1);
    expect(updateSeatsMock).toHaveBeenCalledWith(
      '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
      '1:5',
    );
  });
});

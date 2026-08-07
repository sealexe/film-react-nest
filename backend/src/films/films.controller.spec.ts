import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { fixtures } from './films.fixtures';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .useMocker((token) => {
        if (token === 'FILMS_REPOSITORY') {
          return {
            findAll: jest.fn().mockResolvedValue(fixtures.films),
            findById: jest.fn().mockResolvedValue(fixtures.filmSchedule),
          };
        }
        throw new Error(`Token ${token.toString()} not found!`);
      })
      .compile();
    controller = module.get<FilmsController>(FilmsController);
  });

  it('должны находиться все фильмы', async () => {
    expect(controller).toBeDefined();
    const result = await controller.findAll();
    expect(result).toEqual(fixtures.films);
  });

  it('должно открываться конкретное распиание', async () => {
    expect(controller).toBeDefined();
    const result = await controller.findById(
      '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
    );
    expect(result).toEqual(fixtures.filmSchedule);
  });
});

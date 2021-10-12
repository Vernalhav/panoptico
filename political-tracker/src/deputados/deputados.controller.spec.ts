import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeputadosController } from './deputados.controller';

describe('DeputadosController', () => {
  let controller: DeputadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'data/database.sqlite3',
      })],
      controllers: [DeputadosController],
    }).compile();

    controller = module.get<DeputadosController>(DeputadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  }, 10000);
});

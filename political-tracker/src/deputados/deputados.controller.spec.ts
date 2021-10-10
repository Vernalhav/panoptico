import { Test, TestingModule } from '@nestjs/testing';
import { DeputadosController } from './deputados.controller';

describe('DeputadosController', () => {
  let controller: DeputadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeputadosController],
    }).compile();

    controller = module.get<DeputadosController>(DeputadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

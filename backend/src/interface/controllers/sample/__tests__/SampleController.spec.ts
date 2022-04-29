import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from '../SampleController';
import { SampleUseCase } from '../../../../application/usecases/sample/SampleUseCase';

describe('SampleController', () => {
  let sampleController: SampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
      providers: [SampleUseCase],
    }).compile();

    sampleController = app.get<SampleController>(SampleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sampleController.getHello()).toBe('Hello World!');
    });
  });
});

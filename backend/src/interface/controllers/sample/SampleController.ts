import { Controller, Post } from '@nestjs/common';
import { SampleRepository } from 'src/interface/repository/sample/SampleRepository';
import { SampleUseCase } from '../../../application/usecases/sample/SampleUseCase';

@Controller()
export class SampleController {
  @Post()
  save(): string {
    const usecase = new SampleUseCase(new SampleRepository());
    usecase.execute();

    return 'completed!!';
  }
}

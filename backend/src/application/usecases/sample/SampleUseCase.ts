import { ISampleRepository } from 'src/application/repository/ISampleRepository';
import { Sample } from 'src/domain/sample/Sample';

export class SampleUseCase {
  // private sampleRepository: ISampleRepository;

  constructor(private readonly sampleRepository: ISampleRepository) {
    // this.sampleRepository = sampleRepository;
  }

  execute(): void {
    const domain = new Sample('Hello World');
    this.sampleRepository.save(domain);
  }
}

import { ISampleRepository } from 'src/application/repository/ISampleRepository';
import { Sample } from 'src/domain/sample/Sample';

export class SampleUseCase {
  constructor(private readonly sampleRepository: ISampleRepository) {}

  execute(): void {
    const domain = new Sample('Hello World');
    this.sampleRepository.save(domain);
  }
}

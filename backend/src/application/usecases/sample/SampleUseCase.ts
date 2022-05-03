import { ISampleRepository } from "../../../../src/application/repository/ISampleRepository";
import { Sample } from "../../../domain/sample/Sample";

export class SampleUseCase {
  constructor(private readonly sampleRepository: ISampleRepository) {}

  async execute(name: string): Promise<void> {
    const domain = new Sample(name);
    await this.sampleRepository.save(domain);
  }
}

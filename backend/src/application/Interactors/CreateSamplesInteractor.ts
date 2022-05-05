import { ISampleRepository } from "../../domain/repository/ISampleRepository";
import { Sample } from "../../domain/sample/Sample";
import { ICreateSampleUseCase } from "../usecases/sample/CreateSample/ICreateSampleUseCase";
import { InputData } from "../usecases/sample/CreateSample/InputData";

export class CreateSampleInteractor implements ICreateSampleUseCase<InputData> {
  constructor(private readonly sampleRepository: ISampleRepository) {}

  async execute(inputData: InputData): Promise<void> {
    const domain = new Sample(inputData.name);
    await this.sampleRepository.save(domain);
  }
}

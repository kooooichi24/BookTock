import { ISampleRepository } from "../../domain/repository/ISampleRepository";
import { IGetAllSamplesUseCase } from "../usecases/sample/GetAllSamples/IGetAllSamplesUseCase";
import { OutputData } from "../usecases/sample/GetAllSamples/OutputData";
import { Sample } from "../../domain/sample/Sample";

export class GetAllSamplesInteractor implements IGetAllSamplesUseCase<OutputData[]> {
  constructor(private readonly sampleRepository: ISampleRepository) {}

  async execute(): Promise<OutputData[]> {
    const samples = await this.sampleRepository.findAll();

    return samples.map((sample: Sample) => new OutputData(sample));
  }
}

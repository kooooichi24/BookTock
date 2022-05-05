export interface IGetAllSamplesUseCase<OutputData> {
  execute(): Promise<OutputData>;
}
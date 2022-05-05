export interface ICreateSampleUseCase<InputData> {
  execute(inputData: InputData): Promise<void>;
}

import { UseCase } from "../../UseCase";
import { InputData } from "./InputData";

export interface ICreateSampleUseCase extends UseCase<InputData, void> {
  execute(inputData: InputData): Promise<void>;
}

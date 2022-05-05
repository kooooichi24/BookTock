import { UseCase } from "../../UseCase";
import { OutputData } from "./OutputData";

export interface IGetAllSamplesUseCase extends UseCase<undefined, OutputData[]> {
  execute(): Promise<OutputData[]>;
}

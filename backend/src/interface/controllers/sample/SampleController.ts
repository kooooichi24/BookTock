import { SampleRepository } from "src/interface/repository/sample/SampleRepository";
import { SampleUseCase } from "../../../application/usecases/sample/SampleUseCase";

export class SampleController {
  save(): string {
    const usecase = new SampleUseCase(new SampleRepository());
    usecase.execute();

    return "completed!";
  }
}

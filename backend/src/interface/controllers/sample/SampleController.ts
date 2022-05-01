import {
  ControllerRequest,
  ControllerResponse,
} from "src/infrastructure/LambdaApiGatewayAdapter";
import { SampleRepository } from "src/interface/repository/sample/SampleRepository";
import { SampleUseCase } from "../../../application/usecases/sample/SampleUseCase";

export class SampleController {
  async save(request: ControllerRequest): Promise<ControllerResponse> {
    const name = request.body.name;
    const usecase = new SampleUseCase(new SampleRepository());
    await usecase.execute(name);

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
      },
      body: "Created",
    };
  }
}

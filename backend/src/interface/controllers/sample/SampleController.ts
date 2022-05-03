import {
  ControllerRequest,
  ControllerResponse,
} from "../../../../src/infrastructure/LambdaApiGatewayAdapter";
import { SampleUseCase } from "../../../../src/application/usecases/sample/SampleUseCase";
import { SampleRepository } from "../../../infrastructure/database/typeorm/repository/SampleRepository";

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
      body: {
        message: "Created",
      },
    };
  }
}

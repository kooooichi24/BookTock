import {
  ControllerRequest,
  ControllerResponse,
} from "../../../../src/infrastructure/LambdaApiGatewayAdapter";
import { SampleUseCase } from "../../../../src/application/usecases/sample/SampleUseCase";
import { SampleRepository } from "../../../infrastructure/database/typeorm/repository/SampleRepository";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";

export class SampleController {
  async save(request: ControllerRequest): Promise<ControllerResponse> {
    const name = request.body.name;
    
    await AppDataSource.initialize();
    const usecase = new SampleUseCase(new SampleRepository(AppDataSource));
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

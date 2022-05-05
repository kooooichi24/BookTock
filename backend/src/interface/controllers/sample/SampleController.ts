import {
  ControllerRequest,
  ControllerResponse,
} from "../../../../src/infrastructure/LambdaApiGatewayAdapter";
import { SampleRepository } from "../../../infrastructure/database/typeorm/repository/SampleRepository";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";
import { GetAllSamplesInteractor } from "../../../application/Interactors/GetAllSamplesInteractor";
import { CreateSampleInteractor } from "../../../application/Interactors/CreateSamplesInteractor";
import { InputData } from "../../../application/usecases/sample/CreateSample/InputData";

export class SampleController {
  async save(request: ControllerRequest): Promise<ControllerResponse> {
    const name = request.body.name;

    const usecase = new CreateSampleInteractor(
      new SampleRepository(AppDataSource)
    );
    const inputData = new InputData(name)
    await usecase.execute(inputData);

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

  async getAll(_: ControllerRequest): Promise<ControllerResponse> {
    const usecase = new GetAllSamplesInteractor(
      new SampleRepository(AppDataSource)
    );
    const result = await usecase.execute();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        data: result,
      },
    };
  }
}

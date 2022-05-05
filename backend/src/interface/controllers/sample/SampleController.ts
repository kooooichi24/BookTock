import {
  ControllerRequest,
  ControllerResponse,
} from "../../../../src/infrastructure/LambdaApiGatewayAdapter";
import { SampleRepository } from "../../../infrastructure/database/typeorm/repository/SampleRepository";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";
import { GetAllSamplesInteractor } from "../../../application/Interactors/GetAllSamplesInteractor";
import { CreateSampleInteractor } from "../../../application/Interactors/CreateSamplesInteractor";
import { InputData } from "../../../application/usecases/sample/CreateSample/InputData";
import { ICreateSampleUseCase } from "../../../application/usecases/sample/CreateSample/ICreateSampleUseCase";
import { IGetAllSamplesUseCase } from "../../../application/usecases/sample/GetAllSamples/IGetAllSamplesUseCase";

export class SampleController {
  private readonly createSampleUseCase: ICreateSampleUseCase;
  private readonly getAllSamplesUseCase: IGetAllSamplesUseCase;

  constructor() {
    this.createSampleUseCase = new CreateSampleInteractor(
      new SampleRepository(AppDataSource)
    );
    this.getAllSamplesUseCase = new GetAllSamplesInteractor(
      new SampleRepository(AppDataSource)
    );
  }

  async save(request: ControllerRequest): Promise<ControllerResponse> {
    const name: string = request.body.name;

    const inputData = new InputData(name);
    await this.createSampleUseCase.execute(inputData);

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
    const result = await this.getAllSamplesUseCase.execute();

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

import "./load-config";

import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { SampleController } from "./src/interface/controllers/sample/SampleController";
import { LambdaApiGatewayAdapter } from "./src/infrastructure/LambdaApiGatewayAdapter";
import { AppDataSource } from "./src/infrastructure/database/typeorm/data-source";

const lambdaAdapter = new LambdaApiGatewayAdapter();

const sampleController = new SampleController();
export async function saveSample(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  await AppDataSource.initialize();

  return lambdaAdapter.execute(
    event,
    sampleController.save.bind(sampleController)
  );
}

export async function getAllSamples(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  await AppDataSource.initialize();

  return lambdaAdapter.execute(
    event,
    sampleController.getAll.bind(sampleController)
  );
}

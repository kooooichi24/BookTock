import "./load-config";

import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { SampleController } from "./src/interface/controllers/sample/SampleController";
import { LambdaApiGatewayAdapter } from "./src/infrastructure/LambdaApiGatewayAdapter";

const lambdaAdapter = new LambdaApiGatewayAdapter();

const sampleController = new SampleController();
export async function saveSample(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  return lambdaAdapter.execute(
    event,
    sampleController.save.bind(sampleController)
  );
}

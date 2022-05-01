import Lambda from "aws-lambda";
import { SampleController } from "./src/interface/controllers/sample/SampleController";
import { LambdaApiGatewayAdapter } from "./src/infrastructure/LambdaApiGatewayAdapter";

const lambdaAdapter = new LambdaApiGatewayAdapter();

const sampleController = new SampleController();
// export async function getSamples(
//   event: Lambda.APIGatewayEvent
// ): Promise<Lambda.APIGatewayProxyResult> {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       todos: "",
//     }),
//   };
// }

export async function saveSample(
  event: Lambda.APIGatewayEvent
): Promise<Lambda.APIGatewayProxyResult> {
  return lambdaAdapter.execute(
    event,
    sampleController.save.bind(sampleController)
  );
}

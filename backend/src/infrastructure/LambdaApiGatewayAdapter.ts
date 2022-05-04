import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export class LambdaApiGatewayAdapter {
  async execute(
    event: APIGatewayProxyEvent,
    controllerAction: any
  ): Promise<APIGatewayProxyResult> {
    // convert event to controller request
    const controllerRequest = this.toControllerRequest(event);

    // exucute controller
    const controllerResponse: ControllerResponse = await controllerAction(
      controllerRequest
    );

    // convert controller result to ApiGatewayProxyRexult
    return this.toApiGatewayProxyResult(controllerResponse);
  }

  private toControllerRequest(event: APIGatewayProxyEvent): ControllerRequest {
    return {
      pathParameters: event.pathParameters ?? {},
      queryStringParameters: event.queryStringParameters ?? {},
      body: event.body ? JSON.parse(event.body) : {},
      headers: event.headers ?? {},
    };
  }

  private toApiGatewayProxyResult(
    controllerResponse: ControllerResponse
  ): APIGatewayProxyResult {
    const result: APIGatewayProxyResult = {
      statusCode: controllerResponse.statusCode,
      headers: controllerResponse.headers,
      body: JSON.stringify(controllerResponse.body),
    };

    return result;
  }
}

export interface ControllerRequest {
  pathParameters: any;
  queryStringParameters: any;
  body: any;
  headers: any;
}

export interface ControllerResponse {
  statusCode: number;
  headers: {
    [header: string]: boolean | number | string;
  };
  body: any;
}

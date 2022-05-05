import { ControllerResponse, LambdaApiGatewayAdapter } from "../../../src/infrastructure/LambdaApiGatewayAdapter";

describe("LambdaApiGatewayAdapter.test.ts", () => {
  describe("execute", () => {
    it("正常系", async () => {
      // Arrange
      const event: any = {
        body: "",
        headers: {},
        pathParameters: null,
        queryStringParameters: null,
      };
      const controllerAction = (): ControllerResponse => {
        return {
          statusCode: 200,
          headers: {},
          body: {},
        };
      };

      // Act
      const target = new LambdaApiGatewayAdapter();
      const actual = await target.execute(event, controllerAction);

      // Assert
      expect(actual).toEqual({
        statusCode: 200,
        headers: {},
        body: "{}",
      });
    });
  });
});

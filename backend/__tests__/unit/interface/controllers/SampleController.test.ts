import { SampleUseCase } from "../../../../src/application/usecases/sample/SampleUseCase";
import { ControllerRequest, ControllerResponse } from "../../../../src/infrastructure/LambdaApiGatewayAdapter";
import { SampleController } from "../../../../src/interface/controllers/sample/SampleController";

describe("SampleController.ts", () => {
  describe("save", () => {
    it("正常系", async () => {
      // Arrange
      const spy = jest
        .spyOn(SampleUseCase.prototype, "execute")
        .mockResolvedValue();

      const request: ControllerRequest = {
        pathParameters: {},
        queryStringParameters: {},
        body: {
          name: "test-name",
        },
        headers: {},
      };

      // Act
      const target = new SampleController();
      const actual = await target.save(request);

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("test-name");
      expect(actual).toStrictEqual({
        statusCode: 201,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          message: "Created",
        },
      } as ControllerResponse);
    });
  });
});

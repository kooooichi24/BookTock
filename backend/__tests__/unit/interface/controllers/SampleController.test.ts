import {
  ControllerRequest,
  ControllerResponse,
} from "../../../../src/infrastructure/LambdaApiGatewayAdapter";
import { SampleController } from "../../../../src/interface/controllers/sample/SampleController";
import { GetAllSamplesInteractor } from "../../../../src/application/Interactors/GetAllSamplesInteractor";
import { CreateSampleInteractor } from "../../../../src/application/Interactors/CreateSamplesInteractor";
import { InputData } from "../../../../src/application/usecases/sample/CreateSample/InputData";

describe("SampleController.ts", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("save", () => {
    it("正常系", async () => {
      // Arrange
      const spy = jest
        .spyOn(CreateSampleInteractor.prototype, "execute")
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
      expect(spy).toHaveBeenCalledWith(new InputData("test-name"));
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

  describe("find", () => {
    it("正常系", async () => {
      // Arrange
      const expected = [
        {
          // id: "1",
          name: "test1",
          // createdAt: "2020-01-01 00:00:00",
          // updatedAt: "2020-01-01 00:00:00",
        },
      ];
      const spy = jest
        .spyOn(GetAllSamplesInteractor.prototype, "execute")
        .mockResolvedValue(expected);

      const request: ControllerRequest = {
        pathParameters: {},
        queryStringParameters: {},
        body: {},
        headers: {},
      };

      // Act
      const target = new SampleController();
      const actual = await target.find(request);

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual({
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          data: expected,
        },
      } as ControllerResponse);
    });
  });
});

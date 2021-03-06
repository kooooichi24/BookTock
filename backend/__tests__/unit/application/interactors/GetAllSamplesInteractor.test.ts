import { GetAllSamplesInteractor } from "../../../../src/application/Interactors/GetAllSamplesInteractor";
import { OutputData } from "../../../../src/application/usecases/sample/GetAllSamples/OutputData";
import { Sample } from "../../../../src/domain/sample/Sample";
import { SampleRepository } from "../../../../src/interface/repository/SampleRepository";

describe("GetAllSamplesInteractor.test.ts", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("execute", () => {
    it("正常系", async () => {
      // Arrange
      const responseSample = new Sample("test-name");
      const spy = jest
        .spyOn(SampleRepository.prototype, "findAll")
        .mockResolvedValue([responseSample]);
      const expected = [new OutputData(responseSample)];

      // Act
      const target = new GetAllSamplesInteractor(
        new SampleRepository()
      );
      const actual = await target.execute();

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual(expected);
    });
  });
});

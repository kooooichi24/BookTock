import { CreateSampleInteractor } from "../../../../src/application/Interactors/CreateSamplesInteractor";
import { InputData } from "../../../../src/application/usecases/sample/CreateSample/InputData";
import { Sample } from "../../../../src/domain/sample/Sample";
import { AppDataSource } from "../../../../src/infrastructure/database/typeorm/data-source";
import { SampleRepository } from "../../../../src/infrastructure/database/typeorm/repository/SampleRepository";

describe("CreateSampleInteractor.test.ts", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("execute", () => {
    it("正常系", async () => {
      // Arrange
      const spy = jest
        .spyOn(SampleRepository.prototype, "save")
        .mockResolvedValue();
      const expected = new Sample("test-name");

      // Act
      const target = new CreateSampleInteractor(
        new SampleRepository(AppDataSource)
      );
      await target.execute(new InputData("test-name"));

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});

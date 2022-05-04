import { SampleUseCase } from "../../../src/application/usecases/sample/SampleUseCase";
import { Sample } from "../../../src/domain/sample/Sample";
import { AppDataSource } from "../../../src/infrastructure/database/typeorm/data-source";
import { SampleRepository } from "../../../src/infrastructure/database/typeorm/repository/SampleRepository";

describe("SampleUseCase.ts", () => {
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
      const target = new SampleUseCase(new SampleRepository(AppDataSource));
      target.execute("test-name");

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});

import { Sample } from "../../../../../../src/domain/sample/Sample";
import { AppDataSource } from "../../../../../../src/infrastructure/database/typeorm/data-source";
import { SampleEntity } from "../../../../../../src/infrastructure/database/typeorm/entities/sample/SampleEntity";
import { SampleRepository } from "../../../../../../src/infrastructure/database/typeorm/repository/SampleRepository";

describe("SampleRepository.ts", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterEach(async () => {
    await AppDataSource.getRepository(SampleEntity).clear();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("save", () => {
    it("正常系", async () => {
      // Arrange
      const sample = new Sample("test");

      // Act
      const target = new SampleRepository(AppDataSource);
      await target.save(sample);

      // Assert
      const actual = await AppDataSource.getRepository(SampleEntity).find();
      expect(actual).toHaveLength(1);
      expect(actual[0].name).toBe("test");
    });
  });
});

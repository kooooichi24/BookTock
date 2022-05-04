import { ISampleRepository } from "../../../../../src/application/repository/ISampleRepository";
import { Sample } from "../../../../../src/domain/sample/Sample";
import { SampleEntityMapper } from "../entities/sample/mapper/SampleEntityMapper";
import { SampleEntity } from "../entities/sample/SampleEntity";
import { DataSource, Repository } from "typeorm";

export class SampleRepository implements ISampleRepository {
  private ormRepository: Repository<SampleEntity>;

  constructor(appDataSource: DataSource) {
    this.ormRepository = appDataSource.getRepository(SampleEntity);
  }

  async save(sample: Sample): Promise<void> {
    console.log("Inserting a new sample into the database...");
    const ormSample = SampleEntityMapper.toOrmEntity(sample);
    await this.ormRepository.save(ormSample);
    console.log("Saved a new sample with id: " + ormSample.id);
  }
}

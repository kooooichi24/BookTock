import { ISampleRepository } from "../../domain/repository/ISampleRepository";
import { Sample } from "../../domain/sample/Sample";
import { SampleEntityMapper } from "../../infrastructure/database/typeorm/entities/sample/mapper/SampleEntityMapper";
import { SampleEntity } from "../../infrastructure/database/typeorm/entities/sample/SampleEntity";
import { TypeOrmManager } from "../../infrastructure/database/typeorm/TypeOrmManager";
import { ITypeOrmManager } from "./ITypeOrmManager";

export class SampleRepository implements ISampleRepository {
  private readonly typeOrmManager: ITypeOrmManager;

  constructor() {
    this.typeOrmManager = new TypeOrmManager();
  }

  async save(sample: Sample): Promise<void> {
    const ormSample = SampleEntityMapper.toOrmEntities([sample]);
    await this.typeOrmManager.save(SampleEntity, ormSample);
  }

  async findAll(): Promise<Sample[]> {
    const sampleEntities = await this.typeOrmManager.find(SampleEntity);
    return SampleEntityMapper.toDomainEntities(sampleEntities);
  }
}

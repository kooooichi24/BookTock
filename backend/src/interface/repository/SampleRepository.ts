import { ISampleRepository } from "../../domain/repository/ISampleRepository";
import { Sample } from "../../domain/sample/Sample";
import { SampleEntityMapper } from "../../infrastructure/database/typeorm/entities/sample/mapper/SampleEntityMapper";
import { SampleEntity } from "../../infrastructure/database/typeorm/entities/sample/SampleEntity";
import { TypeOrmManager } from "../../infrastructure/database/typeorm/TypeOrmManager";
import { DynamoDbClient } from "../../infrastructure/DynamoDbClient";
import { IDynamoDbClient } from "./IDynamoDbClient";
import { ITypeOrmManager } from "./ITypeOrmManager";

export class SampleRepository implements ISampleRepository {
  private readonly typeOrmManager: ITypeOrmManager;
  private readonly dynamoDbClient: IDynamoDbClient;

  constructor() {
    this.typeOrmManager = new TypeOrmManager();
    this.dynamoDbClient = new DynamoDbClient();
  }

  async save(sample: Sample): Promise<void> {
    await this.dynamoDbClient.putItem({
      TableName: process.env.DYNAMODB_SAMPLE_TABLE,
      Item: {
        id: {
          S: sample.name,
        },
      },
    });
    console.log("SampleRepository.save() by DynamoDB");

    const ormSample = SampleEntityMapper.toOrmEntities([sample]);
    await this.typeOrmManager.save(SampleEntity, ormSample);
  }

  async findAll(): Promise<Sample[]> {
    console.log(
      "SampleRepository.findAll() by DynamoDB: ",
      await this.dynamoDbClient.scan()
    );

    const sampleEntities = await this.typeOrmManager.find(SampleEntity);
    return SampleEntityMapper.toDomainEntities(sampleEntities);
  }
}

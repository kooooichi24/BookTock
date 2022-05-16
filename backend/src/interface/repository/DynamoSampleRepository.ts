import { ISampleRepository } from "../../domain/repository/ISampleRepository";
import { Sample } from "../../domain/sample/Sample";
import { DynamoDbClient } from "../../infrastructure/DynamoDbClient";
import { IDynamoDbClient } from "./IDynamoDbClient";

export class DynamoSampleRepository implements ISampleRepository {
  private readonly dynamoDbClient: IDynamoDbClient;

  constructor() {
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
  }

  async findAll(): Promise<Sample[] | undefined> {
    const response = await this.dynamoDbClient.scan();

    return response.Items?.map((item: any) => new Sample(item.id));
  }
}

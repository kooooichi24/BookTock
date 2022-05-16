import {
  DynamoDBClient,
  PutItemCommand,
  PutItemInput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { IDynamoDbClient } from "../interface/repository/IDynamoDbClient";

export class DynamoDbClient implements IDynamoDbClient {
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = this.initDynamoDBClient();
  }

  private initDynamoDBClient(): DynamoDBClient {
    switch (process.env.STAGE) {
      case "local":
        return new DynamoDBClient({
          region: "localhost",
          endpoint: "http://localhost:8000",
        });
      case "test":
        return new DynamoDBClient({
          region: "localhost",
          endpoint: "http://localhost:8000",
        });
      default:
        // TODO: config
        return new DynamoDBClient({});
    }
  }

  async scan(): Promise<ScanCommandOutput> {
    const params: ScanCommandInput = {
      TableName: process.env.DYNAMODB_SAMPLE_TABLE,
    };
    const command = new ScanCommand(params);
    return await this.client.send(command);
  }

  async putItem(params: PutItemInput): Promise<void> {
    const command = new PutItemCommand(params);
    await this.client.send(command);
  }
}

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
      case "test":
        return new DynamoDBClient({
          region: "localhost",
          endpoint: "http://localhost:8001",
          credentials: {
            accessKeyId: "DEFAULT_ACCESS_KEY",
            secretAccessKey: "DEFAULT_SECRET",
          },
        });
      case "local":
        return new DynamoDBClient({
          region: "localhost",
          endpoint: "http://localhost:8000",
          credentials: {
            accessKeyId: "DEFAULT_ACCESS_KEY",
            secretAccessKey: "DEFAULT_SECRET",
          },
        });
      default:
        // TODO: config
        return new DynamoDBClient({});
    }
  }

  async scan(tableName: string): Promise<ScanCommandOutput> {
    const params: ScanCommandInput = {
      TableName: tableName,
    };
    const command = new ScanCommand(params);
    return await this.client.send(command);
  }

  async putItem(params: PutItemInput): Promise<void> {
    const command = new PutItemCommand(params);
    await this.client.send(command);
  }
}

import { PutItemInput, ScanCommandOutput } from "@aws-sdk/client-dynamodb";

// TODO: Interfaceとしては、AWSに依存したくない
export interface IDynamoDbClient {
  scan(tableName: string): Promise<ScanCommandOutput>;
  putItem(params: PutItemInput): Promise<void>
}
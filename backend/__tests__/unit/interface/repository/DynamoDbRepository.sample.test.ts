import { startDb, stopDb, createTables, deleteTables } from "jest-dynalite";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocument,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

describe("desc", () => {
  const client = new DynamoDBClient({
    region: "test",
    endpoint: "http://localhost:8001",
  });
  const documentClient = DynamoDBDocument.from(client);

  beforeAll(() => {
    startDb;
  });

  beforeEach(() => {
    createTables;
  });

  afterEach(() => {
    deleteTables;
  });

  afterAll(() => {
    documentClient.destroy();
    stopDb;
  });

  it("should insert item into table", async () => {
    await documentClient.send(
      new PutCommand({
        TableName: "table",
        Item: { id: "1", hello: "world" },
      })
    );

    const { Item } = await client.send(
      new GetCommand({ TableName: "table", Key: { id: "1" } })
    );

    expect(Item).toEqual({
      id: "1",
      hello: "world",
    });
  });
});

import Lambda from "aws-lambda";

export async function getTodos(
  event: Lambda.APIGatewayEvent
): Promise<Lambda.APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      todos: "",
    }),
  };
}

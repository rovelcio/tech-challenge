import { APIGatewayProxyResult } from "aws-lambda";

interface GenericResponseObject {
  [key: string]: any;
}

export class APIGatewayResponse {
  static build(
    statusCode: number,
    body: GenericResponseObject
  ): APIGatewayProxyResult {
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  }
}

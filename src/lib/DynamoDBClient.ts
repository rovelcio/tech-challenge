import {
  DocumentClient,
  ExpressionAttributeValueMap,
} from "aws-sdk/clients/dynamodb";

interface DynamicExpressionPayloadMap {
  [key: string]: any;
}

export class DynamoDBClient extends DocumentClient {
  private _tableName: string;

  constructor() {
    super();
    this._tableName = process.env.TABLENAME;
  }

  updateExpression(
    payload: DynamicExpressionPayloadMap
  ): [string, ExpressionAttributeValueMap] {
    let expression = String();
    let expressionValueMap = {};

    for (const key in payload) {
      expression += `${key} = :${key},`;
      expressionValueMap[`:${key}`] = payload[key];
    }

    const result = expression.split(String());
    return [
      result.slice(0, result.length - 1).join(String()),
      expressionValueMap,
    ];
  }
}

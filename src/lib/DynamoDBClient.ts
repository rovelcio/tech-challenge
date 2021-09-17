import {
  DocumentClient,
  ExpressionAttributeValueMap,
} from "aws-sdk/clients/dynamodb";

interface DynamicExpressionPayloadMap {
  [key: string]: any;
}

export class DynamoDBClient extends DocumentClient {
  protected _tableName: string;
  protected _hashKey: string;
  protected _sortKey: string;

  constructor() {
    super();
    this._tableName = process.env.MOVIESTABLE;
    this._hashKey = process.env.MOVIESTABLE_HASHKEY;
    this._sortKey = process.env.MOVIESTABLE_SORTKEY;
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

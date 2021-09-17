import {
  DocumentClient,
  ExpressionAttributeValueMap,
} from "aws-sdk/clients/dynamodb";

interface DynamicExpressionPayloadMap {
  [key: string]: any;
}

interface QueryParametersBuilderInterface {
  contains: (
    hashKey: string,
    attributeName: string,
    attributeValue: string
  ) => DocumentClient.QueryInput;
  exact: (hashKey: string, sortKey: string) => DocumentClient.QueryInput;
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

  buildQueryParameters(): QueryParametersBuilderInterface {
    return {
      contains: (
        hashKey: string,
        attributeName: string,
        attributeValue: string
      ) => ({
        TableName: this._tableName,
        KeyConditionExpression: this.buildQueryParts().hashKeyOnly(),
        FilterExpression: `contains(${attributeName}, :${attributeName})`,
        ExpressionAttributeValues: {
          [":" + this._hashKey]: hashKey,
          [":" + attributeName]: attributeValue,
        },
      }),
      exact: (hashKey: string, sortKey: string) => ({
        TableName: this._tableName,
        KeyConditionExpression: this.buildQueryParts().primaryKeyExact(),
        ExpressionAttributeValues: {
          [":" + this._hashKey]: hashKey,
          [":" + this._sortKey]: sortKey,
        },
      }),
    };
  }

  buildQueryParts() {
    return {
      hashKeyOnly: () => `${this._hashKey} = :${this._hashKey}`,
      primaryKeyExact: () =>
        `${this._hashKey} = :${this._hashKey} and ${this._sortKey} = :${this._sortKey}`,
    };
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

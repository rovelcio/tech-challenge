import {
  DocumentClient,
  ExpressionAttributeValueMap,
} from "aws-sdk/clients/dynamodb";

interface DynamicExpressionPayloadMap {
  [key: string]: any;
}

interface QueryParametersBuilderInterface {
  getItemsContaining: (
    hashKey: string,
    attributeName: string,
    attributeValue: string
  ) => DocumentClient.QueryInput;
  getItemsBeginsWith: (
    hashKey: string,
    sortKey: string
  ) => DocumentClient.QueryInput;
  getExactItemFrom: (
    hashKey: string,
    sortKey: string
  ) => DocumentClient.GetItemInput;
  getAllFromHashKey: (hashKey: string) => DocumentClient.QueryInput;
  addOrUpdateFrom: (
    hashKey: string,
    sortKey: string,
    object: Object
  ) => DocumentClient.UpdateItemInput;
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
      getItemsContaining: (hashKey, attributeName, attributeValue) => ({
        TableName: this._tableName,
        KeyConditionExpression: this.buildQueryParts().hashKeyOnly(),
        FilterExpression: `contains(${attributeName}, :${attributeName})`,
        ExpressionAttributeValues: {
          [":" + this._hashKey]: hashKey,
          [":" + attributeName]: attributeValue,
        },
      }),
      getItemsBeginsWith: (hashKey, sortKey) => ({
        TableName: this._tableName,
        KeyConditionExpression: this.buildQueryParts().sortKeyBeginsWith(),
        ExpressionAttributeValues: {
          [":" + this._hashKey]: hashKey,
          [":" + this._sortKey]: sortKey,
        },
      }),
      getExactItemFrom: (hashKey, sortKey) => ({
        TableName: this._tableName,
        Key: {
          [this._hashKey]: hashKey,
          [this._sortKey]: sortKey,
        },
      }),
      getAllFromHashKey: (hashKey: string) => ({
        TableName: this._tableName,
        KeyConditionExpression: this.buildQueryParts().hashKeyOnly(),
        ExpressionAttributeValues: {
          [":" + this._hashKey]: hashKey,
        },
      }),
      addOrUpdateFrom: (hashKey, sortKey, object) => {
        const [UpdateExpression, ExpressionAttributeValues] =
          this.updateExpression(object);

        return {
          TableName: this._tableName,
          Key: {
            [this._hashKey]: hashKey,
            [this._sortKey]: sortKey,
          },
          UpdateExpression,
          ExpressionAttributeValues,
        };
      },
    };
  }

  private buildQueryParts() {
    return {
      hashKeyOnly: () => `${this._hashKey} = :${this._hashKey}`,
      sortKeyBeginsWith: () =>
        `${this._hashKey} = :${this._hashKey} and begins_with(${this._sortKey}, :${this._sortKey})`,
    };
  }

  updateExpression(
    payload: DynamicExpressionPayloadMap
  ): [string, ExpressionAttributeValueMap] {
    let expression = "set";
    let values = {};

    for (const key in payload) {
      expression += ` ${key} = :${key},`;
      values[`:${key}`] = payload[key];
    }

    let finalExpression = expression.split("");
    finalExpression.pop();
    return [finalExpression.join(""), values];
  }
}

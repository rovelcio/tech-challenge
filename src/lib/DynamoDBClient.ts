import { Movie } from "../types/data/Movie";
import {
  DocumentClient,
  ExpressionAttributeValueMap,
  QueryInput,
} from "aws-sdk/clients/dynamodb";

interface DynamicExpressionPayloadMap {
  [key: string]: any;
}

export class DynamoDBClient extends DocumentClient {
  private _tableName: string;
  private _hashKey: string;
  private _sortKey: string;

  private _hashMovie: string;
  private _hashBookmark: string;

  constructor() {
    super();
    this._tableName = process.env.MOVIESTABLE;
    this._hashKey = process.env.MOVIESTABLE_HASHKEY;
    this._sortKey = process.env.MOVIESTABLE_SORTKEY;
    this._hashMovie = process.env.HASH_MOVIES;
    this._hashBookmark = process.env.HASH_BOOKMARKS;
  }

  async locateMovie(searchParameter: string): Promise<Array<Movie>> {
    const queryParameters = {
      TableName: this._tableName,
      KeyConditionExpression: `${this._hashKey} = :${this._hashKey}`,
      FilterExpression: `contains(title, :title)`,
      ExpressionAttributeValues: {
        [`:${this._hashKey}`]: this._hashMovie,
        ":title": searchParameter,
      },
    };

    const query = await this.query(queryParameters).promise();
    const resultingItems = (query.Items || []) as Movie[];

    return resultingItems.map(
      (movie) =>
        new Movie(
          movie.title,
          movie.year,
          movie.imdbID,
          movie.type,
          movie.posterUrl
        )
    );
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

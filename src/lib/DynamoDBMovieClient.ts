import { Movie } from "../types/data/Movie";
import { DynamoDBClient } from "./DynamoDBClient";

export class DynamoDBMovieClient extends DynamoDBClient {
  private _hashMovie: string;
  private _hashBookmark: string;

  constructor() {
    super();
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
}

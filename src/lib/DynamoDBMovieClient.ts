import { ItemList } from "aws-sdk/clients/dynamodb";
import { Movie } from "../model/data/Movie";
import { DynamoDBClient } from "./DynamoDBClient";

export class DynamoDBMovieClient extends DynamoDBClient {
  private _hashMovie: string;
  private _hashBookmark: string;
  private _hashCache: string;

  constructor() {
    super();
    this._hashMovie = process.env.HASH_MOVIES;
    this._hashBookmark = process.env.HASH_BOOKMARK;
    this._hashCache = process.env.HASH_CACHE;
  }

  async retrieveCacheOf(searchParameter: string): Promise<ItemList> {
    const queryParameters = this.buildQueryParameters().exact(
      this._hashCache,
      searchParameter
    );

    const query = await this.query(queryParameters).promise();
    return query.Items;
  }

  async locateMovieBy(searchParameter: string): Promise<Array<Movie>> {
    const queryParameters = this.buildQueryParameters().contains(
      this._hashMovie,
      "title",
      searchParameter
    );

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

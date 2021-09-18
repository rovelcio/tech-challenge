import { AttributeMap, ItemList } from "aws-sdk/clients/dynamodb";
import { Movie, RawMovie } from "../model/data/Movie";
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

  async writeSearchToCache(searchParameter: string, searchData: Movie[]) {
    await Promise.all(
      searchData.map(async (movie, movieIndex) => {
        const itemParameter = this.buildQueryParameters().addOrUpdateFrom(
          this._hashCache,
          searchParameter + "#" + movieIndex,
          movie
        );
        console.log({ itemParameter });
        return await this.update(itemParameter).promise();
      })
    );
  }

  async retrieveCachedSearchOf(searchParameter: string): Promise<Movie[]> {
    const queryParameters = this.buildQueryParameters().getItemsBeginsWith(
      this._hashCache,
      searchParameter + "#"
    );

    const query = await this.query(queryParameters).promise();
    const items = (query.Items || []) as Movie[];
    return items.map((movie) => Movie.fromDb(movie));
  }

  async locateMovieByImdbID(imdbID: string): Promise<Movie> {
    const queryParameters = this.buildQueryParameters().getExactItemFrom(
      this._hashMovie,
      imdbID
    );

    const query = await this.get(queryParameters).promise();
    const item = (query.Item || null) as Movie;

    return item === null ? item : Movie.fromDb(item);
  }

  async locateMovieByTitle(searchParameter: string): Promise<Movie[]> {
    const queryParameters = this.buildQueryParameters().getItemsContaining(
      this._hashMovie,
      "title",
      searchParameter
    );

    const query = await this.query(queryParameters).promise();
    const resultingItems = (query.Items || []) as Movie[];

    return resultingItems.map((movie) => Movie.fromDb(movie));
  }
}

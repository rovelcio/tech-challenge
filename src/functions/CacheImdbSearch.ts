import "source-map-support/register";
import { Handler } from "aws-lambda";
import { Movie } from "../model/data/Movie";
import { DynamoDBMovieClient } from "../lib/DynamoDBMovieClient";

const dynamoDbClient = new DynamoDBMovieClient();

export const CacheImdbSearch: Handler<CacheEvent, void> = async (event) => {
  console.log({ event, env: process.env });
  const searchData = JSON.parse(event.searchData) as Movie[];

  await dynamoDbClient.writeSearchToCache(event.searchParameter, searchData);
};

interface CacheEvent {
  searchParameter: string;
  searchData: string;
}

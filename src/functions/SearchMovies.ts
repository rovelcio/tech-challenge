import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayResponse } from "../lib/APIGatewayResponse";
import { IMDBClient } from "../lib/IMDBClient";
import { SearchPayload } from "../model/functions/SearchMovieTypes";
import { DynamoDBMovieClient } from "../lib/DynamoDBMovieClient";

const dynamoDbClient = new DynamoDBMovieClient();
const imdbClient = new IMDBClient();

export const SearchMovies = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const searchPayload = JSON.parse(event.body) as SearchPayload;
  const searchParameter = searchPayload.title || searchPayload.imdbID;

  if (typeof searchParameter === "undefined") {
    return APIGatewayResponse.build(400, null);
  }

  const queryDb = await dynamoDbClient.locateMovieBy(searchParameter);
  if (!queryDb.length) {
    const queryImdb = searchPayload.title
      ? imdbClient.searchMoviesByName(searchParameter)
      : imdbClient.getMovieById(searchParameter);
  }
  return APIGatewayResponse.build(200, queryDb);
};

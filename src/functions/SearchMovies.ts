import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayResponse } from "../lib/APIGatewayResponse";
import { IMDBClient } from "../lib/IMDBClient";
import { SearchPayload } from "../model/functions/SearchMovieTypes";
import { DynamoDBMovieClient } from "../lib/DynamoDBMovieClient";
import { Lambda } from "aws-sdk";

const dynamoDbClient = new DynamoDBMovieClient();
const imdbClient = new IMDBClient();
const lambdaClient = new Lambda();

export const SearchMovies = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const searchPayload = JSON.parse(event.body) as SearchPayload;
  const searchParameter = searchPayload.title || searchPayload.imdbID;

  if (typeof searchParameter === "undefined") {
    return APIGatewayResponse.build(400, null);
  }

  if (searchPayload.imdbID) {
    const searchMovie =
      (await dynamoDbClient.locateMovieByImdbID(searchParameter)) ||
      (await imdbClient.getMovieById(searchParameter));
    return APIGatewayResponse.build(searchMovie === null ? 404 : 200, [
      searchMovie,
    ]);
  }

  const searchCache = await dynamoDbClient.retrieveCachedSearchOf(
    searchParameter
  );
  if (searchCache.length) {
    return APIGatewayResponse.build(200, searchCache, {
      MOVIES_FROM_CACHE: true,
    });
  }

  const searchImdb = await imdbClient.searchMoviesByName(searchParameter);
  await lambdaClient
    .invoke({
      FunctionName: process.env.CACHE_FUNCTION,
      InvocationType: "Event",
      Payload: JSON.stringify({
        searchParameter,
        searchData: JSON.stringify(searchImdb),
      }),
    })
    .promise();

  return APIGatewayResponse.build(searchImdb.length ? 200 : 404, searchImdb, {
    MOVIES_FROM_CACHE: false,
  });
};

import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayResponse } from "../lib/APIGatewayResponse";
import { DynamoDBClient } from "../lib/DynamoDBClient";
import { IMDBClient } from "../lib/IMDBClient";
import { SearchPayload } from "../types/functions/SearchMovieTypes";

const dynamoDbClient = new DynamoDBClient();
const imdbClient = new IMDBClient();

export const SearchMovies = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const searchPayload = JSON.parse(event.body) as SearchPayload;
  if (searchPayload.title || searchPayload.imdbID) {
    const result = await dynamoDbClient.locateMovie(
      searchPayload.title || searchPayload.imdbID
    );
    return APIGatewayResponse.build(200, result);
  } else {
    return APIGatewayResponse.build(400, null);
  }
};

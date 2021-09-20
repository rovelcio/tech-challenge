import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayResponse } from "../lib/APIGatewayResponse";
import { DynamoDBMovieClient } from "../lib/DynamoDBMovieClient";

const dynamoDbClient = new DynamoDBMovieClient();

export const BookmarkRemoveMovie = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const searchPayload = event.pathParameters;
  const imdbID = searchPayload.imdbID;

  if (!imdbID) {
    return APIGatewayResponse.build(400, {});
  }

  const removedMovie = await dynamoDbClient.bookmarkRemoveMovie(imdbID);
  return APIGatewayResponse.build(removedMovie ? 200 : 502, {
    removedMovie,
  });
};

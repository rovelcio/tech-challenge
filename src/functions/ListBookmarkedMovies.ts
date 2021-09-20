import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayResponse } from "../lib/APIGatewayResponse";
import { DynamoDBMovieClient } from "../lib/DynamoDBMovieClient";

const dynamoDbClient = new DynamoDBMovieClient();

export const ListBookmarkedMovies =
  async (): Promise<APIGatewayProxyResult> => {
    const bookmarkList = await dynamoDbClient.bookmarkList();
    return APIGatewayResponse.build(200, bookmarkList);
  };

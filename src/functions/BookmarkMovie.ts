import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayResponse } from "../lib/APIGatewayResponse";

export const BookmarkMovie = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return APIGatewayResponse.build(200, {});
};

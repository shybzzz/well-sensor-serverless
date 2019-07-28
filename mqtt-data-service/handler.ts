import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { success, failure } from './api-gateway-proxy-results';
import { DataRepository } from './data-repository';

export const getLastSeen: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const queryStringParameters = event.queryStringParameters;
    const device = queryStringParameters && queryStringParameters.device;
    const lastSeen = await DataRepository.getLastSeen(device);
    return success(lastSeen.records[0].date);
  } catch (er) {
    return failure('Could not find last record');
  }
};

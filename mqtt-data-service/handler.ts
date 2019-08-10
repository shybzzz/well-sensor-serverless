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

export const getLastRecords: APIGatewayProxyHandler = async (
  event,
  context
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const queryStringParameters = event.queryStringParameters;
    const limit = queryStringParameters && queryStringParameters.limit;
    const device = queryStringParameters && queryStringParameters.device;
    if (!limit) {
      return failure('No Data Limit');
    }
    const lastSeen = await DataRepository.getLastRecords(device, limit);
    return success(lastSeen.records);
  } catch (er) {
    return failure('Could not find last records');
  }
};

export const countPerPeriod: APIGatewayProxyHandler = async (
  event,
  context
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const pathParameters = event.pathParameters;
    const dateTrunc = pathParameters && pathParameters.dateTrunc;

    const queryStringParameters = event.queryStringParameters;
    const startDate = queryStringParameters && queryStringParameters.startDate;
    const endDate = queryStringParameters && queryStringParameters.endDate;
    const device = queryStringParameters && queryStringParameters.device;

    if (!(dateTrunc && startDate && endDate && device)) {
      return failure('Missing parameters');
    }
    const countPerPeriod = await DataRepository.countPerPeriod(
      device,
      dateTrunc,
      startDate,
      endDate
    );
    return success(countPerPeriod.records);
  } catch (er) {
    return failure(`Could not count per period`);
  }
};

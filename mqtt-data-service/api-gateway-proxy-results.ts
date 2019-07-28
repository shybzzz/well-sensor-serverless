import { APIGatewayProxyResult } from 'aws-lambda';

export function success(obj?: any): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: JSON.stringify(obj),
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': 'true'
    }
  };
}

export function failure(message: string, statusCode?: number) {
  return {
    statusCode: statusCode || 500,
    body: message,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Credentials': 'true'
    }
  };
}

'use strict';

const connectToDatabase = require('./db'); // initialize connection

function success(obj) {
  return {
    statusCode: 200,
    body: JSON.stringify(obj),
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': 'true'
    }
  };
}

function failure(message, statusCode) {
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

module.exports.healthCheck = async (_event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    return success({ message: 'Success' });
  } catch (err) {
    console.error(err);
    return failure('Failure');
  }
};

module.exports.getAllMqttServers = async (_event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { MqttServer } = await connectToDatabase();
    const mqttServers = await MqttServer.findAll({
      where: { deletedAt: null }
    });
    return success(mqttServers);
  } catch (err) {
    return failure('Could not fetch the MQTT Servers.');
  }
};

module.exports.saveMqttServer = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { MqttServer } = await connectToDatabase();
    const input = JSON.parse(event.body);
    const pathParameters = event.pathParameters;
    const mqttServerId = pathParameters && pathParameters.id;
    const mqttServer =
      mqttServerId && (await MqttServer.findByPk(mqttServerId));

    let result;
    if (!mqttServer) {
      result = await MqttServer.create(JSON.parse(event.body));
    } else {
      if (input.server) mqttServer.server = input.server;
      if (input.wssPort) mqttServer.wssPort = input.wssPort;
      if (input.description) mqttServer.description = input.description;
      if (input.deletedAt) mqttServer.deletedAt = input.deletedAt;
      await mqttServer.save();
      result = mqttServer;
    }

    return success(result);
  } catch (err) {
    console.error(err);
    return failure('Could not save Mqtt Server.');
  }
};

module.exports.getMqttUsers = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const pathParameters = event.pathParameters;
    const mqttServerId = pathParameters && pathParameters.id;
    const { MqttUser } = await connectToDatabase();
    const mqttUsers = await MqttUser.findAll({
      where: { deletedAt: null, mqttServerId: mqttServerId }
    });
    return success(mqttUsers);
  } catch (err) {
    return failure('Could not fetch Mqtt Users.');
  }
};

module.exports.saveMqttUser = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { MqttUser } = await connectToDatabase();
    const input = JSON.parse(event.body);
    const pathParameters = event.pathParameters;
    const mqttUserId = pathParameters && pathParameters.id;
    const mqttUser = mqttUserId && (await MqttUser.findByPk(mqttUserId));

    let result;
    if (!mqttUser) {
      result = await MqttUser.create(JSON.parse(event.body));
    } else {
      if (input.user) mqttUser.user = input.user;
      if (input.mqttPassword) mqttUser.mqttPassword = input.mqttPassword;
      if (input.description) mqttUser.description = input.description;
      if (input.mqttServerId) mqttUser.mqttServerId = input.mqttServerId;
      if (input.deletedAt) mqttUser.deletedAt = input.deletedAt;

      await mqttUser.save();
      result = mqttUser;
    }

    return success(result);
  } catch (err) {
    console.error(err);
    return failure('Could not save Mqtt MqttUser.');
  }
};

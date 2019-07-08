'use strict';

const connectToDatabase = require('./db'); // initialize connection

// simple Error constructor for handling HTTP error codes
function HTTPError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports.healthCheck = async () => {
  await connectToDatabase();
  console.log('Connection successful.');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Connection successful and cjom.' })
  };
};

module.exports.createMqttSettings = async event => {
  try {
    const { MqttSettings } = await connectToDatabase();
    const mqttSettings = await MqttSettings.create(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(mqttSettings)
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create Mqtt Settings.'
    };
  }
};

module.exports.getAllMqttSettings = async () => {
  try {
    const { MqttSettings } = await connectToDatabase();
    const mqttSettings = await MqttSettings.findAll();
    return {
      statusCode: 200,
      body: JSON.stringify(mqttSettings)
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the notes.'
    };
  }
};

module.exports.createMqttDevice = async event => {
  try {
    const mqttSettingId = event.pathParameters.mqttSettingId;
    let body = JSON.parse(event.body);
    body.mqttSettingId = mqttSettingId;

    const { MqttDevice } = await connectToDatabase();
    const mqttDevice = await MqttDevice.create(body);
    return {
      statusCode: 200,
      body: JSON.stringify(mqttDevice)
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create Mqtt Device.'
    };
  }
};

// module.exports.getOne = async event => {
//   try {
//     const { Note } = await connectToDatabase();
//     const note = await Note.findById(event.pathParameters.id);
//     if (!note)
//       throw new HTTPError(
//         404,
//         `Note with id: ${event.pathParameters.id} was not found`
//       );
//     return {
//       statusCode: 200,
//       body: JSON.stringify(note)
//     };
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: err.message || 'Could not fetch the Note.'
//     };
//   }
// };

// module.exports.update = async event => {
//   try {
//     const input = JSON.parse(event.body);
//     const { Note } = await connectToDatabase();
//     const note = await Note.findById(event.pathParameters.id);
//     if (!note)
//       throw new HTTPError(
//         404,
//         `Note with id: ${event.pathParameters.id} was not found`
//       );
//     if (input.title) note.title = input.title;
//     if (input.description) note.description = input.description;
//     await note.save();
//     return {
//       statusCode: 200,
//       body: JSON.stringify(note)
//     };
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: err.message || 'Could not update the Note.'
//     };
//   }
// };

// module.exports.destroy = async event => {
//   try {
//     const { Note } = await connectToDatabase();
//     const note = await Note.findById(event.pathParameters.id);
//     if (!note)
//       throw new HTTPError(
//         404,
//         `Note with id: ${event.pathParameters.id} was not found`
//       );
//     await note.destroy();
//     return {
//       statusCode: 200,
//       body: JSON.stringify(note)
//     };
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: err.message || 'Could destroy fetch the Note.'
//     };
//   }
// };

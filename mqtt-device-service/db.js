const Sequelize = require('sequelize');

const MqttServerModel = require('./models/MqttServer');
const MqttUserModel = require('./models/MqttUser');
const MqttDeviceModel = require('./models/MqttDevice');
const HwGut800Model = require('./models/HwGut800');
const EcoReferenceDepthModel = require('./models/EcoReferenceDepth');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
);

const EcoReferenceDepth = EcoReferenceDepthModel(sequelize, Sequelize);
const HwGut800 = HwGut800Model(sequelize, Sequelize);
const MqttDevice = MqttDeviceModel(sequelize, Sequelize);
const MqttServer = MqttServerModel(sequelize, Sequelize);
const MqttUser = MqttUserModel(sequelize, Sequelize);

MqttServer.hasMany(MqttUser);
MqttUser.belongsTo(MqttServer);
MqttUser.hasMany(MqttDevice);
MqttDevice.belongsTo(MqttUser);
MqttDevice.hasMany(EcoReferenceDepth);
EcoReferenceDepth.belongsTo(MqttDevice);
MqttDevice.hasMany(HwGut800);
HwGut800.belongsTo(MqttDevice);
HwGut800.hasMany(EcoReferenceDepth);
EcoReferenceDepth.belongsTo(MqttDevice);

const Models = {
  EcoReferenceDepth,
  HwGut800,
  MqttDevice,
  MqttServer,
  MqttUser
};

const connection = {};

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.');
    return Models;
  }

  await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log('=> Created a new connection.');
  return Models;
};

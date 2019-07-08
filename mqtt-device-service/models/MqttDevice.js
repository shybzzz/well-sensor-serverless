module.exports = function(sequelize, type) {
  return sequelize.define('mqtt_devices', {
    id: {
      type: type.DataTypes.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV1
    },
    deviceName: { type: type.STRING, allowNull: false },
    sensorType: { type: type.INTEGER, allowNull: false },
    description: { type: type.STRING }
  });
};

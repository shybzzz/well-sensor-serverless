module.exports = function(sequelize, type) {
  return sequelize.define('mqtt_users', {
    id: {
      type: type.DataTypes.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV1
    },
    user: { type: type.STRING, allowNull: false },
    mqttPassword: { type: type.STRING, allowNull: false },
    description: { type: type.STRING },
    deletedAt: { type: type.DATE }
  });
};

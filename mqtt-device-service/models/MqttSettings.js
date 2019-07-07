module.exports = function(sequelize, type) {
  return sequelize.define('mqtt_settings', {
    id: {
      type: type.DataTypes.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV1
    },
    server: { type: type.STRING, allowNull: false },
    wssPort: { type: type.INTEGER, allowNull: false },
    user: { type: type.STRING, allowNull: false },
    description: { type: type.STRING }
  });
};

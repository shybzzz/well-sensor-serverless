module.exports = function(sequelize, type) {
  return sequelize.define('eco_reference_depth', {
    id: {
      type: type.DataTypes.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV1
    },
    totalDepth: { type: type.DOUBLE, allowNull: false },
    surfaceDistance: { type: type.DOUBLE, allowNull: false },
    description: { type: type.STRING }
  });
};

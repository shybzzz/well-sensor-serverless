module.exports = function(sequelize, type) {
  return sequelize.define('hw_gut800', {
    id: {
      type: type.DataTypes.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV1
    },
    minCurrent: { type: type.DOUBLE, allowNull: false },
    maxCurrent: { type: type.DOUBLE, allowNull: false },
    r: { type: type.DOUBLE, allowNull: false },
    maxDepth: { type: type.DOUBLE, allowNull: false },
    referenceVoltage: { type: type.DOUBLE, allowNull: false },
    resolution: { type: type.INTEGER, allowNull: false },
    deletedAt: { type: type.DATE }
  });
};

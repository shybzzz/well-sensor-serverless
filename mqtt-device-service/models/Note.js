module.exports = function(sequelize, type) {
  return sequelize.define('note', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    description: type.STRING
  });
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "evaluation",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
      },
      id_bodybuilder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "bodybuilder",
          key: "id",
        },
        unique: true,
      },
    },
    {
      tableName: "evaluation",
      schema: "bodyfit-bd",
      timestamps: false,
    }
  );
};

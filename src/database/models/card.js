/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "card",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      series: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      repetition: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      id_exercise: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "exercise",
          key: "id",
        },
      },
      id_workout: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "workout",
          key: "id",
        },
      },
    },
    {
      tableName: "card",
      schema: "bodyfit-bd",
      timestamps: false,
    }
  );
};

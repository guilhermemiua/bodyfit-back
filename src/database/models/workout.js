/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "workout",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      id_instructor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "instructor",
          key: "id",
        },
      },
      id_intensity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "intensity",
          key: "id",
        },
      },
    },
    {
      tableName: "workout",
      schema: "bodyfit-bd",
      timestamps: false,
    }
  );
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "monthly_charge",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      id_bodybuilder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "bodybuilder",
          key: "id",
        },
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "monthly_charge",
      schema: "bodyfit-bd",
      timestamps: false,
    }
  );
};

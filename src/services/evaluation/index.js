const evaluationModel = require("../../database/models/evaluation");
const helpers = require("../../helpers");
const db = require("../../configs");
const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;

const getAllEvaluations = async (req, res) => {
  try {
    const now = new Date(moment());
    const evaluations = await db.query(
      `SELECT evaluation.id, evaluation.date_time, evaluation.id_bodybuilder, bodybuilder.name FROM "bodyfit-bd"."evaluation", "bodyfit-bd"."bodybuilder" WHERE "bodybuilder"."id" = "evaluation"."id_bodybuilder" AND "evaluation"."date_time" >= $1`,
      {
        bind: [now],
        type: db.QueryTypes.SELECT,
      }
    );

    return res.status(200).send({
      success: true,
      errorMessage: "",
      evaluations,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const createEvaluation = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const evaluationDate = moment
      .parseZone(`${req.body.date} ${req.body.time}`)
      .local()
      .format();

    const evaluation = await evaluationModel(db, DataTypes).findOne({
      where: {
        id_bodybuilder: req.body.id_bodybuilder,
      },
    });

    if (evaluation) {
      await evaluationModel(db, DataTypes).update(
        {
          date_time: evaluationDate,
        },
        {
          where: {
            id_bodybuilder: req.body.id_bodybuilder,
          },
        }
      );
    } else {
      await evaluationModel(db, DataTypes).create({
        date_time: evaluationDate,
        id_bodybuilder: req.body.id_bodybuilder,
      });
    }

    return res.status(200).send({
      success: true,
      errorMessage: "",
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

module.exports = {
  getAllEvaluations,
  createEvaluation,
};

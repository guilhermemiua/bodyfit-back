const express = require("express");
const router = express.Router();

const registerService = require("../services/register");
const instructorService = require("../services/instructor");
const bodybuilderService = require("../services/bodybuilder");
const chargesService = require("../services/charge");
const evaluationsService = require("../services/evaluation");
const exercisesService = require("../services/exercise");
const intensityService = require("../services/intensity");
const workoutService = require("../services/workout");

router.post("/bodybuilder/register", (req, res) =>
  registerService.bodybuilderRegister(req, res)
);
router.post("/bodybuilder/login", (req, res) =>
  registerService.bodybuilderLogin(req, res)
);

router.post("/instructor/register", (req, res) =>
  registerService.instructorRegister(req, res)
);
router.post("/instructor/login", (req, res) =>
  registerService.instructorLogin(req, res)
);

router.get("/instructor/getAll", (req, res) => {
  instructorService.getAllInstructors(req, res);
});

router.get("/bodybuilder/getAll", (req, res) => {
  bodybuilderService.getAllBodybuilders(req, res);
});

router.post("/bodybuilder/get", (req, res) => {
  bodybuilderService.getBodybuilder(req, res);
});

router.post("/instructor/search", (req, res) => {
  instructorService.searchInstructors(req, res);
});

router.post("/instructor/get", (req, res) => {
  instructorService.getInstructor(req, res);
});

router.post("/bodybuilder/search", (req, res) => {
  bodybuilderService.searchBodybuilders(req, res);
});

router.get("/charge/getAll", (req, res) => {
  chargesService.getAllCharges(req, res);
});

router.post("/charge/pay", (req, res) => {
  chargesService.payCharge(req, res);
});

router.get("/evaluation/getAll", (req, res) => {
  evaluationsService.getAllEvaluations(req, res);
});

router.post("/evaluation/create", (req, res) => {
  evaluationsService.createEvaluation(req, res);
});

router.get("/exercise/getAll", (req, res) => {
  exercisesService.getAllExercises(req, res);
});

router.get("/exercise/populate", (req, res) => {
  exercisesService.populateExercise(req, res);
});

router.post("/intensity/getAll", (req, res) => {
  intensityService.getAllIntensities(req, res);
});

router.get("/intensity/populate", (req, res) => {
  intensityService.populateIntensity(req, res);
});

router.post("/workout/create", (req, res) => {
  workoutService.createWorkout(req, res);
});

router.post("/workout/get", (req, res) => {
  workoutService.getWorkout(req, res);
});

module.exports = router;

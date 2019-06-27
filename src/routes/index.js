const express = require("express");
const router = express.Router();

const bodybuilderRegisterService = require("../services/bodybuilder/register/register");
const instructorRegisterService = require("../services/instructor/register/register");

router.post("/bodybuilder/register", (req, res) =>
  bodybuilderRegisterService.register(req, res)
);
router.post("/bodybuilder/login", (req, res) =>
  bodybuilderRegisterService.login(req, res)
);

router.post("/instructor/register", (req, res) =>
  instructorRegisterService.register(req, res)
);
router.post("/instructor/login", (req, res) =>
  instructorRegisterService.login(req, res)
);

module.exports = router;

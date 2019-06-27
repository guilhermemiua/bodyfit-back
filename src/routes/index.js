const express = require("express");
const router = express.Router();

const registerService = require("../services/register/register");

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

module.exports = router;

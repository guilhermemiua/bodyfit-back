const express = require("express");
const router = express.Router();

const bodybuilderRegisterService = require("../services/bodybuilder/register/register");

router.post("/bodybuilder/register", (req, res) =>
  bodybuilderRegisterService.register(req, res)
);
router.post("/bodybuilder/login", (req, res) =>
  bodybuilderRegisterService.login(req, res)
);

module.exports = router;

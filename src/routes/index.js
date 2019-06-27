const express = require("express");
const router = express.Router();

const registerService = require("../services/register");
const instructorService = require("../services/instructor");
const bodybuilderService = require("../services/bodybuilder");
const chargesService = require("../services/charges");

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

router.post("/instructor/search", (req, res) => {
  instructorService.searchInstructors(req, res);
});

router.post("/bodybuilder/search", (req, res) => {
  bodybuilderService.searchBodybuilders(req, res);
});

router.get("/charges/getAll", (req, res) => {
  chargesService.getAllCharges(req, res);
});

module.exports = router;

const express = require('express');
const router = express.Router();

const addresService = require('../services/address');

router.post('/address/add', (req, res) => addresService.create(req, res));

module.exports = router;

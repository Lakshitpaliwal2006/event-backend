const express = require("express");
const router = express.Router();
const { getAllData } = require('../Database/Finance.Database.js')

router.get("/", getAllData);

module.exports = router;
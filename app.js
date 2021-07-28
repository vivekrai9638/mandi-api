const express = require("express");
const cors = require("cors");
const Report = require("./src/models/report");
const Commodity = require("./src/models/commodity");
const reports = require("./src/routes/reports");
require("./src/db/mongoose");

const app = express();

// CORS
app.use(cors());

// json
app.use(express.json());

// Routes
app.use(reports);

module.exports = app;

const express = require("express");
const math = require("mathjs"); //For Floating point errors
const Report = require("../models/report");
const Commodity = require("../models/commodity");

// initialising router
const router = new express.Router();

///////////////////// SEND REPORT /////////////////////////////////////

router.post("/reports", async (req, res) => {
  // constructing new report
  const report = new Report(req.body.reportDetails);

  try {
    // for succesful creation of report, adding 'perKg' field
    if (report) report.perKg = report.price / report.convFctr;
    await report.save();

    // looking for commodity mentioned in the report
    const commodity = await Commodity.findOne({
      cmdtyID: report.cmdtyID,
      marketID: report.marketID,
    });

    // for new commodity
    if (!commodity) {
      const newCommodity = new Commodity({
        cmdtyID: report.cmdtyID,
        cmdtyName: report.cmdtyName,
        marketID: report.marketID,
        marketName: report.marketName,
        users: [report.userID],
        timestamp: Date.now(),
        price: math.format(report.price / report.convFctr, 14),
      });

      await newCommodity.save();

      // sending new commodity's ID
      return res.send({
        status: "success",
        reportID: newCommodity._id.toString(),
      });
    }

    // for existing commodity, adding the new user
    commodity.users = [...commodity.users, report.userID];
    await commodity.save();

    // sending success report with ID of commodity
    res.send({
      status: "success",
      reportID: commodity._id.toString(),
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

/////////////////////////// GET REPORTS /////////////////////////////

router.get("/reports", async (req, res) => {
  // parsing ID
  const id = req.query.id;

  try {
    // searching for corresponding commodity
    const commodity = await Commodity.findOne({ _id: id });

    if (!commodity)
      return res.status(404).send({ error: "Commodity not found" });
    // returning commodity
    res.send(commodity);
  } catch (e) {
    res.status(404).send({ error: "Enter valid ID" });
  }
});

//exporting router
module.exports = router;

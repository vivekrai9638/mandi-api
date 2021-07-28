const mongoose = require("mongoose");
const Commodity = require("../../models/commodity");
const Report = require("../../models/report");

const reportOne = {
  reportDetails: {
    userID: "user-1",
    marketID: "market-1",
    marketName: "Vashi Navi Mumbai",
    cmdtyID: "cmdty-1",
    marketType: "Mandi",
    cmdtyName: "Potato",
    priceUnit: "Pack",
    convFctr: 50,
    price: 700,
  },
};

const reportTwo = {
  reportDetails: {
    userID: "user-2",
    marketID: "market-1",
    marketName: "Vashi Navi Mumbai",
    cmdtyID: "cmdty-1",
    cmdtyName: "Potato",
    priceUnit: "Quintal",
    convFctr: 100,
    price: 1600,
  },
};

const setupDatabase = async () => {
  await Commodity.deleteMany({});
  await Report.deleteMany({});
};
module.exports = {
  reportOne,
  reportTwo,
  setupDatabase,
};

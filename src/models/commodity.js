const mongoose = require("mongoose");
const Report = require("./report");
const math = require("mathjs");

const commoditySchema = new mongoose.Schema({
  cmdtyName: {
    type: String,
    required: true,
  },
  cmdtyID: {
    type: String,
    required: true,
  },
  marketID: {
    type: String,
    required: true,
  },
  marketName: {
    type: String,
    required: true,
  },

  priceUnit: {
    type: String,
    default: "Kg",
    required: true,
  },
  users: {
    type: Array,
    default: [],
  },

  price: {
    type: Number,
    required: true,
  },

  timestamp: {
    type: Number,
    required: true,
  },
});

commoditySchema.pre("save", async function (next) {
  const commodity = this;
  const commodities = await Report.find({ cmdtyID: commodity.cmdtyID });
  const newPrice = math.format(
    commodities.reduce((acc, com) => {
      return (acc += com.perKg);
    }, 0) / commodities.length,
    14
  );

  commodity.price = newPrice;
  next();
});

const Commodity = mongoose.model("commodity", commoditySchema);

module.exports = Commodity;

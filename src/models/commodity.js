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

  // Returning an array of all reports which matches with cmdtyID
  const commodities = await Report.find({ cmdtyID: commodity.cmdtyID });

  // Calculating mean Price
  const newPrice = math.format(
    commodities.reduce((acc, com) => {
      return (acc += com.perKg);
    }, 0) / commodities.length,
    14
  );

  // Updating the new mean Price
  commodity.price = newPrice;
  next();
});

const Commodity = mongoose.model("commodity", commoditySchema);

module.exports = Commodity;

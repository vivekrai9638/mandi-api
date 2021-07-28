const request = require("supertest");
const app = require("../../app");
const Report = require("../models/report");
const {
  reportOne,
  reportTwo,
  incorrectReport,
  setupDatabase,
} = require("./fixtures/db");

// before each test case
beforeAll(setupDatabase);

// variable to store id of commodity
let commodityId;

// Report 1 Testing - SUCCESS
test("should send the report and get the commodity ID", async () => {
  const response = await request(app)
    .post("/reports")
    .send(reportOne)
    .expect(200);

  commodityId = response.body.reportID;
  const report = await Report.findOne({
    cmdtyID: reportOne.reportDetails.cmdtyID,
    userID: reportOne.reportDetails.userID,
  });
  expect(report.perKg).toBe(14);
});

// Report 2 Testing - SUCCESS
test("should send the report and get the commodity ID", async () => {
  const response = await request(app)
    .post("/reports")
    .send(reportTwo)
    .expect(200);

  const report = await Report.findOne({
    cmdtyID: reportTwo.reportDetails.cmdtyID,
    userID: reportTwo.reportDetails.userID,
  });
  expect(report.perKg).toBe(16);
});

// Incorrect Report Testing - FAILURE
test("Should fail to get the commodity ID if mandatory fields are not provided", async () => {
  const response = await request(app)
    .post("/reports")
    .send(incorrectReport)
    .expect(400);
});

// Commodity Testing - SUCCESS
test("should return commodity details when right ID provided", async () => {
  const response = await request(app)
    .get(`/reports?id=${commodityId}`)
    .expect(200);

  expect(response.body.price).toBe(15);
});

// Commodity Testing - FAILURE
test("should not return details if incorrect ID provided", async () => {
  const response = await request(app)
    .get("/reports?id=123172812378612836")
    .expect(404);
});

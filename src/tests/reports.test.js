const request = require("supertest");
const app = require("../../app");
const Report = require("../models/report");
const { reportOne, reportTwo, setupDatabase } = require("./fixtures/db");

// before each test case
beforeAll(setupDatabase);

// variable to store id of commodity
let commodityId;

// Report 1 Testing
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

// Report 2 Testing
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

// Commodity Testing
test("should return commodity details", async () => {
  const response = await request(app)
    .get(`/reports?id=${commodityId}`)
    .expect(200);

  expect(response.body.price).toBe(15);
});

const express = require("express");
const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server up and running at ", PORT);
});

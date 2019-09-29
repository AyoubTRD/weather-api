const getWeather = require("./utils/getforecast");

const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

app.get("/getforecast", (req, res) => {
  if (!req.query.q) {
    return res.send({
      error: 'You must provide a search "q" query'
    });
  }
  getWeather(req.query.q, (err, data, place) => {
    res.send(data);
  });
});

app.get("*", (req, res) => {
  res.send({
    error: "Can't reach the given endpoint"
  });
});

app.listen(process.env.port || 5000, () =>
  console.log("The server has started...")
);

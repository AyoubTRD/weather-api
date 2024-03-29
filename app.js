const getWeather = require("./utils/getforecast");

const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());

app.get("/getforecast", (req, res) => {
  if (!req.query.q) {
    return res.send({
      error: 'You must provide a search "q" query'
    });
  }
  getWeather(req.query.q, (err, data, place) => {
    if (!data) {
      res.status(404).send({
        error: "An error occured while getting data"
      });
    }
    const response = {
      place,
      data
    };
    res.send(response);
  });
});

app.get("*", (req, res) => {
  res.send({
    error: "Can't reach the given endpoint"
  });
});

app.listen(port, () => console.log("The server has started..."));

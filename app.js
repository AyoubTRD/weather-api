const getWeather = require("./utils/getforecast");

const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

app.set("view engine", "ejs");
app.use(express.static("public"));

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

app.get("/", (req, res) => {
  res.render(`index`);
});

app.listen(process.env.port || 5000, () =>
  console.log("The server has started...")
);

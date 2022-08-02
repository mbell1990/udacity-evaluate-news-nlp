const baseURL = "https://api.meaningcloud.com/sentiment-2.1?key=";
const API_KEY = process.env.API_KEY;

const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

const app = express();

const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { response } = require("express");
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/", function (req, res) {
  res.send(mockAPIResponse);
});

// Post route

app.post("/", async (req, res) => {
  const res = await fetch(
    `${baseURL}${API_KEY}&of=json&lang=en&model=general&url=${req.body.url}`
  );
  try {
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

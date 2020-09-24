const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  //res.send("Server is started and running");

});

app.post("/", function(req, res) {
  const checkCity = req.body.selectedCity;
  const keyId = "5927f3a6779110f98328f49f5410048f";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + checkCity + "&APPID=" + keyId + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const tem = weatherData.main.temp;
      //console.log(temp);
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //console.log(desc);
      res.write("<p>Weather Description " + desc + ".")
      res.write("<h1>The temperature in " +checkCity +" is " + tem + " degrees</h1>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    })
    });
});
app.listen(3000, function() {
  console.log("Server started at port 3000");
});

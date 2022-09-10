const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    ///see appid (api key) on openweathermap website as it is confidential hence cannot be uploaded on git
    const appid = "";
    const units = "metric";


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write('<head><meta charset="utf-8"></head>');
            res.write("<h1 style='margin-left: 100px; margin-top : 100px;'>The Weather is currently " + weatherDescription + "<h1>");
            res.write("<h2 style='margin-left: 100px;'>The temperature in " + query + " is " + temp + " degrees Celcius.<h2>");
            res.write("<img style='margin-left: 100px;' src=" + imageUrl + ">");
            res.send();
        })
    })
})


app.listen(3000, function () {
    console.log("Server is running on port 3000");
})
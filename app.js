require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){


    res.sendFile(__dirname + "/index.html");

    
});

app.post("/", function (req, res) { 

    const query = req.body.cityName;
    const appId = process.env.APPID;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + appId +"&units=metric";
    

    https.get(url, function (response) { 
        console.log(response.statusCode);

        response.on("data", function (data) { 
            var weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            res.send("<h1>The temprature in " + query + " is "+ temp + " degree celcius</h1>");

         });

     });

 });

app.listen(3000, function(){
    console.log("App is running on port 3000");
});
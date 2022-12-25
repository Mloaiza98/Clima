const express = require("express")
const bodyParse = require("body-parser")
const https = require("https");
const { json } = require("body-parser");
const { dirname } = require("path");
const app = express();

app.use(express.static(__dirname));

app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req,res){
    const city = req.body.city
    const appKey= "a75fdec5d4a75617fa50b7470a57da4f"
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appKey+"&units=metric"
    https.get(url, function(resp){

        resp.on("data", function(data){
            const datosClima= JSON.parse(data)
            const name= datosClima.name
            const temp= datosClima.main.temp
            const des= datosClima.weather[0].main
            const images = "http://openweathermap.org/img/wn/"+datosClima.weather[0].icon+"@2x.png"
            res.write("<h1> El clima en "+name+ " Esta a :"+temp+"Grados Celcius </h1> <br>")
            res.write("<p> Clima:"+des+" <img src="+images+" ><p>")
            res.send ( )

        })
    })
})
app.listen(3000, function(req, res){
    console.log("Iniciado")
})

const express = require('express')
const router = express.Router()
const { model } = require('mongoose')
const request = require('request')
const City = require('../../models/City')
const apiWeather = 'http://api.openweathermap.org/data/2.5/weather'
const key = "60267082a25414f3754a6b84bf9c6a46"
const app = express()


router.get('/city/:cityName', function (req, res) {
    let city = req.params.cityName
    request(`${apiWeather}?q=${city}&APPID=${key}&units=metric`, function (error, response, body) {
        let parsedBody = JSON.parse(body)
        let cityWeather = {
           name : parsedBody.name,
           temperature : parsedBody.main.temp,
           condition : parsedBody.weather[0].description,
           conditionPic : parsedBody.weather[0].icon  
       }
       res.send(cityWeather)  
    });

})

router.get('/cities', function (req, res) {
    City.find({},function(err,  cities){
        res.send(cities)
    })
})

router.post('/city', function (req, res) {
        let {city}  = req.body
        console.log(city)
        request(`${apiWeather}?q=${city}&APPID=${key}&units=metric`, function (error, response, body) {
        let parsedBody = JSON.parse(body)
        console.log(parsedBody)
        let newCity = new City({
            name : parsedBody.name,
            temperature : parsedBody.main.temp,
            condition : parsedBody.weather[0].description,
            conditionPic : parsedBody.weather[0].icon  
        })
        newCity.save()
        res.end()
        })
    })

router.delete('/city/:cityName', function (req, res){
    let city = req.params.cityName
    City.findOneAndDelete({name:city},function(err,city){
        res.send(city)
    })
})

module.exports = router
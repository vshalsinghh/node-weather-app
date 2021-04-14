const request = require('postman-request');

const forecast = (lattitude, longitude, callback) => {
    const url=`http://api.weatherstack.com/current?access_key=a9023fa266f1b0762f4533109122c1c4&query=${lattitude},${longitude}`;

    request({url, json: true}, (error, { body } = {} ) => {
        if(error){
            callback('Unable to connect to Weather Service');
        } else if(body.error){
            callback('Unable to find location.Try another search.')
        }else{
            callback(undefined,`Weather is ${body.current.weather_descriptions[0]}. Humidity is at ${body.current.humidity}.  It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast;
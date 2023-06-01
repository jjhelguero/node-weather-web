const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9557e0d45d00ecb7c42a1f4338949b25&query=${latitude},${longitude}&units=f`

    request.get({url, json: true}, (error, {body}) => {
         if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.current
            const temp = data.temperature 
            const feelsLike = data.feelslike
            const weatherDescription = data.weather_descriptions[0]
            const windSpeed = data.wind_speed
            const windDegree = data.wind_degree
            const windDirection = data.wind_dir
            const weatherReport = `${weatherDescription}. It is currently ${temp} degrees outside. It feels like `
                + `${feelsLike} degrees outside with wind speeds of ${windSpeed} mph at ${windDegree} degrees in ${windDirection} direction.`
            callback(undefined, { weatherReport })
        }
    })
}

module.exports = forecast
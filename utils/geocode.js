const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3BhbW15cGFudHMiLCJhIjoiY2xoNnQ5dzlhMDE1NDNodWh2YTR2aTB6ZiJ9.GVBXxubs13ngYmA_yq7lOw&limit=1`
    request.get({url, json: true}, (error, {body}) => {
        // console.log(response.body.features[0].place_name)
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(
                undefined,
                {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                }
                )
        }
    })
}
module.exports = geocode
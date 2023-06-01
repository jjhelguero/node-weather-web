const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../utils/geocode');
const forecast = require("../utils/forecast");


const app = express()
const port = process.env.PORT || 3000

// defines paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Me'
    })
})

app.get('/about', (req, res) => {
  res.render("about", {
    title: "About Weather",
    description: "This is an app about weather",
    name: "Me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    description: "This is where you get help",
    name: "Me",
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }


  geocode(req.query.address, (geocodeError, { latitude, longitude, location } = {}) => {
    if (geocodeError) {
      return res.send({
        error: geocodeError,
      });
    }

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({
          error: forecastError,
        });
      }

      res.send({
        forecast: forecastData.weatherReport,
        location,
        address: req.query.address,
      });
    });
  });

}) 

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search parameter'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Me',
    errorMessage: 'Article not found'
  })
})

app.get('*', (req, res) => {
  res.render("404", {
    title: "404",
    name: "Me",
    errorMessage: "Page not found",
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
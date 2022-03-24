const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));
const port = process.env.PORT || 3000;

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Oli',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Oli',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This page has help!',
    title: 'Help',
    name: 'Oli',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help article not found',
    title: '404',
    name: 'Oli',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found',
    title: '404',
    name: 'Oli',
  });
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});

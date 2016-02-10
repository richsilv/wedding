var express = require('express')
var exphbs  = require('express-handlebars');

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})
app.get('/generic', function (req, res) {
  res.render('generic')
})
app.get('/elements', function (req, res) {
  res.render('elements')
})
app.get('/locations', function (req, res) {
  res.render('locations')
})
app.get('/transport', function (req, res) {
  res.render('transport')
})
app.get('/accommodation', function (req, res) {
  res.render('accommodation')
})
app.get('/gifts', function (req, res) {
  res.render('gifts')
})

app.listen(3005, function () {
  console.log('App listening on port 3000')
})

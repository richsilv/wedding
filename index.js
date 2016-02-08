var express = require('express')

var app = express()
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get('/generic', function (req, res) {
  res.sendFile(__dirname + '/generic.html')
})
app.get('/elements', function (req, res) {
  res.sendFile(__dirname + '/elements.html')
})
app.get('/locations', function (req, res) {
  res.sendFile(__dirname + '/locations.html')
})
app.get('/transport', function (req, res) {
  res.sendFile(__dirname + '/transport.html')
})
app.get('/accommodation', function (req, res) {
  res.sendFile(__dirname + '/accommodation.html')
})
app.get('/gifts', function (req, res) {
  res.sendFile(__dirname + '/gifts.html')
})

app.listen(3000, function () {
  console.log('App listening on port 3000')
})

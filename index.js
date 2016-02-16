var express = require('express')
var exphbs  = require('express-handlebars')
var json2csv = require('json2csv')
var nodemailer = require('nodemailer')
var mg = require('nodemailer-mailgun-transport')
var bodyParser = require('body-parser')
var JsonDB = require('node-json-db')
var randomString = require('random-string')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = new JsonDB('wedding-db', true, true)
var data = db.getData('/')
if (!data.responses) db.push('/responses', [])
var secretToken = randomString({ length: 12 })

var auth = {
  auth: {
    api_key: process.env.MAILER_API_KEY,
    domain: process.env.MAILER_DOMAIN
  }
}
var nodemailerMailgun = nodemailer.createTransport(mg(auth))

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home', { secretToken: secretToken })
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
app.post('/response', urlencodedParser, function (req, res) {
  var responseDetails = req.body
  if (responseDetails.secretToken !== secretToken) return res.status(403).send('You are not authorised to respond.')
  responseDetails.attendance = JSON.parse(responseDetails.attendance)
  if (responseIsOkay(responseDetails)) {
    var mailOptions = makeMailOptions(responseDetails)
    nodemailerMailgun.sendMail(mailOptions, err => {
      if (err) {
        console.error(err)
        return res.status(503).send('Cannot process response at the moment, please try again later.')
      }
      db.push('/responses', [{
        name: responseDetails.name,
        email: responseDetails.email,
        date: new Date(),
        attending: responseDetails.attendance,
        castello: !!responseDetails['castello-accommodation'],
        sundayLunch: !!responseDetails['sunday-lunch'],
        message: responseDetails.message
      }], false)
      res.end('Success')
    })
  } else {
    res.status(400).send('Please check your response, some details seem to be missing.')
  }
})
app.get('/get-responses', urlencodedParser, function (req, res) {
  var data = db.getData('/responses')
  json2csv({ data }, (err, csv) => {
    if (err) return res.status(503).send(err)
    res.set({ 'Content-Disposition': 'attachment; filename="wedding-responses.csv"' })
    res.send(csv)
  })
})

app.listen(3000, function () {
  console.log('App listening on port 3000')
})

function responseIsOkay (responseDetails) {
  return responseDetails.name && responseDetails.email
}

function makeMailOptions (responseDetails) {
  return {
    from: 'Lizzy and Richard\'s Wedding <noreply@lizzyandrichardswedding.ml>',
    to: process.env.MAIL_RECIPIENTS,
    subject: `Wedding response from ${responseDetails.name} - ${responseDetails.attendance ? 'Coming' : 'Not coming'}`,
    text: `Name: ${responseDetails.name}
Email: ${responseDetails.email}
Attending: ${!!responseDetails.attendance}
Would like to stay at Castello: ${!!responseDetails['castello-accommodation']}
Interested in Sunday lunch: ${!!responseDetails['sunday-lunch']}
Message: ${responseDetails.message}
`
  }
}

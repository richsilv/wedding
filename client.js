$(document).ready(function() {
    $('.tooltip').tooltipster()
})

if ($('body.home').length) {
  $('header').addClass('alt')
  setupForm()
}

if ($('body.locations').length) {
  require('./lib/Leaflet.MakiMarkers.js')
  setupMaps()
}

function setupMaps () {
  var tuscanyMap = L.map('tuscany-map').setView([43.2580769, 11.6180715], 13)
  var serreMap = L.map('serre-map').setView([43.2580769, 11.6180715], 15)

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(tuscanyMap)
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(serreMap)

  var castelloIcon = L.MakiMarkers.icon({icon: 'star', color: '#ee9988', size: 'l'})
  var airportIcon = L.MakiMarkers.icon({icon: 'airport', color: '#998844', size: 'l'})
  var townHallIcon = L.MakiMarkers.icon({icon: 'town-hall', color: '#ee9988', size: 'l'})
  var trainIcon = L.MakiMarkers.icon({icon: 'rail', color: '#998844', size: 'l'})

  var tuscanyMarkers = []
  var serreMarkers = []
  tuscanyMarkers.push(L.marker([43.2580769, 11.6180715], {icon: castelloIcon}).addTo(tuscanyMap)
    .bindPopup('Castello delle Serre<br>Piazza XX Settembre, 1<br>53040 Serre di Rapolano').openPopup())
  tuscanyMarkers.push(L.marker([43.0947870,12.5033100], {icon: airportIcon}).addTo(tuscanyMap)
    .bindPopup('Perugia airport'))
  tuscanyMarkers.push(L.marker([43.8086530,11.2012250], {icon: airportIcon}).addTo(tuscanyMap)
    .bindPopup('Florence airport'))
  tuscanyMarkers.push(L.marker([43.6890840,10.3978850], {icon: airportIcon}).addTo(tuscanyMap)
    .bindPopup('Pisa airport'))
  tuscanyMarkers.push(L.marker([44.5345220,11.2878590], {icon: airportIcon}).addTo(tuscanyMap)
    .bindPopup('Bologna airport'))
  tuscanyMarkers.push(L.marker([41.7993350,12.5903280], {icon: airportIcon}).addTo(tuscanyMap)
    .bindPopup('Rome airport (Ciampino)'))
  tuscanyMarkers.push(L.marker([41.7998870,12.2462380], {icon: airportIcon}).addTo(tuscanyMap)
    .bindPopup('Rome airport (Leonardo da Vinci)'))
  serreMarkers.push(L.marker([43.2580769, 11.6180715], {icon: castelloIcon}).addTo(serreMap)
    .bindPopup('Castello delle Serre<br>Piazza XX Settembre, 1<br>53040 Serre di Rapolano').openPopup())
  serreMarkers.push(L.marker([43.3314949, 11.7252489], {icon: townHallIcon}).addTo(serreMap)
    .bindPopup('Town Hall, Monte San Savino<br>Corso Sangallo, 38'))
  serreMarkers.push(L.marker([43.2832859,11.6025952], {icon: trainIcon}).addTo(serreMap)
    .bindPopup('Rapolano Terme train station'))

  var tuscanyMarkerGroup = new L.featureGroup(tuscanyMarkers)
  tuscanyMap.fitBounds(tuscanyMarkerGroup.getBounds())
  var serreMarkerGroup = new L.featureGroup(serreMarkers)
  serreMap.fitBounds(serreMarkerGroup.getBounds())

}

function setupForm () {
  var $button = $('[data-action="submit"]')
  var $message = $('[data-field="message"]')

  $button.on('click', function (evt) {
    evt.preventDefault()
    var formData = $('form').serialize()
    $button.attr('disabled', true)

    $.post('/response', formData)
      .done(function () {
        $message.html('Thanks very much for submitting your response!')
        $button.attr('disabled', false)
      })
      .fail(function (err) {
        $message.html(err.responseText)
        $button.attr('disabled', false)
      })
  })
}

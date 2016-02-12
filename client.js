if ($('body.locations').length) {
  require('./lib/Leaflet.MakiMarkers.js')
  setupTuscanyMap()

  function setupTuscanyMap () {
    var map = L.map('tuscany-map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var castelloIcon = L.MakiMarkers.icon({icon: 'star', color: '#ee9988', size: 'l'})
    var airportIcon = L.MakiMarkers.icon({icon: 'airport', color: '#998844', size: 'l'})

    var markers = []
    markers.push(L.marker([43.2580769, 11.6180715], {icon: castelloIcon}).addTo(map)
      .bindPopup('Castello delle Serre').openPopup())
    // markers.push(L.marker([43.3314949, 11.7252489]).addTo(map)
    //   .bindPopup('Town Hall, Monte San Savino'))
    // markers.push(L.marker([43.2832859,11.6025952]).addTo(map)
    //   .bindPopup('Rapelano Terme train station'))
    markers.push(L.marker([43.0947870,12.5033100], {icon: airportIcon}).addTo(map)
      .bindPopup('Perugia airport'))
    markers.push(L.marker([43.8086530,11.2012250], {icon: airportIcon}).addTo(map)
      .bindPopup('Florence airport'))
    markers.push(L.marker([43.6890840,10.3978850], {icon: airportIcon}).addTo(map)
      .bindPopup('Pisa airport'))
    markers.push(L.marker([44.5345220,11.2878590], {icon: airportIcon}).addTo(map)
      .bindPopup('Bologna airport'))
    markers.push(L.marker([41.7993350,12.5903280], {icon: airportIcon}).addTo(map)
      .bindPopup('Rome airport (Ciampino)'))
    markers.push(L.marker([41.7998870,12.2462380], {icon: airportIcon}).addTo(map)
      .bindPopup('Rome airport (Leonardo da Vinci)'))

    var markerGroup = new L.featureGroup(markers)
    map.fitBounds(markerGroup.getBounds())
  }
}

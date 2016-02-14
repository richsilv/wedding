(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    .bindPopup('Rapelano Terme train station'))

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

},{"./lib/Leaflet.MakiMarkers.js":2}],2:[function(require,module,exports){
/*
 * Leaflet plugin to create map icons using Maki Icons from MapBox.
 *
 * References:
 *   Maki Icons: https://www.mapbox.com/maki/
 *   MapBox Marker API: https://www.mapbox.com/developers/api/static/#markers
 *
 * Usage:
 *   var icon = L.MakiMarkers.icon({icon: "rocket", color: "#b0b", size: "m"});
 *
 * License:
 *   MIT: http://jseppi.mit-license.org/
 */
 /*global L:false */
(function () {
  "use strict";
  L.MakiMarkers = {
    // Available Maki Icons
    icons: ["airfield","airport","alcohol-shop","america-football","art-gallery","bakery","bank","bar",
      "baseball","basketball","beer","bicycle","building","bus","cafe","camera","campsite","car",
      "cemetery","chemist","cinema","circle-stroked","circle","city","clothing-store","college",
      "commercial","cricket","cross","dam","danger","disability","dog-park","embassy",
      "emergency-telephone","entrance","farm","fast-food","ferry","fire-station","fuel","garden",
      "golf","grocery","hairdresser","harbor","heart","heliport","hospital","industrial",
      "land-use","laundry","library","lighthouse","lodging","logging","london-underground",
      "marker-stroked","marker","minefield","mobilephone","monument","museum","music","oil-well",
      "park2","park","parking-garage","parking","pharmacy","pitch","place-of-worship",
      "playground","police","polling-place","post","prison","rail-above","rail-light",
      "rail-metro","rail-underground","rail","religious-christian","religious-jewish",
      "religious-muslim","restaurant","roadblock","rocket","school","scooter","shop","skiing",
      "slaughterhouse","soccer","square-stroked","square","star-stroked","star","suitcase",
      "swimming","telephone","tennis","theatre","toilets","town-hall","town","triangle-stroked",
      "triangle","village","warehouse","waste-basket","water","wetland","zoo"
    ],
    defaultColor: "#0a0",
    defaultIcon: "circle-stroked",
    defaultSize: "m",
    apiUrl: "https://api.tiles.mapbox.com/v3/marker/",
    smallOptions: {
      iconSize: [20, 50],
      popupAnchor: [0,-20]
    },
    mediumOptions: {
      iconSize: [30,70],
      popupAnchor: [0,-30]
    },
    largeOptions: {
      iconSize: [36,90],
      popupAnchor: [0,-40]
    }
  };

  L.MakiMarkers.Icon = L.Icon.extend({
    options: {
      //Maki icon: any from https://www.mapbox.com/maki/ (ref: L.MakiMarkers.icons)
      icon: L.MakiMarkers.defaultIcon,
      //Marker color: short or long form hex color code
      color: L.MakiMarkers.defaultColor,
      //Marker size: "s" (small), "m" (medium), or "l" (large)
      size: L.MakiMarkers.defaultSize,
      shadowAnchor: null,
      shadowSize: null,
      shadowUrl: null,
      className: "maki-marker"
    },

    initialize: function(options) {
      var pin;

      options = L.setOptions(this, options);

      switch (options.size) {
        case "s":
          L.extend(options, L.MakiMarkers.smallOptions);
          break;
        case "l":
          L.extend(options, L.MakiMarkers.largeOptions);
          break;
        default:
          options.size = "m";
          L.extend(options, L.MakiMarkers.mediumOptions);
          break;
      }


      pin = "pin-" + options.size;

      if (options.icon !== null) {
        pin += "-" + options.icon;
      }

      if (options.color !== null) {
        if (options.color.charAt(0) === "#") {
          options.color = options.color.substr(1);
        }

        pin += "+" + options.color;
      }

      options.iconUrl = "" + L.MakiMarkers.apiUrl + pin +  ".png";
      options.iconRetinaUrl = L.MakiMarkers.apiUrl + pin + "@2x.png";
    }
  });

  L.MakiMarkers.icon = function(options) {
    return new L.MakiMarkers.Icon(options);
  };
})();

},{}]},{},[1]);

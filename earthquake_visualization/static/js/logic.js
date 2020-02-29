function createMap(earthquakeData) {

  // Creat tile layer
  var lightMap = L.tileLayer(MAPBOX_URL, {
    attribution: ATTRIBUTION,
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var satMap = L.tileLayer(MAPBOX_URL, {
    attribution: ATTRIBUTION,
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold base layer
  var baseMaps = {
    "Grayscale": lightMap,
    "Satellite": satMap
  };

  // Create an overlayMaps object for earthquakeData layer
  var overlayMaps = {
    "Earthquakes": earthquakeData,
    //"Fault Lines": faultData
  };

  // Create map
  var map = L.map('map', {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [lightMap, earthquakeData]
  });

  // Create layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  return map;

}

// Function to get colors for each circle
function getColor(mag) {
  if (mag >= 5) {
    return 'red';
  } else if (mag >= 4) {
    return 'orange';
  } else if (mag >= 3) {
    return 'yellow';
  } else {
    return 'green';
  }
}

function renderCircles(response) {

  // Render a circle based on magnitude
  var earthquakes = response.features
  console.log(earthquakes);

  var circles = []

  // Loop through each earthquake
  // Give each feature a popup describing the place, time, and magnitude of the earthquake

  for (var i = 0; i < earthquakes.length; i++) {
    var earthquake = earthquakes[i];


    var circle = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
      radius: earthquake.properties.mag * 25000,
      color: "black",
      weight: 1,
      fillColor: getColor(earthquake.properties.mag),
      fillOpacity: 0.5
    }).bindPopup("<h4>" + "Location: " + earthquake.properties.place + "</h4><hr><p>" + "Magnitude: " + (earthquake.properties.mag) + "</p>");

    circles.push(circle);
  }

  var map = createMap(L.layerGroup(circles));

  createLegend(map);

}

// Perform API call
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", renderCircles)

// Second API call
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json", renderLines)

// Set up the legend
function createLegend(map) {
  var legend = new L.control({ position: 'bottomright' });
  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
    labels = []
    legendLabels = ['0-3', '3-4', '4-5', '5+'],
      grades = [2, 3, 4, 5];

      for (var i = 0; i < grades.length; i++) {

        labels.push(
            '<i class="label" style="background:' + getColor(grades[i]) + '"></i> ' + legendLabels[i]
        );

    }
    div.innerHTML = labels.join('<br>');
      return div;
    };
    legend.addTo(map);
  }


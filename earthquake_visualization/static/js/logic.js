

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

// Create map
var map = L.map('map', {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [lightMap, satMap]
});

lightMap.addTo(map);

var faultData = new L.layerGroup();
var earthquakeData = new L.layerGroup();

// Create a baseMaps object to hold base layer
var baseMaps = {
    "Grayscale": lightMap,
    "Satellite": satMap
};

// Create an overlayMaps object for earthquakeData layer
var overlayMaps = {
    "Earthquakes": earthquakeData,
    "Tectonic Plates": faultData
};

// Create layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);



// Perform API call
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function (data) {
    function renderCircles(earthquake) {
        return {
            opacity: 1,
            fillOpacity: 0.5,
            fillColor: getColor(earthquake.properties.mag),
            color: "black",
            radius: earthquake.properties.mag * 4,
            stroke: true,
            weight: 1,
            
            
        };
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

    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng)
        },
        style: renderCircles,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h4>" + "Location: " + feature.properties.place + "</h4><hr><p>" + "Magnitude: " + (feature.properties.mag) + "</p>")

        }
    }).addTo(earthquakeData)

    earthquakeData.addTo(map);

    // Set up the legend

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
});

// Second API call
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json",
    function (plateData) {
        L.geoJson(plateData, {
            color: "orange",
            weight: 2
        }).addTo(faultData);

        faultData.addTo(map);
    });




// Initialize local data file paths
// TODO: Dynamically import PORT to endpoints below
const HAM_ENDPOINT = 'http://localhost:3000/api/ham_repeaters'
const GMRS_ENDPOINT = 'http://localhost:3000/api/gmrs_repeaters'
const DIGI_ENDPOINT = 'http://localhost:3000/api/digipeaters'

// Initialize the Leaflet map
const map = L.map('map').setView([39.0, -78.3], 7); // Centering on Dulles Airport

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a Leaflet.markerClusterGroup
const markers = L.markerClusterGroup();

// Function to request data from an API
async function fetchData(apiUrl) {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Bad network response ' + response.statusText + ' from URL: ' + apiUrl);
    }
    return await response.json();
}

fetch(HAM_ENDPOINT)
    .then(response => response.json())
    .then(data => {
        data.forEach(repeater => {
            const { State, City, Frequency, Callsign, Offset, Notes, lat, lon } = repeater;
            // Create a marker for each repeater
            const marker = L.circleMarker([lat, lon], {
                radius: 8,
                fillColor: "blue",
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`
                <strong>${Callsign || "Callsign Unknown"}</strong><br>
                Frequency: ${Frequency + Offset || "N/A"}<br>
                Notes: ${Notes || "N/A"}<br>
                ${City + ", " + State}<br>
                License: Ham
            `); // Add a popup with Ham repeater info
            markers.addLayer(marker); // Add marker to the cluster
        });
        map.addLayer(markers); // Add cluster layer to map
    })
    .catch(error => console.error('Error fetching data:', error));


fetch(GMRS_ENDPOINT)
    .then(response => response.json())
    .then(data => {
        data.forEach(repeater => {
            const { Name, State, Latitude, Longitude, Frequency, Type, Status } = repeater;

            const marker = L.circleMarker([Latitude, Longitude], {
                radius: 8,
                fillColor: "red",
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(
                `<strong>${Name || "Name Unknown"}</strong><br>
                Frequency: ${Frequency}<br>
                Type: ${Type}<br>
                Status: ${Status}<br>
                License: GMRS
            `); // Add a popup with GMRS repeater info
            markers.addLayer(marker); // Add marker to the cluster
        });
        map.addLayer(markers); // Add cluster layer to map
    })
    .catch(error => console.error('Error fetching data:', error));

fetch(DIGI_ENDPOINT)
    .then(response => response.json())
    .then(data => {
        // Unpack the GeoJSON objects
        L.geoJSON(data, {
            onEachFeature: function (digipeater, digi_layer) {
              // Check if properties are available
              if (digipeater.properties) {
                // Create popup content from properties
                const popupContent = `
                  <strong>${digipeater.properties.call}</strong><br>
                  Last Heard: ${digipeater.properties.lastheard}<br>
                  Last Port: ${digipeater.properties.last_port}<br>
                  Grid: ${digipeater.properties.grid}<br>
                  SSID: ${digipeater.properties.ssid || 'N/A'}<br>
                  Heard: ${digipeater.properties.heard ? 'Yes' : 'No'}
                `;
                digi_layer.bindPopup(popupContent); // Bind the popup to the marker
              }
              markers.addLayer(digi_layer); // Add the digi_layer to the MarkerClusterGroup
            },
            pointToLayer: function (digipeater, latlng) {
                return L.circleMarker(latlng, {
                  radius: 8,
                  color: 'black',
                  fillColor: 'orange',
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
                });
              }
          });
          map.addLayer(markers); // Add the MarkerClusterGroup to the map
        })
    .catch(error => console.error('Error fetching data:', error));
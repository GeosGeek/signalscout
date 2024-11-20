// Initialize local data file paths
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

// Function to request data from any API
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
                radius: 8, fillColor: "#0000FF", color: "#000000",
                weight: 1, opacity: 1, fillOpacity: 0.8
            }).bindPopup(`
                <strong>${Callsign || "Callsign Unknown"}</strong><br>
                ${City + ", " + State}<br>
                Frequency: ${Frequency + Offset || "N/A"}<br>
                CTCSS: ${Notes || "N/A"}<br>
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
                radius: 8, fillColor: "#FF0000", color: "#000000",
                weight: 1, opacity: 1, fillOpacity: 0.8
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
        data.forEach(repeater => {
            L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    // Create the popup content
                    const popupContent = `<strong>Call Sign:</strong> ${feature.properties.call}`;
                    layer.bindPopup(popupContent);  
                }
            }).addTo(map);
        })
    })
    .catch(error => console.error('Error fetching data:', error));
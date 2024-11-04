// Initialize local data file paths
const HAM_FILE = 'data/repeaters_ham.json'
const GMRS_FILE = 'data/repeaters_gmrs_bulk.json'
const HAM_ENDPOINT = `http://localhost:3000/${HAM_DATA}`
const GMRS_ENDPOINT = 'http://localhost:3000/${GMRS_DATA}'

// Initialize the Leaflet map
const map = L.map('map').setView([38.95, -77.45], 10); // Centering on Dulles Airport

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

// Fetch ham repeaters from local JSON
// ham_json = fetchData(HAM_ENDPOINT)
// .then(data => {
//     data.forEach(repeater => {
//         const { State, City, Frequency, Callsign, Offset, Notes, lat, lon } = repeater;

//         // Create a marker for each repeater
//         const marker = L.circleMarker([lat, lon], {
//             radius: 8, fillColor: "#0000FF", color: "#000000",
//             weight: 1, opacity: 1, fillOpacity: 0.8
//         }).bindPopup(`
//             <strong>${Callsign || "Callsign Unknown"}</strong><br>
//             ${City + ", " + State}<br>
//             Frequency: ${Frequency + Offset || "N/A"}<br>
//             CTCSS: ${Notes || "N/A"}<br>
//             License: Ham
//         `); // Add a popup with Ham repeater info
        
//         markers.addLayer(marker); // Add marker to the cluster
//     });
//     map.addLayer(markers); // Add cluster layer to map
// })
// .catch(error => {
//     console.error('Error loading JSON:', error);
// });

// Load GMRS Data
gmrs_json = fetchData(GMRS_FILE)
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
.catch(error => {
    console.error('Error loading JSON:', error);
});

fetch('http://localhost:3000/data/ham_repeaters')
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
    .catch(error => console.error('Error fetch data:', error));
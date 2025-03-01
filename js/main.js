// Initialize local data file paths
const HAM_ENDPOINT = 'http://localhost:3000/api/ham_repeaters';
const GMRS_ENDPOINT = 'http://localhost:3000/api/gmrs_repeaters';
const DIGI_ENDPOINT = 'http://localhost:3000/api/digipeaters';

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

// Reusable function to process data and add markers
async function processData(endpoint, extractProperties, popupTemplate, markerOptions) {
    try {
        const data = await fetchData(endpoint);
        console.log(`${endpoint} data:`, data); // Log the fetched data
        data.forEach(record => {
            const properties = extractProperties(record);
            console.log(`${endpoint} record:`, record); // Log each record
            const marker = L.circleMarker([properties.lat, properties.lon], markerOptions)
                .bindPopup(popupTemplate(properties)); // Add a popup with record info
            markers.addLayer(marker); // Add marker to the cluster
        });
        map.addLayer(markers); // Add cluster layer to map
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
    }
}

// Define property extraction for each endpoint
const hamProperties = record => ({
    state: record.State,
    city: record.City,
    frequency: record.Frequency,
    callsign: record.Callsign,
    offset: record.Offset,
    notes: record.Notes,
    lat: record.lat,
    lon: record.lon
});

const gmrsProperties = record => ({
    name: record.Name,
    state: record.State,
    frequency: record.Frequency,
    type: record.Type,
    status: record.Status,
    lat: record.Latitude,
    lon: record.Longitude
});

const digiProperties = record => ({
    call: record.properties.call,
    last_heard: record.properties.lastheard,
    last_port: record.properties.last_port,
    grid: record.properties.grid,
    ssid: record.properties.ssid,
    heard: record.properties.heard,
    lat: record.geometry.coordinates[1],
    lon: record.geometry.coordinates[0]
});

// Define popup templates for each endpoint
const hamPopupTemplate = properties => `
    <strong>${properties.callsign || "Callsign Unknown"}</strong><br>
    ${properties.city + ", " + properties.state}<br>
    Frequency: ${properties.frequency + properties.offset || "N/A"}<br>
    Notes: ${properties.notes || "N/A"}<br>
    License: Ham
`;

const gmrsPopupTemplate = properties => `
    <strong>${properties.name || "Callsign Unknown"}</strong><br>
    Frequency: ${properties.frequency}<br>
    Type: ${properties.type}<br>
    Status: ${properties.status}<br>
    License: GMRS
`;

const digiPopupTemplate = properties => `
    <strong>${properties.call}</strong><br>
    Last Heard: ${properties.last_heard}<br>
    Last Port: ${properties.last_port}<br>
    Grid: ${properties.grid}<br>
    SSID: ${properties.ssid || 'N/A'}<br>
    Heard: ${properties.heard ? 'Yes' : 'No'}
`;

// Define options shared across markers
const baseMarkerOptions = {
    radius: 8,
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// Process data for each endpoint with specific marker options
processData(HAM_ENDPOINT, hamProperties, hamPopupTemplate, {
    ...baseMarkerOptions,
    fillColor: "blue"
});

processData(GMRS_ENDPOINT, gmrsProperties, gmrsPopupTemplate, {
    ...baseMarkerOptions,
    fillColor: "red"
});

processData(DIGI_ENDPOINT, digiProperties, digiPopupTemplate, {
    ...baseMarkerOptions,
    fillColor: "orange"
});
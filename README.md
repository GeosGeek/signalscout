# Signal Scout - scout public radio signal anywhere!

Ham and GMRS repeaters in one map! Signal Scout aims to reduce time and effort required for radio users to select their loadout.

![Signal Scout Demo](./signal_scout_demo.gif)

## Overview

Outdoor enthusiasts use handheld radios to communicate with friends, family, or even emergency services. Their tools of choice are often FRS, GMRS, or Ham radios. Although the latter two options require an FCC license to transmit, they enable operators to use repeaters, significantly increasing the transmission range of a low-power handheld radio.

Signal Scout displays both Ham and GMRS repeater locations, so operators can choose their loadout accordingly.

Signal Scout fetches open source Ham and GMRS repeater data and displays it on a Leaflet map. Each marker represents a repeater, with details shown in a popup when clicked.

## Repeater Frequencies / Bands
Signal Scout currently only includes VHF, UHF, and GMRS repeater information. Repeaters operating on any other band are not included.

## Future Imrpovements
### Display
- ~~Display all attributes for each repeater~~
- ~~Display multiple reapeaters in same location with Leaflet.markerCluster~~
- Enable users to explore more repeater attributes if desired
### Data Storage
- Load repeater data from local files 
  - ~~Load GMRS repeater data for multiple states~~
  - Load Ham repeater data for multiple states
- ~~Standup lightweight database locally~~
  - ~~Choose between Postgres/PostGIS, MongoDB/GeoJSON, or SQLite/SpatiaLite~~
- Develop RESTful API to handle CRUD opertaions
  - ~~Implement with Express.js or similar~~
  - ~~Fetch data from API in main.js~~
  - Create, ~~Read~~, Update, Delete
### Data Retrieval
- Fetch data from APIs if not found locally
  - Fetch only data within user's current map extent
### Widgets
#### Explore React Leaflet
- Enable users to select from variety of basemaps
### Other
- Convert code base to Typescript
- Automate deployment of Signal Scout
- Leverage JS code standardization tool such as Prettier or ESLint

## Data Sources
- Levine Central API (ham repeaters)
  - https://www.levinecentral.com/repeaters/repeater_fetch.php
- MyGMRS API (GMRS repeaters)
  - https://api.mygmrs.com/repeaters
- Packet Radio Map (geoserver for digipeaters)
  - https://geo.packetradiomap.com/geoserver/web/

## Prerequisites
Before running the application, ensure you have the following installed:
- A web browser (e.g., Chrome, Firefox)
- Python (for running a local server)
  - Or Node.js (if you prefer to use `http-server`)

## Environment Setup
- `source ~.bashrc` Run this in home directory to set node environment variables
- `http-server`
- Install Docker (I used Docker Desktop since I'm on MacOS)
  - `docker install mongo`
  - `docker run --name mongodb -d -p 27017:27017 -v mongo-data:/data/db mongo`
    - `--name mongodb` Names the container
    - `-d` Runs the container in detached mode
    - `-p 27017:27017` Maps the MongoDB port to your local machine
    - `-v mongo-data:/data/db` Creates a Docker volume to persist data
    - `docker exec -it mongodb mongo` Runs the mongodb container?
- Install mongodb
  - Followed directions for `brew` install here: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-install
  - Started service with `brew services start mongodb-community@8.0`
  - Loaded JSON data to local mongodb instance using `mongoimport --db signalScout --collection gmrsrepeaters --file Documents/signalscout/data/repeaters_gmrs_bulk.json --jsonArray`
    - Suggest using only lowercase letters for collection names
      - For some reason, upon creation of the mongoose schemas and models, the express server would be executed and create new collections with all lowercase, despite camel casing being used when creating the collection.

## Troubleshooting
- If browser doesn't seem to us latest code, try:
  - Clearing browser history and cache
  - Restarting `http-server` with `ctrl+c`

KQ4PTJ, 73!
# Signal Scout - scout public radio signal anywhere!

Ham and GMRS repeaters in one map! Signal Scout aims to reduce time and effort required for radio users to select their loadout.

![Snip of SignalScout UI](./signalscout-page.png)

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
  ~~Load GMRS repeater data for multiple states~~
  - Load Ham repeater data for multiple states
- Standup lightweight database locally
  - Choose between Postgres/PostGIS, MongoDB/GeoJSON, or SQLite/SpatiaLite
- Develop RESTful API to handle CRUD opertaions
  - Implement with Express.js or similar
  - Fetch data from API in main.js
### Data Retrieval
- Fetch data from APIs if not found locally
  - Fetch only data within user's current map extent
### Widgets
- Enable users to select from variety of basemaps

## Data Sources
- Liveine Central API
  - https://www.levinecentral.com/repeaters/repeater_fetch.php?
- MyGMRS API
  - https://api.mygmrs.com/repeaters?

## Prerequisites
Before running the application, ensure you have the following installed:
- A web browser (e.g., Chrome, Firefox)
- Python (for running a local server)
  - Or Node.js (if you prefer to use `http-server`)

## Environment Setup
- `source ~.bashrc` Run this in home directory to set node environment variables
- `http-server`

KQ4PTJ, 73!
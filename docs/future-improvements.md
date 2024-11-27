## Future Imrpovements
### Display
- ~~Display all attributes for each repeater~~
- ~~Display multiple reapeaters in same location with Leaflet.markerCluster~~
- Enable users to explore more repeater attributes if desired
### Data Storage
- ~~Load repeater data from local files~~
  - ~~Load GMRS repeater data for multiple states~~
  - ~~Load Ham repeater data for multiple states~~
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
- Toggle various repeater layers on/off (HAM/GMRS/DIGI)
- Enable users to select from variety of basemaps
#### Platform Migration
- Convert current code to React Leaflet component-based implementation
- Deploy Signal Scout as a React App
- Convert code base to TypeScript
- Wireframe mobile device UI
### Features
- Enable mobile users to download data by state, repeater type and store locally on device
### Other
- Leverage JS code standardization tool such as Prettier or ESLint
- Create a logo for Signal Scout
  - Cartoon image of radios (handhelds for ham, frs, and base stations) and a spy
- Convert code base to Typescript
- Automate deployment of Signal Scout
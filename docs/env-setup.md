## Prerequisites
Before running the application, ensure you have the following installed:
- A web browser (e.g., Chrome, Firefox)
- Python (for running a local server)
  - Or Node.js (if you prefer to use `http-server`)

## Local Deployment
- `source ~.bashrc` Run this in home directory to set node environment variables
- `npm start` inside signalscout directory. This references the `start` command in package.json which deploys the `http-server` and establishes connection with `mongodb`.

## Environment Setup
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
- If no data is being loaded to browser:
  - Double check there is data in the default mongo db `signalScout`
- If browser doesn't seem to use latest code, try:
  - Clearing browser history and cache
  - Restarting `http-server` with `ctrl+c`

## Miscelaneous
- Using `chai-http` version `4.3.0` due to issues (`ERR_PACKAGE_PATH_NOT_EXPORTED`) when running `mocha test` from `package.json` (used command `npm install chai-http@4.3.0 --save-dev`)
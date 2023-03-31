//
// Cat API Proxy
// by JD [ - ]
//

require('dotenv').config();
const path = require('path');
const express = require("express");
const cors = require("cors");
const nodecache = require('node-cache');

const PORT = process.env.PORT || 3001;
const API_HOST = process.env.API_HOST || 'https://api.thecatapi.com';
const API_KEY = process.env.API_KEY || 'DEMO-API-KEY';
const CACHE_TTL = process.env.CACHE_TTL || 3600

// This should make the site run a bit faster
const cache = new nodecache({ stdTTL: CACHE_TTL });

const catapi = require('./catapi')(API_HOST, API_KEY, cache);
const app = express();

// Set CORS Whitelist
const whitelist = ['http://127.0.0.1:3000', 'http://127.0.0.1:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors());


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get("/api", (req, res) => {
  res.json({ message: "Hello from CatWiki!" });
});

app.get("/api/breed", async (req, res, next) => {
  console.log('inside /api/breed')

  try {
    const response = await catapi.getBreeds();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.get("/api/breed/:breed_id", async (req, res, next) => {
  console.log('inside /api/breed/:breed_id')

  try {
    const response = await catapi.getBreedById(req?.params?.breed_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});


app.get("/api/breed/:breed_id/images", async (req, res, next) => {
  console.log('/api/breed/:breed_id/images')

  try {
    const response = await catapi.getImagesByBreedId(req?.params?.breed_id, req?.query?.limit);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.get("/api/search/breed", async (req, res, next) => {
  console.log('/api/search/breed');

  try {
    const response = await catapi.searchBreedByName(req?.query?.q);
    res.json(response);
  } catch (error) {
    next(error);
  }
})



// // All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
//
// Cat API Proxy
// by JD [ - ]
//

require('dotenv').config();
const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require("cors");
const nodecache = require('node-cache');
const bunyan = require('bunyan');


const PORT = process.env.PORT || 3001;
const APP_NAME = process.env.APP_NAME || "cat-wiki";
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const API_HOST = process.env.API_HOST || 'https://api.thecatapi.com';
const API_KEY = process.env.API_KEY || 'DEMO-API-KEY';
const CACHE_TTL = process.env.CACHE_TTL || 3600


const logger = bunyan.createLogger({ name: APP_NAME, level: LOG_LEVEL });

// This should make the site run a bit faster
const cache = new nodecache({ stdTTL: CACHE_TTL });

const catapi = require('./catapi')(API_HOST, API_KEY, cache);
const statisticsapi = require('./statisticsapi')(cache, logger);
const app = express();

// Set CORS Whitelist
const whitelist = ['http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'https://catwiki-jd.herokuapp.com']
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
  logger.info('Inside /api')
  res.json({ message: "Hello from CatWiki!" });
});

app.get("/api/breed", async (req, res, next) => {
  logger.info('Inside /api/breed')

  try {
    const response = await catapi.getBreeds();
    res.json(response);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

app.get("/api/breed/:breed_id", async (req, res, next) => {
  logger.info(`Inside /api/breed/${req?.params?.breed_id}`)

  try {
    const response = await catapi.getBreedById(req?.params?.breed_id);
    res.json(response);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});


app.get("/api/breed/:breed_id/images", async (req, res, next) => {
  logger.info(`Inside /api/breed/${req?.params?.breed_id}/images`)

  try {
    const response = await catapi.getImagesByBreedId(req?.params?.breed_id, req?.query?.limit);
    res.json(response);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

app.get("/api/search/breed", async (req, res, next) => {
  logger.info(`Inside /api/search/breed q: "${req?.query?.q ?? ""}"`);

  try {
    const response = await catapi.searchBreedByName(req?.query?.q);
    res.json(response);
  } catch (error) {
    logger.error(error);
    next(error);
  }
})

app.get('/api/stats', async (req, res, next) => {
  logger.info(`GET /api/stats?report_id"${req?.query?.report ?? ""}"`);

  try {
    const response = await statisticsapi.getReport(req?.query?.report_id);
    res.json(response);
  } catch (error) {
    logger.error(error);
    next(error);
  }
})

app.post('/api/stats', jsonParser, async (req, res, next) => {
  logger.info(`POST /api/stats?report_id="${req?.query?.report_id ?? ""}\n Body: ${JSON.stringify(req?.body)}`);

  try {
    let response = await statisticsapi.setReport(req?.query?.report_id, req?.body)
    if (response) { res.sendStatus(200); }
    else { res.sendStatus(422) } // failed operation
  } catch (error) {
    logger.error(error);
    next(error);
  }
})


// // All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});
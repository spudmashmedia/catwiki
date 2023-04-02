# CatWiki by JD@Spudmash Media
- [CatWiki by JD@Spudmash Media](#catwiki-by-jdspudmash-media)
  - [Documentation](#documentation)
  - [Starting the backend](#starting-the-backend)
    - [Pre-work](#pre-work)
  - [Starting the frontend](#starting-the-frontend)
  - [Running frontend tests](#running-frontend-tests)
  - [Deploying to Heroku](#deploying-to-heroku)
  - [Pushing changes to your GitHub repository](#pushing-changes-to-your-github-repository)

---

## Documentation

- [Build Doc](/docs/BuildDoc.md)
- [User Stories Doc](/docs/UserStories.md)

---
## Starting the backend

### Pre-work
You will need to add a .env file in the root of the directory (use the .env_dev file as a template)
```
APP_NAME="cat-wiki"
LOG_LEVEL="info"
API_HOST="https://api.thecatapi.com"
API_KEY="DEMO-API-KEY"
CACHE_TTL=3600
REACT_APP_SERVER_HOST="http://localhost:3001"
```

| key       | value                     | description                                                                                                                     |
| --------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| APP_NAME | cat-api| used with Bunyan for identifing the app in the console logs|
|LOG_LEVEL | info | using info level logging for all interactions. For websites with high traffic, you would switch to error to reduce the log pressure|
| API_HOST  | https://api.thecatapi.com | this is The Cat API hostname                                                                                                    |
| API_KEY   | default: DEMO-API-KEY     | replace this with you own key. You an get one from here https://thecatapi.com/signup                                            |
| CACHE_TTL | default:3600 seconds      | node-cache is used for in-memory caching. On first Home Page load, it will be slow, but every subsequent action will be quicker |


To start up the backend Node.js server, run the following command in your
terminal (note: you'll need to have Node v16.x or above installed):

```
npm start
```

The server will run on port 3001 by default. You can test it by running
something like this:

```
curl localhost:3001/api
{"message":"Hello from CatWiki!"}
```

## Starting the frontend

Open a new tab, and run the following commands in your terminal:

```
cd client
npm start
```

This should open up a new page in your default web browser at `localhost:3000`.
At this point, you should see the placeholder CatWiki app homepage.

## Running frontend tests

From the `client` directory, run the following:

```
npm test
```

This will run the test suite (WIP - still need to backfill) for you.

From the main directory, you can run Jest unit tests for the Express
Server:

```
npm test
```

OR 

Newman (Postman collection) integration tests against the Express server 
with the following (be sure to have the server running):

```
npm run newman
```

The tests can be loaded into Postman with
https://github.com/spudmashmedia/catwiki/tree/master/tests/integration




## Deploying to Heroku

First, make sure you have a Heroku account, and have successfully logged
in to Heroku on the command line via `heroku login`.

You'll need to create a new Heroku app (if you haven't already). You can
do this with the following (replace `${insert-your-app-name-here}` with the
word `catwiki` followed by your actual name, e.g. `catwiki-johnsmith`):

```
heroku app:create ${insert-your-app-name-here}
```

Next we need to add a Git remote for Heroku and commit any changes:

```
heroku git:remote -a ${insert-your-app-name-here}
git add .
git commit -am "Deploy app to Heroku"
```

Finally we can push our code to the Heroku remote, which will automatically
build and run our app for us. 

```
git push heroku master
```

You'll then be able to access your app at 
`http://${insert-your-app-name-here}.herokuapp.com`! :tada:

## Pushing changes to your GitHub repository

```
git remote add origin git@github.com:${your-github-username}/catwiki.git
git push origin master
```

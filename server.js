require('dotenv').config()
const {config} = require('./config.js')
const express = require('express');
const spotifyWebApi = require('spotify-web-api-node')
/* Load the HTTP library */
// var http = require("http");

const app = express();
const port = process.env.PORT || 5000;
console.log(config)
const spotifyApi = new spotifyWebApi({ ...config })

/* Create an HTTP server to handle responses */
// http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello World");
//   response.end();
// }).listen(8888);

app.get('/api/spotify-login', (req, res) => {
  const state = 'spotify'
  const dialogue = { show_dialogue : true }
  const url = spotifyApi.createAuthorizeURL(config.scopes, state, dialogue)
  res.send({url:url})
})

app.post('/api/auth-code', (req, res) => {
  const auth_code = req.headers.referer.split('=')[1].replace('&state', '')
  console.log(auth_code)

  spotifyApi.authorizationCodeGrant(auth_code).then(
  function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);
// Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);

})

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

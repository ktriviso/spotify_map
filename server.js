const express = require('express');
/* Load the HTTP library */
var http = require("http");

const app = express();
const port = process.env.PORT || 5000;

/* Create an HTTP server to handle responses */
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

app.get('/api/spotify-login', (req, res) => {
  console.log(req)
})

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

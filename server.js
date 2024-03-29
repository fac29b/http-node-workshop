const express = require("express");
const server = express();
const staticHandler = express.static("public");
const bodyParser = express.urlencoded();


server.post("/submit", bodyParser, (request, response) => {
  const name = request.body.name;
  response.redirect(`/submit/success?name=${name}`);
});
server.get("/submit/success", (request, response) => {
  const name = request.query.name;
  response.send(`<p>thanks for submitting, ${name}</p>`);
});


server.use(staticHandler);


server.use(logger);

//Routes
server.get("/", (request, response, next) => {
    console.log(request.method + " " + request.url);
    next();
});
function logger(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
}
// server.get("/", (request, response) => {
//     response.send(`<h1>Hello</h1>`);
// });
server.get("/", (request, response) => {
    const year = new Date().getFullYear();
    response.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Home</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <h1>Hello, it's ${year}</h1>
      </body>
    </html>
  `);
});
server.get("/oh-no", (request, response) => {
    response.status(500).send("something went wrong");
});
server.get("/search", (request, response) => {
    const keyword = request.query.keyword;
    response.send(`<p>You searched for ${keyword}</p>`)
})
server.use((request, response) => {
    response.status(404).send("<h1> Not Found</h1>");
});
server.post("/submit", (request, response) => {
  response.send("thanks for submitting");
});

module.exports = server;


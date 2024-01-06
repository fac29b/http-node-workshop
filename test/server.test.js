const test = require("node:test");
const assert = require("node:assert");
const server = require("../server.js");


test("home route returns expected page", async () => {
    const app = server.listen(9876);
    const response = await fetch("http://localhost:9876");
    app.close();

    assert.equal(response.status, 200);
    const body = await response.text();
    assert.equal(body, `
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
test("/oh-no route returns error message", async () => {
    const app = server.listen(9876);
    const response = await fetch("http://localhost:9876/oh-no");
    app.close();

    assert.equal(response.status, 500);
    const body = await response.text();
    assert.equal(body, "something went wrong")
});
test("/search returns message including keyword", async () => {
    const app = server.listen(9876);
    const response = await fetch ("http://localhost:9876/search?keyword=bananas");
    app.close;

    assert.equal(response.status, 200);
    const body = await response.text();
    assert.match(body, /You searched for bananas/);
});

console.log(process.env.TEST); // Logs: 123
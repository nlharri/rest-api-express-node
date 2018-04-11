# Simple read REST API with Express and Node

## What is this?
In this tutorial we will create a simple read REST API using Express.js and Node.js.

## Building the App

### Initialization
We will use the folder name rest-api-express-node. The following commands will initialize this folder for us:

```
mkdir rest-api-express-node
cd rest-api-express-node
npm init -y
```

### Adding body-parser
First we need to install the packages: `express.js` and `body-parser`. The `body-parser` package is a Node.js body parsing middleware, which parses incoming request bodies.

```
npm install --save express body-parser
```

We need to include body-parser and configure it in `index.js`. We will also use express.js:

```javascript
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3000, function () {
    console.log(`Example app listening on port {server.address().port}!`);
});
```

Some comments.
The `bodyParser.json()` returns middleware that only parses json. The `bodyParser.urlencoded({ extended: true })` call returns a middleware that only parses urlencoded bodies. The `extended` option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. For more information, please see the qs library. A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true). For more information see [body-parser package on npm](https://www.npmjs.com/package/body-parser).
With `app.use()` we tell express that we bind an application-level middleware to the instance. For more information see the [express.js documentation](http://expressjs.com/en/guide/using-middleware.html).

### Routing
We need to specify routes for the web server. For this we will use another `js` file, `routes.js`.

```javascript
var routes = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("REST API call of '/'");
  });
}

module.exports = routes;
```

This implementation will return the string `REST API call of '/'` every time the server root `/` is accessed.
We will need to include this file in our `index.js`. The updated `index.js` looks like the following:

```javascript
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log(`Example app listening on port {server.address().port}!`);
});
```

### Route parameters
For this tutorial we will use route parameter feature of express.js. For more information see the [express.js documentation](http://expressjs.com/en/guide/routing.html).
We will implement the query of a todo entry by using the following URL: `/todos/:todoid`.
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. In our example `todoid` is a route parameter,
When this kind of URL is accessed, we will return a dummy todo entry which we will generate on the fly.
We need to modify `routes.js`:

```javascript
var routes = function (app) {

  app.get("/", function(req, res) {
    res.status(200).send("REST API call of '/'");
  });

  app.get("/todos/:todoid", function (req, res) {
    var todoid = req.params.todoid;

    res.status(200).send({
      todoid: todoid,
      description: "Register for the marathon",
      details: "it must be done until 4.7.2018"
    });

  });
}

module.exports = routes;
```

We can run the app:

```
node index.js
```

Enter `http://localhost:3000/todos/123` to the URL in a browser.

This is just a very simple tutorial and test app to show the basics of using express routes and to return data in JSON format. 

## What are Future Plans for this Project?
  * Enhance with further operations
    * query
    * create
    * delete
    * update
  * Enhance with database access

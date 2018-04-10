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

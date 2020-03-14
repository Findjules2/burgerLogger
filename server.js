var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");

var app = express();
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
var PORT = process.env.PORT || 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Use Handlebars to render the main index.html page with the movies in it.
app.get("/", function(req, res) {
  db.Burger.findAll().then (allBurgers => {
    res.render("index", {burgers: allBurgers})
  });
  // connection.query("SELECT * FROM burgers;", function(err, data) {
  //   if (err) {
  //     return res.status(500).end();
  //   }
  //   console.log(data);
    
  //   res.render("index", { burgers: data });
  // });
});

app.post("/api/burgers", function(req, res) {
  db.Burger.create(req.body).then (burger => {
    res.json(burger)
  })
  // connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, result) {
  //   if (err) {
  //     return res.status(500).end();
  //   }

  //   // Send back the ID of the new movie
  //   res.json({ id: result.insertId });
  //   console.log({ id: result.insertId });
  // });
});
 
//Update is going to turn into Devore and turn boolean to true
app.put("/api/burgers/:id", function(req, res) {
  console.log(req.params.id);
  db.Burger.update({devoured: true},{where: {id: req.params.id}})
  .then (burger => {
    res.json(burger)
  })
  // connection.query("UPDATE burgers SET devoured = true WHERE id = ?", [req.params.id], function(err, result) {
  //   if (err) {
  //     // If an error occurred, send a generic server failure
  //     console.log(err)
  //     return res.status(500).end();
  //   }
  //   else if (result.changedRows === 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   }
  //   res.status(200).end();

  // });
});

// Start our server so that it can begin listening to client requests.
db.sequelize.sync({ force: true }).then(() => {
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
});
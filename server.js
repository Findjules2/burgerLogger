var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "burgerLoggerDB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the movies in it.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }
    console.log(data);
    
    res.render("index", { burgers: data });
  });
});

app.post("/api/burgers", function(req, res) {
  connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new movie
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// app.get("/all-non-pets", function(req, res) {
//     // Handlebars requires an object to be sent to the index handlebars file.
  
//     // 3. Loop through the animals, and send those that are not pets to the index handlebars file.
//     var data = {
//       animals: []
//     };
  
//     for (var i = 0; i < animals.length; i += 1) {
//       // Get the current animal.
//       var currentAnimal = animals[i];
  
//       // Check if this animal is a pet.
//       if (!currentAnimal.pet) {
//         // If not, push it into our data.animals array.
//         data.animals.push(currentAnimal);
//       }
//     }
  
//     res.render("index", data);
//   });

//Update is going to turn into Devore and turn boolean to true
app.put("/api/burgers/:id", function(req, res) {
  connection.query("UPDATE burgers SET devoured = true WHERE id = ?", [req.body.burger, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// app.delete("/api/burgers/:id", function(req, res) {
//   connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.affectedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();

//   });
// });

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

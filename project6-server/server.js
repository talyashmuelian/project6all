const express = require("express");
app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

var DBPlaceholder = require("./DBPlaceholder");
var Check = require("./Check");
//const hostname = "jsonplaceholder.typicode.com";

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/:collection", (req, res) => {
  const collection = req.params.collection;
  DBPlaceholder.get(collection, req.query)
    .then((result) => {
      console.log(result); // Access the result array here
      res.send(result);
    })
    .catch((error) => {
      console.error(error); // Handle any errors here
      return res.send("Error");
    });
});

app.get("/:collection/:id", (req, res) => {
  const collection = req.params.collection;
  DBPlaceholder.get(collection, { id: req.params.id })
    .then((result) => {
      console.log(result); // Access the result array here
      res.send(result);
    })
    .catch((error) => {
      //console.error(error); // Handle any errors here
      return res.send("Error");
    });
});
app.get("/:collection/:id/:moreCollection", (req, res) => {
  const collection = req.params.collection;

  DBPlaceholder.get(
    collection,
    { id: req.params.id },
    req.params.moreCollection
  )
    .then((result) => {
      console.log(result); // Access the result array here
      res.send(result);
    })
    .catch((error) => {
      //console.error(error); // Handle any errors here
      return res.send("Error");
    });
});

app.post("/:collection", (req, res) => {
  const collection = req.params.collection;
  const { error } = Check.check(collection, req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  console.log("line 62");
  console.log(req.body);

  DBPlaceholder.post(collection, req.body)
    .then((result) => {
      console.log(result); // Access the result array here
      return res.send(result);
    })
    .catch((error) => {
      console.error(error); // Handle any errors here
      return res.send("Internal Server Error"); //.status(500)
    });
});

app.put("/:collection/:id", (req, res) => {
  const collection = req.params.collection;
  // check body
  const { error } = Check.check(collection, req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  DBPlaceholder.put(collection, req.body)
    .then((result) => {
      console.log(result); // Access the result array here
      return res.send(result);
    })
    .catch((error) => {
      console.error(error); // Handle any errors here
    });
});

app.delete("/:collection/:id", (req, res) => {
  const collection = req.params.collection;
  DBPlaceholder.deletee(collection, req.params.id)
    .then((result) => {
      console.log(result); // Access the result array here
      return res.send(result);
    })
    .catch((error) => {
      console.error(error); // Handle any errors here
      return res.send("Internal Server Error");
    });
});

app.listen(4000, () => console.log("listen"));

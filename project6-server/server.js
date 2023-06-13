const express = require("express");
app = express();
const cors = require("cors");
app.use(cors());
const hostname = "jsonplaceholder.typicode.com";
var DBPlaceholder = require("./DBPlaceholder");
//import Check from "./Check";
//let DBPlaceholder = new DB();
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/:collection", (req, res) => {
  const collection = req.params.collection;
  DBPlaceholder.get(collection)
    .then((result) => {
      console.log(result); // Access the result array here
      res.send(result);
    })
    .catch((error) => {
      console.error(error); // Handle any errors here
    });
  // let result = DBPlaceholder.get(collection);
  // console.log("line 13");
  // console.log(result);
  //res.send(result);
});

app.get("/:collection/:id", (req, res) => {
  const collection = req.params.collection;
  DBPlaceholder.get(collection, req.params.id)
    .then((result) => {
      console.log(result); // Access the result array here
      res.send(result);
    })
    .catch((error) => {
      console.error(error); // Handle any errors here
    });

  // const jsonObject = DBPlaceholder.getOne(collection, req.params.id);
  // if (!jsonObject) return res.status(404).send("Not Found");
  // res.send(jsonObject);
});
app.get("/:collection/:id/:moreCollection", (req, res) => {
  const collection = req.params.collection;
  DBPlaceholder.get(collection, req.params.id, req.params.moreCollection)
    .then((result) => {
      console.log(result); // Access the result array here
      res.send(result);
    })
    .catch((error) => {
      console.error(error); // Handle any errors here
    });
});

app.post("/:collection", (req, res) => {
  // res.status(400).send("bad request")
  const { error } = Check.check(collection, req.body); // check body - how?
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // const collection = req.params.collection;
  // DBPlaceholder.post(collection,  req.body)
  //   .then((result) => {
  //     console.log(result); // Access the result array here
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     console.error(error); // Handle any errors here
  //   });

  res.send(DBPlaceholder.post(collection, req.body));
});

app.put("/:collection/:id", (req, res) => {
  // check body
  // res.status(400).send("bad request")
  const { error } = Check.check(collection, req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (!DBPlaceholder.get(collection, req.params.id)) {
    return res.status(404).send("Not Found");
  }
  if (DBPlaceholder.put(collection, req.body)) {
    return res.send("Added successfully");
  }
  return res.status().send(); //??
});

app.delete("/:collection/:id", (req, res) => {
  const flage = DBPlaceholder.delete(collection, req.params.id);
  if (!flage) return res.status(404).send("Not Found");
  res.send("Delete");
});

// class Server {
//   constructor() {
//     this.db = new DB();
//   }
//   generalSortFunc(method, url, itemName = null, data = null) {
//     if (method == "GET" && url == "https/ourProject/get/" + itemName) {
//       return this.get(itemName);
//     }
//     if (method == "GETALL" && url == "https/ourProject/getall") {
//       return this.getAll();
//     }
//     if (method == "PUT" && url == "https/ourProject/put") {
//       this.put(itemName, data);
//     }
//     if (method == "POST" && url == "https/ourProject/post") {
//       this.post(itemName, data);
//     }
//     if (method == "DELETE" && url == "https/ourProject/delete/" + itemName) {
//       this.deletee(itemName);
//     }
//   }
//   get(itemName) {
//     return this.db.get(itemName);
//   }
//   getAll() {
//     return this.db.getAll();
//   }
//   put(itemName, data) {
//     this.db.put(itemName, data);
//   }
//   post(itemName, data) {
//     this.db.post(itemName, data);
//   }
//   deletee(itemName) {
//     this.db.deletee(itemName);
//   }
// }

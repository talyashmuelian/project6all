const mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "322998386", //"password", // your password here
  port: 3306,
  database: "FullStackProject6", //- remove comment after first run
});

con.connect(async function (err) {
  if (err) throw err;
  console.log("Connected!");
});

let tables = ["users", "todos", "posts", "comments", "passwords"];

exports.get = function (tableName, itemID = {}, moreTableName = "") {
  return new Promise((resolve, reject) => {
    var sql;
    console.log("line 21");
    console.log(itemID);
    if (Object.keys(itemID).length === 0) {
      sql = `SELECT * FROM ${tableName}`;
    } else {
      if (moreTableName == "") {
        let q = "";
        Object.entries(itemID).forEach(([key, value]) => {
          q += `${key} = "${value}"`;
          //console.log(`Key: ${key}, Value: ${value}`);
        });

        sql = `SELECT * FROM ${tableName} WHERE ${q}`;
        //sql = `SELECT * FROM ${tableName} WHERE id = ${itemID}`;
      } else {
        let col = tableName.slice(0, -1) + "Id";
        Object.entries(itemID).forEach(([key, value]) => {
          //q += `${key} = "${value}"`;
          console.log(`Key: ${key}, Value: ${value}`);
        });
        console.log("line 37 " + itemID);
        sql = `SELECT * FROM ${moreTableName} WHERE ${col} = ${itemID.id}`;
      }
    }

    console.log("line 42");
    console.log(sql);

    if (!tables.some((item) => sql.includes(item))) {
      reject(new Error("Invalid table name"));
      return;
    }

    con.query(sql, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// exports.get = function (tableName, itemID = 0, moreTableName = "") {
//   var sql;
//   if (itemID == 0) {
//     //and moreTableName==""
//     sql = `SELECT * FROM ${tableName}`;
//   } else {
//     if (moreTableName == "") {
//       sql = `SELECT * FROM ${tableName} WHERE id = ${itemID}`;
//     } else {
//       let col = tableName.slice(0, -1);
//       col = col + "Id";
//       sql = `SELECT * FROM ${moreTableName} WHERE ${col} = ${itemID}`;
//     }
//   }
//   console.log("line 30");
//   console.log(sql);
//   let result1;
//   if (!tables.some((item) => sql.includes(item))) return;
//   return new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) reject(err);
//       resolve(result);
//     });
//   });
//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   //   result1 = result;
//   // });
//   // return result1;
// };
// function getAll(tableName) {
//   con.query(`SELECT * FROM ${tableName}`, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     return result;
//   });
// }
exports.put = function (tableName, data) {
  return new Promise((resolve, reject) => {
    if (!data.id) {
      reject(new Error("Updated member does not have a valid ID."));
      return;
    }

    let sql = `UPDATE ${tableName} SET ? WHERE id = ?`;
    let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;

    console.log("line 30");
    console.log(sql);

    if (!tables.some((item) => sql.includes(item))) {
      reject(new Error("Invalid table name"));
      return;
    }

    con.query(checkSql, data.id, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result[0].count === 0) {
          reject(new Error("No member with the specified ID exists."));
        } else {
          con.query(sql, [data, data.id], function (err, result) {
            if (err) {
              reject(err);
            } else {
              console.log("Member updated successfully.");
              resolve(result);
            }
          });
        }
      }
    });
  });
};
// exports.put = function (tableName, data) {
//   // Check if the updated member has a valid ID
//   if (!data.id) {
//     console.error("Updated member does not have a valid ID.");
//     return;
//   }

//   // Construct the SQL query
//   let sql = `UPDATE ${tableName} SET ? WHERE id = ?`;

//   // Check if the ID already exists in the table
//   let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;
//   con.query(checkSql, data.id, function (err, result) {
//     if (err) throw err;

//     if (result[0].count === 0) {
//       console.log("No member with the specified ID exists.");
//     } else {
//       // Update the existing member in the table
//       con.query(sql, [data, data.id], function (err, result) {
//         if (err) throw err;
//         console.log("Member updated successfully.");
//         return true;
//       });
//     }
//   });
// };

// exports.post = function (tableName, data) {
//   return new Promise((resolve, reject) => {
//     console.log(data);
//     if (!data.id) {
//       reject(new Error("There is no id"));
//       return;
//     }

//     let sql = `INSERT INTO ${tableName} SET ?`;
//     let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;

//     if (!tables.some((item) => sql.includes(item))) {
//       reject(new Error("Invalid table name"));
//       return;
//     }

//     con.query(checkSql, data.id, function (err, result) {
//       if (err) {
//         reject(err);
//       } else {
//         if (result[0].count > 0) {
//           reject(new Error("A member with the same ID already exists."));
//         } else {
//           con.query(sql, data, function (err, result) {
//             if (err) {
//               reject(err);
//             } else {
//               console.log("New member inserted successfully.");
//               resolve(result);
//             }
//           });
//         }
//       }
//     });
//   });
// };

exports.post = function (tableName, data) {
  return new Promise((resolve, reject) => {
    console.log(data);
    let sql = `INSERT INTO ${tableName} SET ?`;
    let checkSql = `SELECT MAX(id) AS maxId FROM ${tableName}`;

    if (!tables.some((item) => sql.includes(item))) {
      reject(new Error("Invalid table name"));
      return;
    }

    con.query(checkSql, function (err, result) {
      if (err) {
        reject(err);
      } else {
        const nextId = result[0].maxId + 1;
        data.id = nextId;

        con.query(sql, data, function (err, result) {
          if (err) {
            reject(err);
          } else {
            console.log("New member inserted successfully.");
            resolve(result);
          }
        });
      }
    });
  });
};

// exports.post = function (tableName, data) {
//   //check if data has id
//   if (!data.id) {
//     console.log("there is no id");
//     return;
//   }
//   let sql = `INSERT INTO ${tableName} SET ?`;
//   // בדיקה האם המזהה כבר קיים בטבלה
//   let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;
//   con.query(checkSql, data.id, function (err, result) {
//     if (err) throw err;

//     if (result[0].count > 0) {
//       console.log("A member with the same ID already exists.");
//     } else {
//       con.query(sql, data, function (err, result) {
//         if (err) throw err;
//         console.log("New member inserted successfully.");
//       });
//     }
//   });
// };
exports.deletee = function (tableName, itemID) {
  return new Promise((resolve, reject) => {
    if (!itemID) {
      reject(new Error("No valid ID provided."));
      return;
    }

    let sql = `DELETE FROM ${tableName} WHERE id = ?`;
    let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;

    if (!tables.some((item) => sql.includes(item))) {
      reject(new Error("Invalid table name"));
      return;
    }

    con.query(checkSql, itemID, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result[0].count === 0) {
          reject(new Error("No member with the specified ID exists."));
        } else {
          con.query(sql, itemID, function (err, result) {
            if (err) {
              reject(err);
            } else {
              console.log("Member deleted successfully.");
              resolve(result);
            }
          });
        }
      }
    });
  });
};
// exports.deletee = function (tableName, itemID) {
//   // Check if a valid ID is provided
//   if (!itemID) {
//     console.log("No valid ID provided.");
//     return;
//   }

//   // Construct the SQL query
//   let sql = `DELETE FROM ${tableName} WHERE id = ?`;

//   // Check if a member with the specified ID exists
//   let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;
//   con.query(checkSql, itemID, function (err, result) {
//     if (err) throw err;

//     if (result[0].count === 0) {
//       console.log("No member with the specified ID exists.");
//     } else {
//       // Delete the member from the table
//       con.query(sql, itemID, function (err, result) {
//         if (err) throw err;
//         console.log("Member deleted successfully.");
//       });
//     }
//   });
// };

let data = {
  id: 11,
  name: "talyaupdate",
  username: "talya",
  email: "talya@karina.biz",
  phone: "024-648-3800",
  website: "talya",
  rank: "user",
  api_key: "zLCyhlxcVRCisJNX9hUt",
};
// let newUser = {
//   id: 0,
//   username: "talya1",
//   password: "11",
// };
// post("passwords", newUser);
//post("users", data);
//deletee("users", 11);
//get("users");

// const express = require("express");
// app = express();
// const hostname = "jsonplaceholder.typicode.com";
// //import DBPlaceholder from "./DBPlaceholder";
// //import Check from "./Check";

// app.get("/", (req, res) => {
//   res.send("hello");
// });
// app.get("/:collection", (req, res) => {
//   const collection = req.params.collection;
//   res.send(collection);
// });

// app.get("/:collection", (req, res) => {
//   const collection = req.params.collection;
//   res.send(get(collection));
// });

// app.get("/:collection/:id", (req, res) => {
//   const jsonObject = DBPlaceholder.getOne(collection, req.params.id);
//   if (!jsonObject) return res.status(404).send("Not Found");
//   res.send(jsonObject);
// });

// app.post("/:collection", (req, res) => {
//   // res.status(400).send("bad request")
//   const { error } = Check.check(collection, req.body); // check body - how?
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   res.send(DBPlaceholder.post(collection, req.body));
// });

// app.put("/:collection/:id", (req, res) => {
//   // check body
//   // res.status(400).send("bad request")
//   const { error } = Check.check(collection, req.body);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   if (!DBPlaceholder.get(collection, req.params.id)) {
//     return res.status(404).send("Not Found");
//   }
//   if (DBPlaceholder.put(collection, req.body)) {
//     return res.send("Added successfully");
//   }
//   return res.status().send(); //??
// });

// app.delete("/:collection/:id", (req, res) => {
//   const flage = DBPlaceholder.delete(collection, req.params.id);
//   if (!flage) return res.status(404).send("Not Found");
//   res.send("Delete");
// });

//export default DBPlaceholder;

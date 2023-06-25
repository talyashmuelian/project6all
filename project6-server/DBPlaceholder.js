const mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "211378658", //"password" - your password here
  port: 3306,
  database: "FullStackProject66", //- remove comment after first run
});

con.connect(async function (err) {
  if (err) throw err;
  console.log("Connected!");
});

let tables = ["users", "todos", "posts", "comments", "passwords"];

exports.get = function (tableName, itemID = {}, moreTableName = "") {
  return new Promise((resolve, reject) => {
    if (
      tableName == "passwords" &&
      (itemID.password == undefined || itemID.username == undefined)
    ) {
      reject(new Error("You have no access, the information is confidential"));
      return;
    }
    var sql;
    console.log("line 21");
    console.log(itemID);
    if (Object.keys(itemID).length === 0) {
      sql = `SELECT * FROM ${tableName}`;
    } else {
      if (moreTableName == "") {
        let q = "";
        Object.entries(itemID).forEach(([key, value], i) => {
          if (i > 0) {
            q += " AND ";
          }
          q += `${key} = "${value}"`;
        });

        sql = `SELECT * FROM ${tableName} WHERE ${q}`;
      } else {
        let col = tableName.slice(0, -1) + "Id";
        Object.entries(itemID).forEach(([key, value]) => {
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
              console.log(result);
              resolve(data);
            }
          });
        }
      }
    });
  });
};

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
        if (tableName == "users") {
          data.api_key = nextId.toString();
        }

        con.query(sql, data, function (err, result) {
          if (err) {
            reject(err);
          } else {
            console.log("New member inserted successfully.");
            resolve(data);
          }
        });
      }
    });
  });
};

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

// let data = {
//   id: 11,
//   name: "talyaupdate",
//   username: "talya",
//   email: "talya@karina.biz",
//   phone: "024-648-3800",
//   website: "talya",
//   rank: "user",
//   api_key: "zLCyhlxcVRCisJNX9hUt",
// };

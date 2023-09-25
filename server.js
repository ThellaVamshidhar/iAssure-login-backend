const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(
    cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    })
   );

app.use(express.json());
app.listen(8081, () => {
   console.log("running server");
});

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "user",
 });

//  app.post('/register', (req, res)=> {

//     const username = req.body.username;
//    const password = req.body.password;
//    console.log("fsdaghfdgfasdg")
//     db.query(
//       "INSERT INTO login (username, password) VALUES (?,?)",
//       [username, password],
//       (err, result)=> {
//       console.log(err);
//       }
//     );
//     return res
//  });

app.post('/register', (req, res) => {
    // Extract username and password from the request body
    const username = req.body.username;
    const password = req.body.password;
  
    // Insert the username and password into the database
    db.query(
      "INSERT INTO login (username, password) VALUES (?, ?)",
      [username, password],
      (err, result) => {
        if (err) {
          // Log any errors that occur during the database query
          console.error('Error inserting into database:', err);
          return res.status(500).send('Internal Server Error');
        }
  
        // Log a success message if the insertion was successful
        console.log('User registered successfully');
        res.status(200).send('User registered successfully');
      }
    );
  });

 app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    db.query(
        "SELECT * FROM login WHERE username = ? AND password = ?",
        [username, password],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                res.send( result);
                }else({message: "Wrong username/password comination!"});
            }
        
    );
   });
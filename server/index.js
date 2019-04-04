const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const PORT_NUMBER = 8000;

const connection = mysql.createConnection({
  host: "nba-fantasy.c4orcjbvqblx.us-east-2.rds.amazonaws.com",
  database: "nba",
  user: "root",
  password: "thank-floral-badger-argo-mow"
});

connection.connect(err => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

app.use(cors());
app.use(express.json());

app.listen(PORT_NUMBER, () => {
  console.log("Example app listening on port 8000!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullname = req.body.fullname;

  let query = `INSERT INTO Users (user_name, user_password, full_name) VALUES ('${username}', '${password}', '${fullname}');`;

  connection.query(query, (error, result) => {
    console.log(error);
    if (error) {
      switch (error.errno) {
        case 1062:
          res.send({
            message: "Username is already taken. Please choose another one."
          });
          break;
        case 1406:
          res.send({
            message: "Username, password, or name is too long."
          });
          break;
      }
    } else {
      console.log(`Account "${username}" created.`);
      res.send({
        message:
          "Your account has been created. Please go back to the login page to login."
      });
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let query = `SELECT * FROM Users WHERE user_name = '${username}'`;
  connection.query(query, (error, result) => {
    if (result.length == 0) {
      res.send({
        login: false,
        message: `Username: ${username} not found.`
      });
    } else {
      if (result[0].user_password == password) {
        const message = {
          login: true,
          username: result[0].user_name,
          user_id: result[0].user_id,
          team_info: null
        };

        let teamID = result[0].team_id;

        if (teamID != null) {
          let teamQuery = `SELECT * FROM Teams WHERE team_id = ${teamID}`;
          connection.query(teamQuery, (teamError, teamResult) => {
            if (teamError) {
              console.log(teamError);
            } else {
              message.team_info = teamResult[0];
              res.send(message);
            }
          });
        } else {
          res.send(message);
        }

        console.log(`Username: ${username} has logged in`);
      } else {
        res.send({
          login: false,
          message: `Incorrect password for ${username}`
        });
      }
    }
  });
});

app.post("/createTeam", (req, res) => {
  let teamName = req.body.teamName;
  let userID = req.body.userID;

  let query = `INSERT INTO Teams (team_name) VALUES ('${teamName}');`;
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      // update user table with team_id
      let updateUserQuery = `UPDATE Users SET team_id = (SELECT team_id FROM Teams WHERE team_name = '${teamName}') 
				WHERE user_id = ${userID}`;

      connection.query(updateUserQuery, (userError, userResult) => {
        if (userError) {
          console.log(userError);
        } else {
          // send user the team object
          let teamQuery = `SELECT * FROM Teams WHERE team_id = (SELECT team_id FROM Users WHERE user_id = ${userID})`;

          connection.query(teamQuery, (teamError, teamResult) => {
            if (teamError) {
              console.log(teamError);
            } else {
              let message = {
                teamCreated: true,
                teamInfo: teamResult[0]
              };
              console.log(`Team created for userID: ${userID}`);
              res.send(message);
            }
          });
        }
      });
    }
  });
});

app.post("/search", (req, res) => {
  const playerNameSearchTerm = req.body.playerSearchTerm.split(" ");
  const teamSearchTerm = req.body.teamSearchTerm;
  const jerseySearchterm = req.body.jerseyNumberSearchterm;

  let searchPlayersQuery = `SELECT * FROM Players WHERE lower(Players.name) LIKE '%${playerNameSearchTerm[0].toLowerCase()}%'`;
  connection.query(searchPlayersQuery, (error, result) => {
    if (error) {
      console.log();
      console.log(error);
    } else {
      let message = {
        playersSearchResult: result
      };
      res.send(message);
    }
  });
});

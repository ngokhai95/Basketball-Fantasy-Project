const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const PORT_NUMBER = 8000;



const connection = mysql.createConnection({
    host     : 'nba-fantasy.c4orcjbvqblx.us-east-2.rds.amazonaws.com',
    database : 'nba',
    user     : 'root',
    password : 'thank-floral-badger-argo-mow',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});



app.use(cors());
app.use(express.json());

app.listen(PORT_NUMBER, () => {
	console.log('Example app listening on port 8000!')
});

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.post('/register', (req, res) => {
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
					})
					break;
				case 1406:
					res.send({
						message: "Username, password, or name is too long."
					})
					break;
			}
		} else {
			console.log(`Account "${username}" created.`);
			res.send({
				message: "Your account has been created. Please go back to the login page to login."
			});
		}
	});
})

app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	let query = `SELECT * FROM Users WHERE user_name = '${username}'`;
	connection.query(query, (error, result) => {
		if (result.length == 0) {
			res.send({
				login: false,
				message: `Username: ${username} not found.`
			})
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
					let teamQuery = `SELECT * FROM teams WHERE team_id = ${teamID}`;
					connection.query(teamQuery, (teamError, teamResult) => {
						message.team_info = teamResult[0];

						res.send(message);
					});
				} else {
					res.send(message);
				}

				
				console.log(`Username: ${username} has logged in`);
				// send client user_id
			} else {
				res.send({
					login: false,
					message: `Incorrect password for ${username}`
				})
			}
		}
	})
});
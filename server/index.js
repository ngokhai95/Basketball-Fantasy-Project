const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const PORT_NUMBER = 8000;



const connection = mysql.createConnection({
    host     : 'localhost',
    database : 'nba',
    user     : 'root',
    password : 'bcitcst',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

// connection.query('SELECT * from players', (error, results, fields) => {
// 	if (error) {
// 		throw error;
// 	}

// 	results.forEach(result => {
// 		console.log(result);
// 	});
// });

// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
// 	next();
// });
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

	let query = `INSERT INTO users (user_id, user_name, user_password, full_name) VALUES (NULL, '${username}', '${password}', '${fullname}');`;
	
	connection.query(query, (error, result) => {
		if (error) {
			switch (error.errno) {
				case 1062:
					console.log("Duplicate exists");
					break;
				case 1406:
					console.log("String too long");
					break;
			}
		} else {
			console.log(`Account "${username}" created.`);
			res.send({
				success: true
			});
		}
	});
})

app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	let query = `SELECT * FROM users WHERE user_name = '${username}'`;
	connection.query(query, (error, result) => {
		if (result.length == 0) {
			console.log(`Username: ${username} not found.`);
		} else {
			if (result[0].user_password == password) {
				res.send({
					login: true,
					username: result[0].user_name,
					user_id: result[0].user_id
				});
				console.log(`Username: ${username} has logged in`);
				// send client user_id
			} else {
				console.log(`Incorrect password for ${username}`);
			}
		}
	})
})
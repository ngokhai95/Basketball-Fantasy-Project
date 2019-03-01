const express = require('express');
const mysql = require('mysql');
const app = express();


var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'nba',
    user     : 'root',
    password : 'bcitcst',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT * from players', (error, results, fields) => {
	if (error) {
		throw error;
	}

	results.forEach(result => {
		console.log(result);
	});
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.listen(8000, () => {
	console.log('Example app listening on port 8000!')
});
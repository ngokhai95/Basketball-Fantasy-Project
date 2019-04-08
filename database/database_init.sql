/*
This sql file is used to create the database NBA, the players, teams, 
transactions, and user tables. It loads data from an external .csv into the 
players table.

NOTE: Inorder to import the players.csv file, the my.cnf file must have the line
load-infile=1. Then restart the mysql server. Then in the command line, you must 
run mysql with the option --local-infile=1. Only then will LOAD DATA LOCAL 
INFILE work.
*/

CREATE DATABASE nba;
USE nba;

CREATE TABLE Players(
    player_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    height_cm INT,
    weight_kg FLOAT(4, 1),
    score FLOAT(4, 1),
    rebounds FLOAT(4, 1),
    assists FLOAT(4, 1),
    steals FLOAT(4, 1),
    blocks FLOAT(4, 1),
    overall_hit_rate FLOAT(5, 4),
    three_point_hit_rate FLOAT(5, 4),
    offense_score INT,
    defense_score INT,
    overall_score INT,
    jersey_number INT,
    position VARCHAR(3),
    real_team_name VARCHAR(40),
    wages INT DEFAULT 1
);

CREATE TABLE Teams(
	team_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	team_name VARCHAR(20) UNIQUE,
    player_id INT,
	captain VARCHAR(20),
	defensive_score INT, 
    offensive_score INT,
    overall_score INT,
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

CREATE Table Transactions(
    transaction_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    team_id INT,
    cost FLOAT(11, 2),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

CREATE TABLE Users(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    user_password VARCHAR(20) NOT NULL,
    full_name VARCHAR(20) NOT NULL,
    team_id INT,
    budget INT,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

/* change path to where your player.csv is located */
LOAD DATA LOCAL INFILE './players.csv'
INTO TABLE Players
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

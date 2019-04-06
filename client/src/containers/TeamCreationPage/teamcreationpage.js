import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

const SERVER_ADDRESS = "http://127.0.0.1:8000";

class TeamCreationPage extends Component {
	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		let playerList = this.props.teamCreation.slice(
			0,
			this.props.teamCreation.indexOf(null)
		);
		if (playerList.length !== 0) {
			axios
				.post(`${SERVER_ADDRESS}/getPlayers`, {
					players: playerList
				})
				.then(response => {
					let list = response.data;
					for (let i = response.data.length; i < 5; i++) {
						list.push(null);
					}
					this.setState({ players: list });
				});
		}

		this.state = {
			players: this.props.teamCreation,
			selectedPlayer: null,
			show: false
		};
	}

	handleClose = () => {
		this.setState({ show: false });
	};

	handleShow = () => {
		this.setState({ show: true });
	};

	handleToggleSellPlayer = player => {
		this.setState({ selectedPlayer: player });
		this.handleShow();
	};

	goToSearchPage = index => {
		this.props.history.push({
			pathname: `/search/${index}`
		});
	};

	// TODO: send server to sell
	confirmSell = () => {
		console.log("do something");
	};

	render() {
		let sellConfirm = null;

		if (this.state.show) {
			sellConfirm = (
				<SellConfirm
					handleClose={this.handleClose}
					show={this.state.show}
					selectedPlayer={this.state.selectedPlayer}
					confirmAdd={this.handleToggleSellPlayer}
				/>
			);
		}

		let teamInfo = this.props.teamInfo;
		let teamCreation = this.state.players;

		const teamMembers = teamCreation.map((player, index) => {
			if (player == null) {
				return (
					<Button
						key={index}
						onClick={() => {
							this.goToSearchPage(index);
						}}
					>
						Add Player {index + 1}
					</Button>
				);
			} else {
				return (
					<h1 key={index}>
						<Image src={require("../../img/captain_false.png")} />
						<Badge pill variant="secondary">
							{player.name}
						</Badge>
						<Button
							variant="warning"
							onClick={() => {
								this.handleToggleSellPlayer(player);
							}}
						>
							Sell
						</Button>
					</h1>
				);
			}
		});
		return (
			<div>
				<h1>Team Creation Page</h1>
				<p>Team Name: {teamInfo.team_name}</p>
				<ButtonGroup vertical>{teamMembers}</ButtonGroup>
				{sellConfirm}
			</div>
		);
	}
}

const SellConfirm = props => {
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Sell Player</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to sell {props.selectedPlayer.name} on
				your team?
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					No
				</Button>
				<Button
					variant="primary"
					onClick={() => {
						props.confirmSell(props.selectedPlayer);
						props.handleClose();
					}}
				>
					Yes, Sell!
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default TeamCreationPage;

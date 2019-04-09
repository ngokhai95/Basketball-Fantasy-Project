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

		let playerList = [];
		for (let i = 0; i < this.props.teamCreation.length; i++) {
			if (this.props.teamCreation[i] != null) {
				playerList.push(this.props.teamCreation[i]);
			}
		}

		if (playerList.length !== 0) {
			axios
				.post(`${SERVER_ADDRESS}/getPlayers`, {
					players: playerList
				})
				.then(response => {
					let list = response.data;
					let totalValue = 0;
					for (let i = 0; i < list.length; i++) {
						totalValue += list[i].wages;
					}
					this.props.deductMoney(totalValue);
					for (let i = response.data.length; i < 5; i++) {
						list.push(null);
					}

					this.setState({ players: list });
				});
		}

		this.state = {
			players: this.props.teamCreation,
			selectedPlayer: null,
			show: false,
			captain: this.props.teamInfo.player_id
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

	goToMainPage = () => {
		this.props.history.push({
			pathname: "./main"
		})
	}

	confirmSell = player => {
		axios
			.post(`${SERVER_ADDRESS}/sellPlayer`, {
				playerID: player.player_id,
				teamID: this.props.teamInfo.team_id
			})
			.then(response => {
				this.props.sellPlayer(player.player_id);
				this.props.refundMoney(player.wages);
				this.updateList(player.player_id);
				this.handleClose();
				if (response.data) {
					this.props.setCaptain({name: null, id: null});
				}
			});
	};

	updateList = playerID => {
		let playerList = this.state.players;
		for (let i = 0; i < playerList.length; i++) {
			if (playerList[i] != null && playerList[i].player_id == playerID) {
				playerList[i] = null;
			}
		}
		this.setState({ players: playerList });
	};

	setCaptain = player => {
		axios.post(`${SERVER_ADDRESS}/setCaptain`, {
			playerName: player.name,
			playerID: player.player_id,
			teamID: this.props.teamInfo.team_id
		}).then(response => {
			this.props.setCaptain({name: player.name, id: player.player_id});
			this.setState({captain: player.player_id});
			console.log(response);
		})
	}

	render() {
		let sellConfirm = null;

		if (this.state.show) {
			sellConfirm = (
				<SellConfirm
					handleClose={this.handleClose}
					show={this.state.show}
					selectedPlayer={this.state.selectedPlayer}
					confirmSell={this.confirmSell}
				/>
			);
		}

		let teamInfo = this.props.teamInfo;

		const teamMembers = this.state.players.map((player, index) => {
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
				let captainPic = null;
				if (this.state.captain === player.player_id) {
					captainPic = <Image src={require("../../img/captain_true.png")} />
				} else {
					captainPic = <Image src={require("../../img/captain_false.png")} onClick={() => {this.setCaptain(player)}}/>
				}
				return (
					<h1 key={index}>
						{captainPic}
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
				<h3>Team Name: {teamInfo.team_name}</h3>
				<h4>Money Left to Spend: ${this.props.playerMoney} million</h4>
				<ButtonGroup vertical>{teamMembers}</ButtonGroup>
				{sellConfirm}
				<br/>
				<br/>
				<Button onClick={this.goToMainPage}>Go back to Main</Button>
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

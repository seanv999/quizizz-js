const apis = require("./apis");
const axios = require('axios');
const events = require('events')
const colors = require('colors');
const createPayload = require('./createPayload');
const cliProgress = require('cli-progress');

class Quiz extends events {
	constructor() {
		super()
	}

	setData = async(pin) => {
		pin = String(pin)
		const room = await axios.post(apis.check, { roomCode: pin })
		.catch(() => {
			console.log('Game NOT Found'.red.bold);
		})
		if (await room) {
			this.roomData = await room.data.room
			this.pin = pin
			this.questions = this.roomData.questions
			this.hostId = this.roomData.hostId
			this.hash = this.roomData.hash
			this.vID = this.roomData.versionId
			return true
		}
		

		return 0
	}

	getPlayers = async () => {
		let payload = {
			"roomHash": this.hash,
			"playerId": this.localPlayer,
			"type": "live",
			"state": "stopped",
			"startSource": "rejoin.gameOver",
			"powerupInternalVersion": "19",
			"soloApis": "v2"
		}
		const players = await axios.post(apis.rejoin, payload)
		.catch(e => {
			console.log(e.response.data.error.red.bold)
			return 0
		})
		if(await players.data.success == false){
			console.log(players.data.error.message.red.bold)
			return 0
		}

		if(await players){
			let playerList = await players.data.room.players
			let parsedList = []
			playerList.forEach(player => {
				parsedList.push(player.id)
			})
			return parsedList
		}
	}

	getWrong = async () => {
		const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
		let pace = 1
		let players = await this.getPlayers();
		bar1.start(players.length * this.questions.length, 0);
		players.forEach(player => {
			this.questions.forEach(async q => {
				await axios.post(apis.proceed, createPayload(player, this.hash, q))
				.catch(() => {
				}).then(() => {
					bar1.update(pace++)
				})
			})
		})
	}

}

module.exports = Quiz
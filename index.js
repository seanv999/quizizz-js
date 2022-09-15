const readlineSync = require('readline-sync');
const Quiz = require('./src/quizizz.js')

const quiz = new Quiz()
const title = () => {
	console.clear()
	console.log(`
   ██████╗ ██╗   ██╗██╗███████╗██╗███████╗███████╗
  ██╔═══██╗██║   ██║██║╚════██║██║╚════██║╚════██║
  ██║██╗██║██║   ██║██║  ███╔═╝██║  ███╔═╝  ███╔═╝
  ╚██████╔╝██║   ██║██║██╔══╝  ██║██╔══╝  ██╔══╝
   ╚═██╔═╝ ╚██████╔╝██║███████╗██║███████╗███████╗
     ╚═╝    ╚═════╝ ╚═╝╚══════╝╚═╝╚══════╝╚══════╝`.blue)

	console.log(`     ${'⚠ ⚠'.yellow} ${'THIS WILL CAUSE ALL PLAYERS TO LOSE'.red.underline} ${'⚠ ⚠'.yellow}\n`)
}
const main = async () => {
	title()
	const pin = readlineSync.question(`Quiz pin: `.blue.bold)

	if (await quiz.setData(pin)) {
		title()
		console.log('This player is only used to fetch playerList ;)'.red.bold)
		quiz.localPlayer = readlineSync.question('Enter a player from quiz: '.blue.bold);

		const players = await quiz.getPlayers()
		if (players) {
			title()
			if (players.length > 3) {

				console.log(`Players affected: ${players[0]}, ${players[1]}, ${players[2]} and ${players.length - 3} others`.blue.bold)
			} else {
				console.log(`Players affected: [${(await quiz.getPlayers())}]`.blue.bold)
				console.log(players.length)
			}
			readlineSync.question(`\nPress Enter To Spoof...`.blue.bold)

			console.clear()
			console.log(`
░██████╗██████╗░░█████╗░░█████╗░███████╗██╗███╗░░██╗░██████╗░
██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║████╗░██║██╔════╝░
╚█████╗░██████╔╝██║░░██║██║░░██║█████╗░░██║██╔██╗██║██║░░██╗░
░╚═══██╗██╔═══╝░██║░░██║██║░░██║██╔══╝░░██║██║╚████║██║░░╚██╗
██████╔╝██║░░░░░╚█████╔╝╚█████╔╝██║░░░░░██║██║░╚███║╚██████╔╝
╚═════╝░╚═╝░░░░░░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚═╝░░╚══╝░╚═════╝░\n`.red.bold)
			quiz.getWrong()
		}

	}

}
main()

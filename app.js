var tmi = require("tmi.js");
var request = require("request");
var players = require("./players");
var emojis = require("./emojis");

var options = {
	options: {
		debug: true
	},
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identity: {
		username: "wc3_bot",
		password: process.env.TOKEN
	},
	channels: Object.keys(players) 
	// channels: ["WEAREFOALS_"]
};
var client = new tmi.client(options);
client.connect();
client.on("connected", function(address, port) {
	console.log(`address = ${address}, port = ${port}`);
	// client.action("WEAREFOALS_", "--Connected--");//
});

client.on("chat", function(channel, userstate, message, self) {
	if (self) return;
	if (message.startsWith("!stats") | message.startsWith("!info")) {
		channel = channel.slice(1);
		let params = Object.assign({}, players[channel.toLowerCase()]);
		let params_command = parse_message(message);
		for (var key in params_command) {
			if (params_command[key] != null) {
				params[key] = params_command[key];
			}
		}
		console.log(params_command);
		console.log(params);
		qs = (({ player, server }) => ({ player, server }))(params);
		url = 'https://bqeat6w63f.execute-api.us-east-1.amazonaws.com/dev/user';
		request({ url, qs, json:true }, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				if ('message' in body) {
					// console.log(body)
				}
				else {
					formatter = router[params['game_type']]
					client.say(channel, formatter(body));
			}
			}
		});
	}
});

function parse_message(message) {
	const keys = ['command', 'player', 'server', 'game_type']
	let values = message.slice(1).trim().split(" ");
	let params = Object.assign({},...keys.map((n, index) => ({[n]: values[index]})));
	return params;
}

const router = {
	'solo': make_solo_message,
	'rt':  make_rt_message,
	'info': make_info_message
}

function make_solo_message(data){
    if (!data.individual.hasOwnProperty('solo')) return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} SOLO, No stats`
    return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} SOLO, Level ${data.individual.solo.level}, ${data.individual.solo.rank}, ${data.individual.solo.wins} Wins, ${data.individual.solo.losses} Losses, ${data.individual.solo.win_percentage}`
}

function make_rt_message(data){
    if (!data.individual.hasOwnProperty('random_team')) return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} TEAM, No stats`
    return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} RT, Level ${data.individual.random_team.level}, ${data.individual.random_team.rank}, ${data.individual.random_team.wins} Wins, ${data.individual.random_team.losses} Losses, ${data.individual.random_team.win_percentage}`
}

function make_info_message(data){
    return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} INFO, ${data.info.home_page} ${data.info.additional_info}`
}

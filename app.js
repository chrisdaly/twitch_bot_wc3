var tmi = require("tmi.js");
var request = require("request");

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
	channels: ["insuperablew3", "tod"]
};

var client = new tmi.client(options);
client.connect();

client.on("connected", function(address, port) {
	console.log(`address = ${address}, port = ${port}`);
	// client.action("WEAREFOALS_", "--Connected--");
});

client.on("chat", function(channel, userstate, message, self) {
	if (self) return;
	// console.log(userstate)
	if (message.startsWith("!stats")) {
		params = parse_command(message);
		request(
			{
				url:
					"https://bqeat6w63f.execute-api.us-east-1.amazonaws.com/dev",
				json: true,
				qs: params
			},
			function(error, response, body) {
				if (!error && response.statusCode === 200) {
					if (validate_body(body)) {
						message = format_message(body.individual.solo);
					} else {
						message = "No solo stats detected.";
					}
					client.say(channel, message);
				}
			}
		);
	}
});

function parse_command(message) {
	params = message.trim().split(" ");
	player = params[1];
	params.length == 3 ? (server = params[2]) : (server = "northrend");
	return {
		player: player,
		server: server
	};
}

function validate_body(body) {
	if (("individual" in body) & ("solo" in body.individual)) return true;
}

function format_message(data) {
    let rank = get_rank(data);

    return `Ladder SOLO, Level ${Math.floor(data.level)}, ${rank}, ${
		data.wins} Wins, ${data.losses} Losses, ${data.win_percentage}%`;
}

function get_rank(data) {
	if (data.rank == null) {
		return "Unranked";
	} else {
		return `Rank ${data.rank}`;
	}
}
// # 9 | Level 46.46 | 1660 W - 216 L (88.49%)

var tmi = require("tmi.js");
var request = require("request");
var players = require("./players");
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
	channels: ["followgrubby", "WEAREFOALS_", "tod", "insuperablew3", "garinthegoat", "followSerrey"]
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
	if (message.startsWith("!")) {
		// Check for others
		// dont allow 400s lol
		channel = channel.slice(1);
		let params = Object.assign({}, players[channel.toLowerCase()]); 
		let params_command = parse_message(message)
		for (var key in params_command) { params[key] = params_command[key]}
		console.log(params_command)

		qs = (({ player, server }) => ({ player, server }))(params);
		url = `https://bqeat6w63f.execute-api.us-east-1.amazonaws.com/prod/${
			params["endpoint"]
		}`;
		request({ url, qs }, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				// Band-aid for current API. Remove once Lambda is updated!.
				if (body.startsWith('"')) {
					body = body.slice(1, -1);
				}
				client.say(channel, body);
			}
		});
	}
});

function parse_message(message) {
    let values = message
        .slice(1)
        .trim()
        .split(" ");
    
    if (values.length == 1) {
    	if (values[0] == 'info') return {'endpoint': 'info'}
    	return
    }
    if (values.length == 2) {
        if (['solo', 'rt', 'info'].includes(values[1])) return {'endpoint': values[1]}
        else return {'player': values[1]}
    }

    if (["solo", "rt"].includes(values[1]) & (values[0] == "stats")) {
        keys = ["placeholder", "endpoint", "player", "server"];
    } else {
        keys = ["endpoint", "player", "server"];
    }
    let params = Object.assign({},
        ...keys.map((n, index) => ({
            [n]: values[index] }))
    );
    if (params.endpoint == "rt") {
        params.endpoint = "random_team";
    }
    return params;
}

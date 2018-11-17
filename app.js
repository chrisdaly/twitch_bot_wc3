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
	// channels: ["followgrubby", "WEAREFOALS_", "tod", "insuperablew3", "garinthegoat", "followSerrey"]
	channels: ["madquacks"]
};
var client = new tmi.client(options);
client.connect();

client.on("connected", function(address, port) {
	console.log(`address = ${address}, port = ${port}`);
	// client.action("WEAREFOALS_", "--Connected--");
});

client.on("chat", function(channel, userstate, message, self) {
	if (self) return;
	if (message.startsWith("!")) {
		params = parse_message(message);
		qs = (({ player, server }) => ({ player, server }))(params);
    	url = `https://bqeat6w63f.execute-api.us-east-1.amazonaws.com/prod/${params['endpoint']}`
    	console.log('qs = ', qs)
    	console.log('url = ', url)
		request({ url, qs },
			function(error, response, body) {
				if (!error) {
					channel = channel.slice(1);
					client.say(channel, body);
				}
			}
		);
	}
});

function parse_message(message){
    let values = message.slice(1).trim().split(' ')
    if (['solo', 'rt'].includes(values[1]) & (values[0] == 'stats')) {
        keys = ['placeholder', 'endpoint', 'player', 'server']
    } else {
        keys = ['endpoint', 'player', 'server']
    }
    let params = Object.assign({}, ...keys.map((n, index) => ({[n]: values[index]})))
    if (params.endpoint == 'rt'){params.endpoint = 'random_team'}
	if (params.endpoint == 'stats'){params.endpoint = 'solo'}

    return params
}
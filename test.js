var players = require("./players");
var messages = [
    "!stats",
    "!info",
    "!stats solo",
    "!stats followgrubby",
    "!stats followgrubby azeroth",
    "!stats solo followgrubby azeroth",
    "!stats rt followgrubby azeroth",
    "!info WEAREFOALS azeroth"
];

function parse_message(message) {
    let values = message
        .slice(1)
        .trim()
        .split(" ");
    console.log('values:', values)
    if ((values.length == 1) & (['stats', 'info'].includes(values[0]))) return {'endpoint': values[0]}
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
channel = 'tod'
params = Object.assign({}, players[channel]); 


messages.forEach(message => {
    console.log('message: ', message)
    params_command = parse_message(message)
    // console.log(params_command)
    for (var key in params_command) { params[key] = params_command[key]}
    console.log()
    console.log(params)
    console.log()
})
// (({ player, server }) => ({ player, server }))(params);
// messages.forEach(d => parse_message(d))
// (message = "!stats solo WEAREFOALS azeroth"), (params = parse_message(message));
// endpoint = params["endpoint"];
// qs = (({ player, server }) => ({ player, server }))(params);
// console.log(qs);
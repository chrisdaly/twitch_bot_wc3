var players = require("./players");
var emojis = require("./emojis")

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
    if ((values.length == 1) & (['stats', 'info'].includes(values[0]))) return { 'endpoint': values[0] }
    if (values.length == 2) {
        if (['solo', 'rt', 'info'].includes(values[1])) return { 'endpoint': values[1] }
        else return { 'player': values[1] }
    }

    if (["solo", "rt"].includes(values[1]) & (values[0] == "stats")) {
        keys = ["placeholder", "endpoint", "player", "server"];
    } else {
        keys = ["endpoint", "player", "server"];
    }
    let params = Object.assign({},
        ...keys.map((n, index) => ({
            [n]: values[index]
        }))
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
    for (var key in params_command) { params[key] = params_command[key] }
    console.log()
    console.log(params)
    console.log()
})

data = { 'info': 
            { 'player': 'romantichuman', 'server': 'Northrend', 'clan': 'N/A', 'main_race': 'Human', 'home_page': 'twitch.tv/ToD',     'additional_info': 'twitter.com/YoanMerlo', 'last_ladder_game': '2018-11-19' }, 
        'individual': 
            { 'random_team': { 'wins': 32, 'losses': 18, 'level': 10, 'rank': 'Unranked', 'experience': 2115, 'win_percentage': '64.00%' }, 
              'solo': { 'wins': 1769, 'losses': 239, 'level': 46, 'rank': 'Rank 9', 'experience': 20741, 'win_percentage': '88.10%' }
        }, 
        'team': 
            [{ 'wins': 2, 'losses': 2, 'partners': ['Lado'], 'level': 6, 'rank': 'Unranked', 'win_percentage': '50.00%' }, { 'wins': 1, 'losses': 1, 'partners': ['123456789012345', 'LadoBlanco'], 'level': 5, 'rank': 'Rank 403', 'win_percentage': '50.00%' }, { 'wins': 6, 'losses': 0, 'partners': ['LUL'], 'level': 11, 'rank': 'Unranked', 'win_percentage': '100.00%' }] 
        }

function make_solo_message(data){
    return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} SOLO, Level ${data.individual.solo.level}, ${data.individual.solo.rank}, ${data.individual.solo.wins} Wins, ${data.individual.solo.losses} Losses, ${data.individual.solo.win_percentage}`
}

function make_rt_message(data){
    return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} RT, Level ${data.individual.random_team.level}, ${data.individual.random_team.rank}, ${data.individual.random_team.wins} Wins, ${data.individual.random_team.losses} Losses, ${data.individual.random_team.win_percentage}`
}

function make_info_message(data){
    return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} INFO, ${data.info.home_page} ${data.info.additional_info}`
}

console.log(make_solo_message(data))
console.log(make_rt_message(data))
console.log(make_info_message(data))

// (({ player, server }) => ({ player, server }))(params);
// messages.forEach(d => parse_message(d))
// (message = "!stats solo WEAREFOALS azeroth"), (params = parse_message(message));
// endpoint = params["endpoint"];
// qs = (({ player, server }) => ({ player, server }))(params);
// console.log(qs);
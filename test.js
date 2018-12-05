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

var emojis = {
    Human: "grubHU",
    Orc: "grubORC",
    "Night Elf": "grubNE",
    Undead: "grubUD",
    "No Main race": "No Main race",
    "Random": "Random"
};

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

data = {"info": {"player": "WEAREFOALS", "server": "Northrend", "clan": "HOTE", "main_race": "No main race", "home_page": "N/A", "additional_info": "N/A", "last_ladder_game": "2018-11-17"}, "individual": {"random_team": {"wins": 69, "losses": 40, "level": 18, "rank": "Unranked", "experience": 6612, "win_percentage": "63.30%"}}, "team": [{"wins": 109, "losses": 8, "partners": ["KODOS_FORSAKEN."], "level": 31, "rank": "Rank 31", "win_percentage": "93.16%"}, {"wins": 1, "losses": 0, "partners": ["MEG", "rinne"], "level": 5, "rank":"Rank 773", "win_percentage": "100.00%"}, {"wins": 14, "losses": 3, "partners": ["ENA1337"], "level": 13, "rank": "Unranked", "win_percentage": "82.35%"}, {"wins": 4, "losses": 1, "partners": ["ShoananasS"], "level": 9, "rank": "Unranked", "win_percentage": "80.00%"}, {"wins": 79, "losses": 2, "partners": ["LongWalk"], "level": 28, "rank": "Rank 98", "win_percentage": "97.53%"}, {"wins": 3, "losses": 1, "partners": ["VIKING.GOAT"], "level": 7, "rank": "Unranked", "win_percentage": "75.00%"}]}

function make_solo_message(data){
    if (!data.individual.hasOwnProperty('solo')) return `${data.info.player}@${data.info.server} ${emojis[data.info.main_race]} SOLO, No stats`
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
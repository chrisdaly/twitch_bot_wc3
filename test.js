let message = "!stats solo WEAREFOALS azeroth"
messages = [
    "!stats solo WEAREFOALS azeroth",
    "!fake solo WEAREFOALS azeroth",
    "!solo WEAREFOALS azeroth",
    "!stats rt WEAREFOALS azeroth",
    "!info WEAREFOALS azeroth"
]

function parse_message(message){
    let values = message.slice(1).trim().split(' ')
    if (['solo', 'rt'].includes(values[1]) & (values[0] == 'stats')) {
        keys = ['placeholder', 'endpoint', 'player', 'server']
    } else {
        keys = ['endpoint', 'player', 'server']
    }
    let params = Object.assign({}, ...keys.map((n, index) => ({[n]: values[index]})))
    console.log(params)
    url = `https://bqeat6w63f.execute-api.us-east-1.amazonaws.com/dev/${params['endpoint']}`
    console.log(url)
    return params
}

// messages.forEach(d => parse_message(d))
message = "!stats solo WEAREFOALS azeroth",
params = parse_message(message);
endpoint = params['endpoint']
qs = (({ player, server }) => ({ player, server }))(params);
console.log(qs)

# twitch_bot_wc3

## TODO
- Build out commands
- Get verified https://dev.twitch.tv/docs/irc/guide/#known-and-verified-bots
- Mess around with /color
- Log xp at ladder start, keep track. !progress ? !start !end
progress  = start.exp - end.exp,   Emojis: chart_with_upwards_trend: . This requires saving state...
- Explain params for !stats if no params are given.
- Player, Server, Clan, Race (most played), Homepage, Additional Information
- http://sogehige.github.io/sogeBot/#/
- Screenshot video image => computer vision to extract names => !stats name1 !stats name2
- Integrate netease/tournmanets? https://warcraft3.info/stats/player/120
- https://azure.microsoft.com/en-gb/services/cognitive-services/computer-vision/ works!
- https://cloud.google.com/vision/
-- Amazonia
-- 53 RomanticHuman
-- Human
-- 38 ALANFORD
-- Human
- http://compressimage.toolur.com/
- https://cloud.google.com/vision/docs/quickstart?apix_params=%7B%22resource%22%3A%7B%22requests%22%3A%5B%7B%22features%22%3A%5B%7B%22type%22%3A%22LABEL_DETECTION%22%7D%5D%2C%22image%22%3A%7B%22source%22%3A%7B%22imageUri%22%3A%22gs%3A%2F%2Ftwitch_vision_bucket%2Fdemo-image.jpg%22%7D%7D%7D%5D%7D%7D
- https://github.com/ilkkao/capture-video-frame

const messages = [
  {
    "body": {
      "team_id": "T57D8BH3R",
      "user_id": "U595Z8REK",
      "message": "Ohhh it seems to have cleared it when a new message came in. So it must be doing the cleanup upon new message arrival",
      "channel": "C57D8BHK9",
      "timestamp": "1496498527.990706"
    },
    "type": "slack.event.message",
    "id": "cd4c028a-eb2e-4209-b716-6842dfb137be",
    "timestamp": "2017-06-03T14:02:09.873Z"
  },
  {
    "body": {
      "team_id": "T57D8BH3R",
      "user_id": "U595Z8REK",
      "message": "<@U55UBHPL0> Idk if this is intended but it seems that the queue always holds at least one message except maybe when it's first started. I just now hit the distributor endpoint and got dustin's message above, from over an hour ago",
      "channel": "C57D8BHK9",
      "timestamp": "1496498487.988359"
    },
    "type": "slack.event.message",
    "id": "959bd315-72c5-4950-9b4d-29ad20e69a83",
    "timestamp": "2017-06-03T14:01:29.768Z"
  }
]

onconnect = function (event) {
  const port = event.ports[0];

  setTimeout(() => port.postMessage(messages), 1000);
};

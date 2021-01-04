fs = require('fs')
const http = require('http')

fs.readFile('C:/ProgramData/SteelSeries/SteelSeries Engine 3/coreProps.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  object = JSON.parse(data)
  console.log(object.address)
  registerGame(object.address)
  registerEvent(object.address)
});


registerGame = function(addr){
  address = addr.split(':')

  const data = JSON.stringify({
  game: "BATTERY_INDICATOR",
  game_display_name: "Battery indicator",
  developer: "Zimniok"
  })

  const options = {
    hostname: address[0],
    port: address[1],
    path: '/game_metadata',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

registerEvent = function(){
  address = object.address.split(':')

  const data = JSON.stringify({
    "game": "BATTERY_INDICATOR",
    "event": "BATTERY_PROCENTAGE",
    "handlers": [
      {
        "device-type": "screened",
        "mode": "screen",
        "zone": "one",
        "datas": [
          {
            "has-text": true,
            "bold": true,
            "prefix": "Battery:\n",
            "context-frame-key": "numericalvalue",
            "suffix": " %"
          }
        ]
      }
    ]
  })
  console.log(data)

  const opt = {
    hostname: address[0],
    port: address[1],
    path: '/bind_game_event',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = http.request(opt, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

fs = require('fs')
const http = require('http')

fs.readFile('C:/ProgramData/SteelSeries/SteelSeries Engine 3/coreProps.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  object = JSON.parse(data)
  console.log(object.address)
  removeApp(object.address)
});

removeApp = function(addr){
  address = addr.split(':')

  const data = JSON.stringify({
  game: "BATTERY_INDICATOR",
  })

  const options = {
    hostname: address[0],
    port: address[1],
    path: '/remove_game',
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

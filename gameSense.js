fs = require('fs')
const http = require('http')

module.exports = class gameSense{
  constructor() {
    this.address = JSON.parse(fs.readFileSync('C:/ProgramData/SteelSeries/SteelSeries Engine 3/coreProps.json', 'utf8')).address.split(':')
    console.log(this.address)
    this.value = 0
  }

  sendBP(bp) {
    const data = JSON.stringify({
      "game": "BATTERY_INDICATOR",
      "event": "BATTERY_PROCENTAGE",
      "data": {
          "value": this.value,
          "frame": {
            "numericalvalue": bp
          }
      }
    })
    this.value = (this.value+1)%100
    const op = {
      hostname: this.address[0],
      port: this.address[1],
      path: '/game_event',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    const req = http.request(op, res => {
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
}

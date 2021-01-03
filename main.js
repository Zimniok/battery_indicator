const ListHeadsets = require('./ListHeadsets.js')
const Headset = require("./headset.js")
const GameSense = require("./gameSense.js")

var headsetCreds = ListHeadsets.getConnectedHeadset();
var myHeadset = new Headset(headsetCreds)
var gs = new GameSense()

let recuringFunction = function(){
  let battery_percent = myHeadset.getBatteryPercentage()
  gs.sendBP(battery_percent)
  setTimeout(recuringFunction, 5000)
}

recuringFunction()

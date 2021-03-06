var SENSE = A8;
var LIGHT = B6;
var counter = 0;
var blades = 7; // the number of fan blades you have
var t = (1000 - blades*5) / blades;
var pulses = [5];
for (var i=0;i<blades;i++) pulses.push(t, 5);
var lastPulseTime;

function onChanged(e) {
  counter++;
  if (counter&1) {
    var d = e.time - lastPulseTime;
    lastPulseTime = e.time;
    var p = pulses.map(function(t) { return t*d; });
    digitalPulse(LIGHT, 1 , p);
  }
}

digitalWrite(LIGHT, 0);
pinMode(SENSE, "input_pullup");
setWatch(onChanged, SENSE, { edge:"rising", repeat:true });

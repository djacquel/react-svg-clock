/*****************************
 * Utils
 *****************************/

var Utils = {

  getRotation: function( timeTs, type ){

    var time = new Date(timeTs);
    var hour = time.getHours();
    var min  = time.getMinutes();
    var sec  = time.getSeconds();

    switch (type) {
      case 'hour':
        var oneHourRotation   = 360/12;
        var oneMinuteRotation = oneHourRotation/60;
        var oneSecRotation = oneMinuteRotation/60;
        var rotHour  = oneHourRotation * hour;
        var rotMin   = oneMinuteRotation * min;
        var rotSec   = oneSecRotation * sec;
        var rotation = rotHour + rotMin + rotSec;
        break;
      case 'min':
        var oneMinuteRotation = 360/60;
        var oneSecRotation    = oneMinuteRotation/60;
        var rotMin   = oneMinuteRotation * min;
        var rotSec   = oneSecRotation * sec;
        var rotation = rotMin + rotSec;
        break;
      case 'sec':
        var mil   = time.getMilliseconds();
        var oneSecRotation = 360/60;
        var oneMilRotation = oneSecRotation / 1000;
        var rotSec = oneSecRotation * sec;
        var rotMil = oneMilRotation * mil;
        var rotation = rotSec + rotMil;
        break;
      default:
        throw "Please provide type = hour, min or sec";
        break;
    }
    return rotation;
  },

  // returns a timestamp for a given hour today
  // timestamp value depends on the computer's TZ settings
  getTimeStamp: function( h=0, m=0, s=0, ms=0 ) {
    var date = new Date();
    date.setHours(h,m,s,ms);
    return date.getTime();
  },

  // get HH:MM:SS:T string
  // with one digits representing tenth of second
  // if "tenth = false" return a string with no tenth HH:MM:SS
  getTimeString: function( timestamp, tenth = true ) {

    var time    = new Date(timestamp);
    var timeStr = time.toTimeString().slice(0, 8);

    if (tenth == true) {
        var tenthStr = Math.floor(time.getMilliseconds()/100);;
        timeStr = timeStr + ":" + tenthStr;
    }
    return timeStr;
  },

  beep: function(){
    var snd = new Audio("bip.mp3");
    snd.play();
  }

}

export default Utils;

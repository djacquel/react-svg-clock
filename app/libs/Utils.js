/*****************************
 * Utils
 *****************************/

const Utils = {

  getRotation: function( timeTs, type ) {

    const time = new Date(timeTs);
    const hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();

    let oneHourRotation, oneMinuteRotation, oneSecRotation, oneMilRotation,
      rotHour, rotMin, rotSec, rotMil, rotation, mil;

    switch (type) {
      case "hour":
        oneHourRotation = 360/12;
        oneMinuteRotation = oneHourRotation/60;
        oneSecRotation = oneMinuteRotation/60;
        rotHour = oneHourRotation * hour;
        rotMin = oneMinuteRotation * min;
        rotSec = oneSecRotation * sec;
        rotation = rotHour + rotMin + rotSec;
        break;
      case "min":
        oneMinuteRotation = 360/60;
        oneSecRotation = oneMinuteRotation/60;
        rotMin = oneMinuteRotation * min;
        rotSec = oneSecRotation * sec;
        rotation = rotMin + rotSec;
        break;
      case "sec":
        mil = time.getMilliseconds();
        oneSecRotation = 360/60;
        oneMilRotation = oneSecRotation / 1000;
        rotSec = oneSecRotation * sec;
        rotMil = oneMilRotation * mil;
        rotation = rotSec + rotMil;
        break;
    }
    return rotation;
  },

  // returns a timestamp for a given hour today
  // timestamp value depends on the computer"s TZ settings
  getTimeStamp: function( h=0, m=0, s=0, ms=0 ) {
    const date = new Date();
    date.setHours(h,m,s,ms);
    return date.getTime();
  },

  // get HH:MM:SS:T string
  // with one digits representing tenth of second
  // if "tenth = false" return a string with no tenth HH:MM:SS
  getTimeString: function( timestamp, tenth = true ) {

    const time = new Date(timestamp);
    let timeStr = time.toTimeString().slice(0, 8);

    if (tenth === true) {
      const tenthStr = Math.floor(time.getMilliseconds()/100);
      timeStr = timeStr + ":" + tenthStr;
    }
    return timeStr;
  },

  beep: function() {
    const snd = new Audio("/assets/bip.mp3");
    snd.play();
  },

}

export default Utils;

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
  }

}


export default Utils;

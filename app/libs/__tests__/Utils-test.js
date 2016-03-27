import Utils from "../Utils";
import expect from "expect";

describe("Utils getRotation function", () => {

  var rotationAngles = [
      {
        type: "hour",
        values: [
            //    hour, min, sec, rotation°
                [ 0,    0,    0,   0],
                [ 0,    0,    30,  0.25],
                [ 0,    30,   0,   15],
                [ 1,    0,    0,   30],
                [ 1,    30,   0,   45],
                [ 1,    30,   30,  45.25]
            ]
      },
      {
        type: "min",
        values: [
            //    hour, min, sec, rotation°
                [ 0,    0,    0,   0],
                [ 0,    30,   0,   180],
                [ 0,    30,   10,  181],
            ]
      },
      {
        type: "sec",
        values: [
            //    hour, min, sec, rotation°
                [ 0,    0,    0,   0],
                [ 0,    0,    30,  180],
                [ 0,    0,    45,  270],
            ]
      },

    ]

  rotationAngles.forEach(
        (pointerDatas)=>{
          it("Should return correct rotation angle for " + pointerDatas.type + " pointer", () => {

              pointerDatas.values.forEach(
                    (v) => {
                      let d = new Date(1970, 1, 1, v[0], v[1], v[2]);
                      let dTs = d.getTime();
                      let expectedRot = v[3];
                      expect(Utils.getRotation(dTs, pointerDatas.type)).toEqual(expectedRot);
                    }
                )
            })
        }
    );
})

describe("Utils getTimeStamp function", () => {

  let times = [
        // h, m, s,        ms,     tenth, expected time string
        [  0, 0, 0, undefined, undefined, "00:00:00:0"],
        [ 24, 0, 0, undefined, undefined, "00:00:00:0"],
        [ 23,60, 0, undefined, undefined, "00:00:00:0"],
        [ 23,59,60, undefined, undefined, "00:00:00:0"],
        [  1, 1, 1, undefined, undefined, "01:01:01:0"],
        [  0, 0, 0,         0, undefined, "00:00:00:0"],
        [  0, 0, 0,         0,     false, "00:00:00"],
    ]

  it("Should return valid timestamp for given hour, min, sec", () => {
      times.forEach(
            (v, index) => {
              var generatedZeroTs = Utils.getTimeStamp(v[0], v[1], v[2], v[3]);
              var timeStr = Utils.getTimeString(generatedZeroTs, v[4]);

              expect(timeStr).toEqual(v[5]);
            }
        )
    })
})

describe("Utils getTimeString function", () => {
  it("Should return correct timestring for timestamp", () => {

      let times = [
            // h, m, s, ms,       tenth,  expected time string
            [  0, 0, 0,  0,   undefined,   "00:00:00:0"],
            [  0, 0, 0,  0,        true,   "00:00:00:0"],
            [  0, 0, 0,  0,       false,   "00:00:00"],
        ]

      times.forEach(
            (v, index) => {
                // we relies on Utils.getTimeStamp which is supposed to be tested
              var generatedZeroTs = Utils.getTimeStamp(v[0], v[1], v[2], v[3]);
              var timeStr = Utils.getTimeString(generatedZeroTs, v[4]);

              expect(timeStr).toEqual(v[5]);
            }
        )

    })
})

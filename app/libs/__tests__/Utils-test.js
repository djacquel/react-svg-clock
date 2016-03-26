import Utils from '../Utils';
import expect from 'expect';

describe('Utils getRotation function', () => {

    var rotationAngles = [
        {
            type: 'hour',
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
            type: 'min',
            values: [
            //    hour, min, sec, rotation°
                [ 0,    0,    0,   0],
                [ 0,    30,   0,   180],
                [ 0,    30,   10,  181],
            ]
        },
        {
            type: 'sec',
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
            it('Should return correct rotation angle for ' + pointerDatas.type + ' pointer', () => {

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
});

describe('Utils getTimeStamp function', () => {

    let times = [
        [0,0,0,'00:00:00'],
        [24,0,0,'00:00:00'],
        [23,60,0,'00:00:00'],
        [23,59,60,'00:00:00'],
        [1,1,1,'01:01:01'],
    ]

    it('Should return correct timestamp for given hour, min, sec', () => {

        times.forEach(
            (v) => {
                var generatedZeroTs = Utils.getTimeStamp(v[0], v[1], v[2]);
                var d = new Date(generatedZeroTs);
                var s = d.toTimeString();
                var timeStr = s.slice(0, 8);
                console.log(timeStr + '=' + v[3]);

                expect(timeStr).toEqual(v[3]);
            }
        )
    })
});


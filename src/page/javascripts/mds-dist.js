// multivariate 한 데이터를 가지고 와서,
// 계산을 해야 한다.
// dist()
// 루트<(a1 - a2)제곱 + (b1 - b2)제곱 + ...>

const _ = require('lodash');
// import _ from 'lodash';

const mdsDist = {
  /**
   * 거리 Array를 반환한다.
   * @param multivariateArray : arr [{a: 'a', b: 'b'},{}]
   */
  dist(multivariateArray) {
  // json 형식 데이터를 가져오고

    const distedArray = [];

    for (let i = 0; i < multivariateArray.length; i += 1) {
      distedArray.push([]);
      for (let j = 0; j < multivariateArray.length; j += 1) {
        distedArray[i].push(
          mdsDist.getEuclidianDistance(multivariateArray[i], multivariateArray[j]));
      }
    }

    // console.log(distedArray);
    return distedArray;

  // dist 처리를 한다.
  //
  // const distedArray = [
  //   [0, Math.sqrt((501-557)*(501-557) + '...')],
  //   [Math.sqrt((501-557)*(501-557) + '...'), 0]
  // ];
  },
  getEuclidianDistance(element1, element2) {
    let distValue = 0;
    const element1Keys = Object.keys(element1);
    const element2Keys = Object.keys(element2);

    _.forEach(element1Keys, (element1Key) => {
      _.forEach(element2Keys, (element2Key) => {
        if (element1Key === element2Key) {
          distValue += (element1[element1Key] - element2[element2Key])
            * (element1[element1Key] - element2[element2Key]);
        }
      });
    });

    distValue = Math.sqrt(distValue);

    return distValue;
  }
};

// function test() {
//   const testingArr = [
//     {
//       reading: 501,
//       math: 515,
//       writing: 493,
//       percent_g: 46,
//       pupil_staf: 7.9,
//       dropout_rate: 4.4
//     },
//     {
//       reading: 557,
//       math: 552,
//       writing: 549,
//       percent_g: 7,
//       pupil_staf: 6.7,
//       dropout_rate: 2.3
//     }
//   ];
//   const labels = [
//     'United States',
//     'Alabama'
//   ];
//
//   mdsDist.dist(testingArr);
// }
//
// test();

export default mdsDist;

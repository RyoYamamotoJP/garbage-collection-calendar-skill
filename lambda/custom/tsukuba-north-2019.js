const moment = require('moment');

module.exports = {
  startDate: '2019-04-01',
  endDate: '2020-03-31',
  regularSchedule: {
    sunday: {
      1: ['収集なし'],
      2: ['収集なし'],
      3: ['収集なし'],
      4: ['収集なし'],
      5: ['収集なし']
    },
    monday: {
      1: ['燃やせるごみ'],
      2: ['燃やせるごみ'],
      3: ['燃やせるごみ'],
      4: ['燃やせるごみ'],
      5: ['燃やせるごみ']
    },
    tuesday: {
      1: ['びん', 'スプレー容器'],
      2: ['ペットボトル'],
      3: ['びん', 'スプレー容器'],
      4: ['ペットボトル'],
      5: ['収集なし']
    },
    wednesday: {
      1: ['燃やせないごみ'],
      2: ['古紙', '古布'],
      3: ['燃やせないごみ'],
      4: ['古紙', '古布'],
      5: ['収集なし']
    },
    thursday: {
      1: ['燃やせるごみ'],
      2: ['燃やせるごみ'],
      3: ['燃やせるごみ'],
      4: ['燃やせるごみ'],
      5: ['燃やせるごみ']
    },
    friday: {
      1: ['プラ製容器包装', '粗大ごみ'],
      2: ['かん'],
      3: ['プラ製容器包装', '粗大ごみ'],
      4: ['かん'],
      5: ['収集なし']
    },
    saturday: {
      1: ['収集なし'],
      2: ['収集なし'],
      3: ['収集なし'],
      4: ['収集なし'],
      5: ['収集なし']
    }
  },
  irregularDates: {
    '2019-12-28': ['燃やせるごみ'],
    '2019-12-30': ['収集なし'],
    '2020-01-01': ['収集なし'],
    '2020-01-02': ['収集なし'],
    '2020-01-03': ['燃やせるごみ'],
    '2020-01-08': ['燃やせないごみ'],
    '2020-01-10': ['プラ製容器包装', '粗大ごみ'],
    '2020-01-15': ['古紙', '古布'],
    '2020-01-17': ['かん'],
    '2020-01-22': ['燃やせないごみ'],
    '2020-01-24': ['プラ製容器包装', '粗大ごみ'],
    '2020-01-29': ['古紙', '古布'],
    '2020-01-31': ['かん']
  },
  garbageTypesOn: function(amazonDate) {
    const momentDate = moment(amazonDate);
    const validDate = momentDate.isValid() ? momentDate : moment();
    const weekdayOfMonth = Math.floor((validDate.date() - 1) / 7) + 1;
    const dayOfWeek = validDate.format('dddd').toLowerCase();
    const dateString = validDate.format('YYYY-MM-DD');
    const irregularDate = this.irregularDates[dateString];
    const regularSchedule = this.regularSchedule[dayOfWeek][weekdayOfMonth];
    return irregularDate || regularSchedule;
  }
};

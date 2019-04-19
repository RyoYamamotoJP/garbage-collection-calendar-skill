const moment = require('moment');
const calendar = require('./calendars/2019/tsukuba/north');

module.exports = {
  garbageTypesOn: function(amazonDate) {
    const momentDate = moment(amazonDate);
    const validDate = momentDate.isValid() ? momentDate : moment();
    const weekdayOfMonth = Math.floor((validDate.date() - 1) / 7);
    const dayOfWeek = validDate.format('dddd').toLowerCase();
    const dateString = validDate.format('YYYY-MM-DD');
    const irregularDate = calendar.irregularDates[dateString];
    const regularSchedule = calendar.regularSchedule[dayOfWeek][weekdayOfMonth];
    return irregularDate || regularSchedule;
  }
};

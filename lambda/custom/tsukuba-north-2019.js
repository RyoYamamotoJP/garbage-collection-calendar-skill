const fs = require('fs');
const moment = require('moment');

function calculateWeekdayOfMonth(momentDate) {
  return Math.floor((momentDate.date() - 1) / 7) + 1;
}

function convertDayOfWeekToString(momentDate) {
  return momentDate.format('dddd').toLowerCase();
}

function convertDateToString(momentDate) {
  return momentDate.format('YYYY-MM-DD');
}

function convertToMoment(date) {
  const momentDate = moment(date);
  return momentDate.isValid() ? momentDate : moment();
}

function loadCalendar(year, city, district) {
  const calendar = fs.readFileSync(`./calendars/${year}/${city}/${district}.json`);
  return JSON.parse(calendar);
}

function garbageTypesOn(amazonDate) {
  const calendar = loadCalendar(2019, 'tsukuba', 'north');
  const momentDate = convertToMoment(amazonDate);
  if (!momentDate.isBetween(calendar.startDate, calendar.endDate, null, '[]')) {
    return undefined;
  }

  const dateString = convertDateToString(momentDate);
  const dayOfWeek = convertDayOfWeekToString(momentDate);
  const weekdayOfMonth = calculateWeekdayOfMonth(momentDate) - 1;
  const irregularDate = calendar.irregularDates[dateString];
  const regularSchedule = calendar.regularSchedule[dayOfWeek][weekdayOfMonth];
  return irregularDate || regularSchedule;
}

module.exports.garbageTypesOn = garbageTypesOn;

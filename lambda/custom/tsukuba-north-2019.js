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
  const momentDate = convertToMoment(amazonDate);
  const dateString = convertDateToString(momentDate);
  const dayOfWeek = convertDayOfWeekToString(momentDate);
  const weekdayOfMonth = calculateWeekdayOfMonth(momentDate) - 1;
  const calendar = loadCalendar(2019, 'tsukuba', 'north')
  const irregularDate = calendar.irregularDates[dateString];
  const regularSchedule = calendar.regularSchedule[dayOfWeek][weekdayOfMonth];
  return irregularDate || regularSchedule;
}

module.exports.garbageTypesOn = garbageTypesOn;

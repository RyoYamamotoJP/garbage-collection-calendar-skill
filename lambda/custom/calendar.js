"use strict";

const fs = require("fs");
const moment = require("moment");

module.exports = class Calendar {
  constructor(city, district) {
    this.city = city;
    this.district = district;
    this.calendars = JSON.parse(fs.readFileSync(`./calendars/${city}/${district}.json`));
  }

  on(date) {
    const momentDate = moment(date);

    const calendar = this.calendars.find(calendar =>
      momentDate.isBetween(calendar.startDate, calendar.endDate, null, "[]")
    );
    if (!calendar) return undefined;

    const dateString = momentDate.format("YYYY-MM-DD");
    const dayOfWeek = momentDate.format("dddd").toLowerCase();
    const weekdayOfMonth = Math.floor((momentDate.date() - 1) / 7);
    const irregularDate = calendar.irregularDates[dateString];
    const regularSchedule = calendar.regularSchedule[dayOfWeek][weekdayOfMonth];
    return irregularDate || regularSchedule;
  }
}

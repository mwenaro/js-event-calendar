const _el = (selector) => document.querySelector(selector);
// const events = getStoredData("events") ?? [];

//Initialize the calender
const calendarBody = _el("#calendar-body");
const prevButton = _el("#prev");
const nextButton = _el("#next");
const todayButton = _el("#today-btn");
const weekButton = _el("#week-btn");
const monthButton = _el("#month-btn");

const addEventButton = _el("#add-event-btn");
const monthYearDiv = _el("#month-year-div");

const monthYearElement = _el("#month-year");

// const calendarBody = _el("#calendar-body");

//Global Variables
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Date initialization
let currentDate = new Date();
let eventDate = new Date();
let selectedDate = currentDate;

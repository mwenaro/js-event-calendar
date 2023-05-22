// const _el = (selector) => document.querySelector(selector);
let calendarType = "monthly";
// load header
const header = _el("header");
loadPartial("header", header);

// sidebar
const sidebar = _el("aside");
loadPartial("sidebar", sidebar);

// add event modal
const addEventModal = _el("#add_event");
loadPartial("add_event_modal", addEventModal);

// add event modal
// const calendarSection = _el("#calendar");
// loadPartial("calendar", calendarSection);

//creatre a query selector function
if (!_el) {
  const _el = (selector) => document.querySelector(selector);
}

const events = getRondomEvents();
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

function renderCalendar(params) {
  calendarBody.innerHTML = "";

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDate();

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    -1
  ).getDate();

  let numOfWeeks = Math.ceil((lastDayOfMonth - firstDayOfMonth) / 7);
  let CurrentWeekNumber = Math.ceil(
    (currentDate.getDate() - firstDayOfMonth) / 7
  );

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.toLocaleString("default", {
    dateStyle: "long",
  });
  //select elements

  // monthYearDiv.textContent = `Week ${CurrentWeekNumber}, ${currentMonth} ${currentDate.getFullYear()}`;
  monthYearDiv.textContent = `${currentMonth} ${currentDate.getFullYear()}`;

  prevButton.addEventListener("click", showPreviousWeek);
  nextButton.addEventListener("click", showNextWeek);

  console.log({ currentDay });
  // Modal
  const eventForm = _el("#event-form");
  eventForm.addEventListener("submit", (e) => {
    // e.preventDefault();
    console.log(e.target.value);
  });
  const addPersonButton = _el("#add-person-btn");
  

  
  // Creating the calender

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("calendar-body-row");
  headerDiv.classList.add("calendar-body-header-row");

  //Adding the calender header row
  const startOfWeek = getStartOfWeek(currentDate);
  headerDiv.appendChild(document.createElement("div"));
  for (let day = 0; day < weekDays.length; day++) {
    const colDiv = document.createElement("div");
    if(startOfWeek.getDate() === currentDate.getDate()){
        colDiv.classList.add('selected')
    }
    // colDiv.classList.add('selected')
    let month = 1 + startOfWeek.getMonth();

    if ([0, 6].includes(day)) continue;

    colDiv.innerHTML = `
        <h3>${weekDays[day]}</h3>
        <h5>${startOfWeek.getDate()} . ${month > 9 ? month : "0" + month}</h5>
        `;

    headerDiv.appendChild(colDiv);

    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }
  calendarBody.appendChild(headerDiv);

  let startTime = 7;
  let endTime = 21;

  //creating and adding the other fields
  const eventsRows = document.createElement("div");
  eventsRows.classList.add("events-grid");

  while (startTime <= endTime) {
    const firstCol = document.createElement("div");
    firstCol.textContent = startTime + ":00";
    eventsRows.appendChild(firstCol);

    for (let day = 0; day < 5; day++) {
      const colDiv = document.createElement("div");

      eventsRows.appendChild(colDiv);
      // startOfWeek.setDate(startOfWeek.getDate() + 1);
    }

    startTime += 1;
  }

  calendarBody.appendChild(eventsRows);
}

function getStartOfWeek(date) {
  const startOfWeek = new Date(date);
  const diff =
    startOfWeek.getDate() -
    startOfWeek.getDay() +
    (startOfWeek.getDay() === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  return startOfWeek;
}

function showPreviousWeek() {
    if (calendarType == "weekly") {
      currentDate.setDate(currentDate.getDate() - 7);
      renderCalendar();

    }else{
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  renderMonthlyCalendar();
    }
}

function showNextWeek() {
  if (calendarType == "weekly") {
    currentDate.setDate(currentDate.getDate() + 7);
    renderCalendar();
  } else {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    renderMonthlyCalendar();
  }
}

// Event listener for previous button
prevButton.addEventListener("click", showPreviousWeek);

// Event listener for next button
nextButton.addEventListener("click", showNextWeek);

// Render the calendar
function renderMonthlyCalendar() {
  // Clear existing calendar
  calendarBody.innerHTML = "";

  // Set month and year in header
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  //   monthYearElement.textContent = `${month} ${year}`;

  // Get the first day of the month
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Get the number of days in the month
  const lastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Generate calendar cells
  //Adding the calender header row
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("calendar2-body-row");
  headerDiv.classList.add("calendar2-body-header-row");
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.toLocaleString("default", {
    dateStyle: "long",
  });
  monthYearDiv.textContent = `${currentMonth} ${currentDate.getFullYear()}`;

  const startOfWeek = getStartOfWeek(currentDate);
  //   headerDiv.appendChild(document.createElement("div"));
  for (let day = 0; day < weekDays.length; day++) {
    const colDiv = document.createElement("div");
    let month = 1 + startOfWeek.getMonth();

    // if ([0, 6].includes(day)) continue;

    colDiv.innerHTML = `
          <h3>${weekDays[day]}</h3>
          `;

    headerDiv.appendChild(colDiv);
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

  calendarBody.appendChild(headerDiv);

  //   calendarBody.appendChild(eventsRows);

  //creating and adding the other fields
  const eventsRows = document.createElement("div");
  eventsRows.classList.add("events2-grid");
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // const row = document.createElement("dv");
    // const firstCol = document.createElement("div");
    // // firstCol.textContent =  ":00";
    // eventsRows.appendChild(firstCol);
    // Create cells for each day
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement("div");
        eventsRows.appendChild(cell);
      } else if (date > lastDate) {
        break;
      } else {
        const cell = document.createElement("div");
        cell.textContent = date;
        cell.addEventListener("click", selectDate);
        if (
          date === currentDate.getDate() &&
          currentDate.getMonth() === new Date().getMonth() &&
          currentDate.getFullYear() === new Date().getFullYear()
        ) {
          cell.classList.add("selected");
        }
        eventsRows.appendChild(cell);
        date++;
      }
    }

    calendarBody.appendChild(eventsRows);
  }
}

// Initial render
renderMonthlyCalendar();

function selectDate(e) {
  console.log(e.target);
closeModal();
  openModal();
}

// renderCalendar();
renderMonthlyCalendar();

monthButton.addEventListener("click", () => {
  currentDate = new Date();
  calendarType = "monthly";
  monthButton.classList.remove("bg_light_black");
  weekButton.classList.remove("bg_green");
  renderMonthlyCalendar();
});

weekButton.addEventListener("click", () => {
  currentDate = new Date();
  calendarType = "weekly";
  weekButton.classList.add("bg_green");
  weekButton.classList.remove("bg_light_black");
  monthButton.classList.add("bg_light_black");

  // load Calendar
  renderCalendar();
});

// const submitEventButton = _el("#submit-event-btn");
// submitEventButton.addEventListener("click", (e) => {
//   e.preventDefault();

//   console.log("Hello")
// });

const addEvenModal = _el("#add-event-btn");
addEvenModal.addEventListener("click", () => {
  _el("#event-modal-div").classList.remove("hidden");
});

//close
_el(".close-modal-btn").addEventListener("click", () => {
  _el("#event-modal-div").classList.add("hidden");
});

//open modsl fnc
function openModal() {
  _el("#event-modal-div").classList.remove("hidden");
}
function closeModal() {
  _el("#event-modal-div").classList.add("hidden");
}



// var sample_events = [
//   {name:"", from :"", to :""}
// ]

// Function to generate a random date between two dates
function getRandomDate(start, end) {
  // console.log(start)
  return new Date(new Date().getFullYear(),5, Math.ceil(Math.random()*20));

  // return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Create an array to store the events


function getRondomEvents(){
  const events = [];
// Generate 10 random events
for (let i = 0; i < 10; i++) {
  
  // Generate random dates between February 1, 2023, and May 31, 2023
  const startDate = getRandomDate(new Date('2023-02-01'), new Date('2023-05-31'));
  const endDate = getRandomDate(startDate, new Date('2023-05-31'));

  // Format the dates as strings in the desired format
  const startTime = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const endTime = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  // Create an event object with the desired properties
  const event = {
    name: `Event ${i + 1}`,
    startTime: startTime,
    endTime: endTime
  };

  // Add the event to the array
  events.push(event);
}

return events;
}


// Get a reference to the form element
const form = document.getElementById('event-form');

// Add an event listener to the form's submit event
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Create a new FormData object passing the form as a parameter
  const formData = new FormData(form);

  // Access the form data using the input element's name attribute
  const eventName = formData.get('event-name');
  const startTime = formData.get('start-time');
  const endTime = formData.get('end-time');

  // Do something with the form data
  console.log('Event Name:', eventName);
  console.log('Start Time:', startTime);
  console.log('End Time:', endTime);

  // You can now process the form data, send it to the server, etc.
});


console.log({events})
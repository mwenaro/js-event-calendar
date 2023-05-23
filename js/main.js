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
const doctors = [
  {
    name: "John Smith",
    speciality: "surgeon",
    id: 2,
    gen: "male",
  },
  {
    name: "Jane Smith",
    speciality: "surgeon",
    id: 1,
    gen: "female",
  },
  {
    name: "Rose M",
    speciality: "sphysician",
    id: 3,
    gen: "female",
  },
];

const def_events = [
  {
    eventName: "meeting",
    startTime: "16:26",
    date: "2023-05-02T21:00:00.000Z",
    endTime: "19:26",
    drId: 1,
  },

  {
    eventName: "CEM",
    startTime: "08:30",
    date: "2023-05-22T21:00:00.000Z",
    endTime: "09:27",
    drId: 1,
  },

  {
    eventName: "surgery",
    startTime: "18:28",
    date: "2023-05-24T21:00:00.000Z",
    endTime: "20:33",
    drId: 3,
  },
];

if (!localStorage.getItem("events")) {
  localStorage.setItem("events", JSON.stringify(def_events));
}

function getRandoDrId() {
  let i = 0;
  let id = 1;
  while (1) {
    let randomNum = Math.random() * 10;
    randomNum = Math.floor(randomNum);
    if (doctors.map((dr) => dr.id).includes(randomNum)) {
      id = randomNum;
      break;
    }
  }

  return id;
}

localStorage.setItem("loggedInDr", getRandoDrId());

//creatre a query selector function
if (!_el) {
  const _el = (selector) => document.querySelector(selector);
}

const events = JSON.parse(localStorage.getItem("events")) || [];

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

function renderCalendar() {
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


  const addPersonButton = _el("#add-person-btn");

  // Creating the calender

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("row");
  headerDiv.classList.add("grid-box");
  // headerDiv.classList.add("calendar-body-header-row");

  //Adding the calender header row
  const startOfWeek = getStartOfWeek(currentDate);
  let firstDiv = document.createElement("div");
  firstDiv.classList.add("col-md-2");
  firstDiv.classList.add("grid-square");
  headerDiv.appendChild(firstDiv);
  for (let day = 0; day < weekDays.length; day++) {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-2");
    colDiv.classList.add("grid-square");
    colDiv.classList.add("calendar-hedaer-row");
    if (startOfWeek.getDate() === currentDate.getDate()) {
      colDiv.classList.add("selected");
    }
    // colDiv.classList.add('selected')
    let month = 1 + startOfWeek.getMonth();

    if ([0, 6].includes(day)) continue;

    colDiv.innerHTML = `
        <h3>${weekDays[day]}</h3>
        <h5>${startOfWeek.getDate()} . ${month > 9 ? month : "0" + month}</h5>
        `;
    // setDateForSelectedActivity(startOfWeek.getDate());

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
    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("col-md-12");
    row.classList.add("grid-box");

    const firstCol = document.createElement("div");
    firstCol.classList.add("col-md-2");
    firstCol.classList.add("grid-square");
    firstCol.textContent = startTime + ":00";

    row.appendChild(firstCol);

    for (let day = 0; day < 5; day++) {
      const colDiv = document.createElement("div");
      // colDiv.addEventListener("click", selectDate);
      // eventsRows.appendChild(colDiv);
      colDiv.classList.add("col-md-2");
      colDiv.classList.add("grid-square");
      row.appendChild(colDiv);
      // startOfWeek.setDate(startOfWeek.getDate() + 1);
    }
    calendarBody.appendChild(row);

    startTime += 1;
  }

  // calendarBody.appendChild(eventsRows);
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
  } else {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
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
  headerDiv.classList.add("grid-box");
  headerDiv.classList.add("row");
  headerDiv.classList.add("calendar-header-row");
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.toLocaleString("default", {
    dateStyle: "long",
  });
  monthYearDiv.textContent = `${currentMonth} ${currentDate.getFullYear()}`;

  const startOfWeek = getStartOfWeek(currentDate);
  //   headerDiv.appendChild(document.createElement("div"));
  for (let day = 0; day < weekDays.length; day++) {
    const colDiv = document.createElement("div");
    colDiv.classList.add("grid-square");
    let month = 1 + startOfWeek.getMonth();
    colDiv.classList.add("grid-square");
    if ([0, 6].includes(day)) {
      colDiv.classList.add("col-md-1");
    } else {
      colDiv.classList.add("col-md-2");
    }

    colDiv.innerHTML = `
          <h3>${weekDays[day]}</h3>
          `;

    headerDiv.appendChild(colDiv);
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

  calendarBody.appendChild(headerDiv);

  //   calendarBody.appendChild(eventsRows);

  let _date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("col-md-12");
    row.classList.add("grid-box");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement("div");
        cell.classList.add("grid-square");
        if ([0, 6].includes(j)) {
          cell.classList.add("col-md-1");
        } else {
          cell.classList.add("col-md-2");
        }

        row.appendChild(cell);
      } else if (_date > lastDate) {
        break;
      } else {
        const cell = document.createElement("div");
        cell.textContent = _date;
        cell.classList.add("grid-square");

        let identifier = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${_date}`;
        let events = hasEvents(identifier);
        // events = events?JSON.parse(JSON.stringify(events)):events

        cell.classList.add(identifier);
        // cell.setAttribute("event-id", identifier);

        if (events) {
          let p = document.createElement("ul");
          // p.classList.add('ul')
          p.classList.add("event-container");

          let content = events.map(
            (e) =>
              `<li><span>${e.startTime || ""}-${
                e.endTime || ""
              }</sp>  ${" "}<span>${e.eventName || ""}</span></li>`
          );
          p.innerHTML = content;

          cell.appendChild(p);
        }

        if ([0, 6].includes(j)) {
          cell.classList.add("col-md-1");
        } else {
          // cell.classList.add("col-md-2");
          cell.classList.add("col-md-2");
        }
        let b = _date;
        cell.addEventListener("click", (e) => selectDate(e.target, b));

        if (
          _date === currentDate.getDate() &&
          currentDate.getMonth() === new Date().getMonth() &&
          currentDate.getFullYear() === new Date().getFullYear()
        ) {
          cell.classList.add("selected");
        }
        // setDateForSelectedActivity(date)
        row.appendChild(cell);
        _date++;
      }
    }

    // eventsRows.appendChild(row);
    calendarBody.appendChild(row);
  }
}

// Initial render
renderMonthlyCalendar();

function selectDate(...vars) {
  if (calendarType === "monthly") _el("#date-field").classList.add("hidden");

  // console.log([vars[0].outerText, vars[1]]);
  setDateForSelectedActivity(vars[1]);

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

const addEvenModal = _el("#add-event-btn");
addEvenModal.addEventListener("click", () => {
  if (calendarType === "monthly") _el("#date-field").classList.remove("hidden");

  openModal();
});

//close
_el(".close-modal-btn").addEventListener("click", closeModal);
//open modsl fnc
function openModal() {
  _el("#event-modal-div").classList.remove("hidden");
}
function closeModal() {
  // _el('#date-field').classList.remove('hidden')
  _el("#event-modal-div").classList.add("hidden");
}

// var sample_events = [
//   {name:"", from :"", to :""}
// ]

// Function to generate a random date between two dates
function getRandomDate(start, end) {
  // console.log(start)
  return new Date(new Date().getFullYear(), 5, Math.ceil(Math.random() * 20));

  // return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Create an array to store the events

function getRondomEvents() {
  const events = [];
  // Generate 10 random events
  for (let i = 0; i < 10; i++) {
    // Generate random dates between February 1, 2023, and May 31, 2023
    const startDate = getRandomDate(
      new Date("2023-02-01"),
      new Date("2023-05-31")
    );
    const endDate = getRandomDate(startDate, new Date("2023-05-31"));

    // Format the dates as strings in the desired format
    const startTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const endTime = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Create an event object with the desired properties
    const event = {
      name: `Event ${i + 1}`,
      startTime: startTime,
      endTime: endTime,
    };

    // Add the event to the array
    events.push(event);
  }

  return events;
}

// Get a reference to the form element
const form = _el("#event-form");

// Add an event listener to the form's submit event
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission
  closeModal();

  // alert("hello")
  // Create a new FormData object passing the form as a parameter
  const formData = new FormData(form);

  // Access the form data using the input element's name attribute
  const eventName = formData.get("event-name");
  const startTime = formData.get("start-time");
  const date = formData.get("date") || eventDate;
  const endTime = formData.get("end-time");

  let event = {
    eventName,
    startTime,
    date,
    endTime,
    drId: localStorage.getItem("loggedInDr"),
  };
  let events = JSON.parse(localStorage.getItem("events")) || [];
  // let events =  [];
  // console.log({event})
  localStorage.setItem("events", JSON.stringify([...events, event]));
  form.reset();
  console.log(JSON.parse(localStorage.getItem("events")));
  renderMonthlyCalendar();
  // You can now process the form data, send it to the server, etc.
});

function setDateForSelectedActivity(date) {
  eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);

}

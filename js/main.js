// const _el = (selector) => document.querySelector(selector);

// import { saveData } from "./firebase.js";

// import {}
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

if (!_el) {
  const _el = (selector) => document.querySelector(selector);
}

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

  // let numOfWeeks = Math.ceil((lastDayOfMonth - firstDayOfMonth) / 7);
  // let CurrentWeekNumber = Math.ceil(
  //   (currentDate.getDate() - firstDayOfMonth) / 7
  // );

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  // const currentDay = currentDate.toLocaleString("default", {
  //   dateStyle: "long",
  // });
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
  let endTime = 22;

  //creating and adding the other fields
  const eventsRows = document.createElement("div");
  eventsRows.classList.add("events-grid");

  while (startTime <= endTime) {
    const startOfWeek2 = getStartOfWeek(currentDate);
    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("col-md-12");
    row.classList.add("grid-box");

    const firstCol = document.createElement("div");
    firstCol.classList.add("col-md-2");
    firstCol.classList.add("grid-square");
    firstCol.textContent = startTime + ":00";

    row.appendChild(firstCol);

    // startOfWeek2.setDate(startOfWeek2.getDate() + 1);
    for (let day = 0; day < 5; day++) {
      // startOfWeek2.setDate(startOfWeek2.getDate() + 1);
      let _date = startOfWeek2.getDate();
      let _time = startTime;
      const colDiv = document.createElement("div");
      // colDiv.addEventListener("click", selectDate);
      // eventsRows.appendChild(colDiv);
      colDiv.classList.add("col-md-2");
      colDiv.classList.add("grid-square");
      let identifier = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${_date}`;
      let events = hasEventNow(identifier, _time);

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

        colDiv.appendChild(p);
      }

      // colDiv.addEventListener("click", (e) => {
      //   let identifier = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${_date}`;
      //   let events = hasEventNow(identifier, _time);
      // });

      startOfWeek2.setDate(startOfWeek2.getDate() + 1);
      row.appendChild(colDiv);

      // startOfWeek.setDate(startOfWeek.getDate() + 1);
    }
    startOfWeek2.setDate(startOfWeek2.getDate() + 1);
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
        // cell.textContent = _date;
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
              `<li ev-id ="${e.id}"><span>${e.startTime || ""}-${
                e.endTime || ""
              }</sp>  ${" "}<span>${e.eventName || ""}</span></li>`
          );
          p.innerHTML = content;

          cell.appendChild(p);
        }

        let b = _date;
        if ([0, 6].includes(j)) {
          cell.classList.add("col-md-1");
        } else {
          // cell.classList.add("col-md-2");
          cell.classList.add("col-md-2");

          let labelAndButton = document.createElement("div");
          labelAndButton.innerHTML = `
        <span>${_date}</span>
       <div class="add-box">
        <span><input class="hidden" value="${_date}" />+</span>
        </div>
        `;
          labelAndButton.addEventListener("mouseenter", (e) =>
            addEventAction()
          );
          cell.prepend(labelAndButton);
        }

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

  console.log([vars[0].outerText, vars[1]]);
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

function addEvent() {
  openModal();
}

const addEvenModal = _el("#add-event-btn");
addEvenModal.addEventListener("click", () => {
  if (calendarType === "monthly") _el("#date-field").classList.remove("hidden");

  openModal();
});

function setDateForSelectedActivity(date) {
  eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
}

// console.log(events);
// removeStoredData('events')
function addEventAction() {
  let topDivs = document.querySelectorAll(".grid-square div:nth-child(1)");
  topDivs.forEach((topDiv) => {
    let span = topDiv.querySelector("div.add-box>span");
    topDiv.addEventListener("mouseenter", (e) => {
      span.addEventListener("click", (e) => {
        if (calendarType === "monthly")
          _el("#date-field").classList.add("hidden");
        _el("#date-field").classList.add("hidden");
        // addEvent();

        let input = e.target.querySelector("input");
        // console.log({ el: input.value });
        setDateForSelectedActivity(+input.value);
        closeModal();
        _el("#date-field").classList.add("hidden");
        openModal();
      });
      span.style = "display:flex";
    });

    topDiv.addEventListener("mouseleave", (e) => {
      // console.log(e.target, " left");
      // e.target
      span.style = "";
    });
  });
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

  //check if the time is valid . startTime < endTime
  if(getTimeValue(startTime) >= getTimeValue(endTime)){
    alert("Invalid time. Your statTime cannot be after your endTime. Change and proceed")
    form.reset()
    return;
  }
  
  //create a new eventobject
  let event = {
    id: new Date().getTime() + Math.floor(Math.random() * 10000),
    eventName,
    startTime,
    date,
    endTime,
    drId: +getStoredData("loggedInDr"), //This is the logged in doctor id
  };

  // check if there's no event within the time range
  if (!validateEventByTimeRange(event)) {
    alert(
      "Invalid time range. You have an event within the range. Change time and try again!"
    );
    form.reset()
    return;
  }




  addToStoredData("events", event); //pushig the new event to the local storage
  // saveData("events", event);//Save the event to firebase;

  //Reset form fields
  form.reset();

  //Rerender the calender
  renderMonthlyCalendar();
  // addEventAction();
  // You can now process the form data, send it to the server, etc.
});

// addEventAction();

//creatre a query selector function
const _el = (selector) => document.querySelector(selector);

//Initialize the calender
const calenderBody = _el("#calendar-body");
const prevButton = _el("#prev");
const nextButton = _el("#next");
const todayButton = _el("#today");
const addEventButton = _el("#add-event-btn");
const monthYearDiv = _el("#month-year-div");

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
const currentDate = new Date();

function renderCalendar(params) {
  calenderBody.innerHTML = "";

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
  const closeModalButton = _el("#close-modal-btn");

  //Open the modal
  addEventButton.addEventListener("click", (e) => {
    e.preventDefault();
    eventForm.parentElement.classList.remove("hidden");
  });
  //Close Modal
  closeModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    eventForm.parentElement.classList.add("hidden");
  });

  // Creating the calender

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("calendar-body-row");
  headerDiv.classList.add("calendar-body-header-row");
 

  //Adding the calender header row
  const startOfWeek = getStartOfWeek(currentDate);
  headerDiv.appendChild(document.createElement("div"));
  for (let day = 0; day < weekDays.length; day++) {
    const colDiv = document.createElement("div");
    let month = 1 + startOfWeek.getMonth();

    if ([0, 6].includes(day)) continue;

    colDiv.innerHTML = `
    <h3>${weekDays[day]}</h3>
    <h5>${startOfWeek.getDate()} . ${month > 9 ? month : "0" + month}</h5>
    `;
    

    headerDiv.appendChild(colDiv);
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

  calenderBody.appendChild(headerDiv);
let startTime = 7;
let endTime = 21;

  //creating and adding the other fields
  const eventsRows = document.createElement("div");
  eventsRows.classList.add("events-grid");

  while(startTime<=endTime){
  const firstCol = document.createElement("div")
  firstCol.textContent = startTime +':00'
  eventsRows.appendChild(firstCol);


  for (let day = 0; day < 5; day++) {
    const colDiv = document.createElement("div");
   
    

    eventsRows.appendChild(colDiv);
    // startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

startTime+=1;
}

calenderBody.appendChild(eventsRows);

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
  currentDate.setDate(currentDate.getDate() - 7);
  renderCalendar();
}

function showNextWeek() {
  currentDate.setDate(currentDate.getDate() + 7);
  renderCalendar();
}

//call

renderCalendar();
document.addEventListener("load", () => {
  currentDate = new Date();
  console.log({ loaded: 1223 });
});

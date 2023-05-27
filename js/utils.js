const loadPartial = (path, targetElm) => {
  try {
    fetch("partials/" + path + ".partial.html")
      .then((res) => res.text())

      .then((doc) => {
        let drId = localStorage.getItem("loggedInDr");

        targetElm.innerHTML = doc;

        if (path == "header" && drId) {
          targetElm.querySelector("#dr-pic").src = `img/dr-${drId}.png`;
          targetElm.querySelector("#dr-name").textContent = doctors.find(
            (dr) => dr.id == drId
          ).name;
        }
        // console.log({targetElm:targetElm.childNodes[10]||[]})
      });
  } catch (error) {
    targetElm.innerHTML = "<h4>Error occured loading " + path + " partial</h4>";
  }
};

const getHrs = (_time) => +_time.toString().split(":")[0];
const getMins = (_time) => +_time.toString().split(":")[1];

const compareTime = (_t1, _t2) => {
  if (+getHrs(_t1) > +getHrs(_t2)) return true;
  // else if (getHrs(_t1) == getHrs(_t2) && getMins(_t1) > getMins(_t2))
  // return true;
  else false;
};

function hasEvents(identifier = null) {
  try {
    let events = JSON.parse(localStorage.getItem("events"));
    let data = events
      .filter((e) => {
        let d = new Date(e.date);
        return (
          // identifier === `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` &&
          identifier === createYearMonthDateIdentifier(e.date) &&
          e.drId == localStorage.getItem("loggedInDr")
        );
      })
      // .sort((a, b) => compareTime(b.startTime, a.startTime));
      .sort((a, b) => getHrs(a.startTime) - getHrs(b.startTime));
    // .sort((a, b) => getHrs(b.startTime) - getHrs(a.startTime));
    // .sort((a, b) => compareTime(b.startTime, a.startTime));

    // console.log({events, data})
    return data;
  } catch (error) {
    return [];
  }

  // renderMonthlyCalendar()
  // return data ?? false;
}
function hasEventNow(identifier, hr) {
  try {
    let events = JSON.parse(localStorage.getItem("events"));
    let data = events.filter((e) => {
      let d = new Date(e.date);
      return (
        // identifier === `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` &&
        identifier === createYearMonthDateIdentifier(e.date) &&
        e.drId == localStorage.getItem("loggedInDr") &&
        [getHrs(e.startTime), getHrs(e.endTime)].includes(hr)
      );
    });

    console.log({ events, data });
    return data;
  } catch (error) {
    return [];
  }

  // renderMonthlyCalendar()
  // return data ?? false;
}

// hasEvents();

function getStoredData(slice = "events") {
  try {
    return JSON.parse(localStorage.getItem(slice));
  } catch (error) {
    console.log({ error });
    return null;
  }
}

function setStoredData(slice, data) {
  try {
    let stringified = JSON.stringify(data);
    localStorage.setItem(slice, stringified);

    return JSON.parse(localStorage.getItem(slice));
  } catch (error) {
    console.log({ error });
    return null;
  }
}

function removeStoredData(slice) {
  try {
    localStorage.removeItem(slice);

    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
}

function addToStoredData(slice, data) {
  try {
    let dataToBeStored = getStoredData(slice)
      ? [...getStoredData(slice), data]
      : [data];
    let stringified = JSON.stringify(dataToBeStored);
    localStorage.setItem(slice, stringified);

    return JSON.parse(localStorage.getItem(slice));
  } catch (error) {
    console.log({ error });
    return false;
  }
}

function removeFromStoredData(slice, filter) {
  try {
    let storedData = getStoredData(slice) ? getStoredData(slice) : [];

    if (filter.name == "index" && +filter.value <= storedData.length)
      delete storedData[+filter.value];
    else {
      storedData = storedData.filter((row) => row[filter.name] != filter.value);
    }

    let stringified = JSON.stringify(storedData);
    localStorage.setItem(slice, stringified);

    return JSON.parse(localStorage.getItem(slice));
  } catch (error) {
    console.log({ error });
    return null;
  }
}

//close
_el(".close-modal-btn").addEventListener("click", closeModal);
//open modsl fnc
function openModal() {
  _el("#event-modal-div").classList.remove("hidden");
}
function closeModal() {
  _el("#date-field").classList.remove("hidden");
  _el("#event-modal-div").classList.add("hidden");
}

function validateEventByTimeRange(event) {

let events = getStoredData('events');
let filtered = events.filter(e=>{
  return createYearMonthDateIdentifier(e.date) == createYearMonthDateIdentifier(event.date) && e.drId == event.drId && (
    (
      getTimeValue(event.startTime) >= getTimeValue(e.startTime) && getTimeValue(event.startTime) <= getTimeValue(e.endTime) ||
      (getTimeValue(event.endTime) >= getTimeValue(e.startTime) && getTimeValue(event.endTime) <= getTimeValue(e.endTime) )
    )
  )
})

// console.log({filtered})
if(filtered.length>0) return false;

  return true;
}

function createYearMonthDateIdentifier(_date) {
  let date = new Date(_date);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}


function getTimeValue(t) {

  console.log({time:t, value: 60*Number(getHrs(t))+Number(getMins(t))})
  return 60*Number(getHrs(t))+Number(getMins(t))
}
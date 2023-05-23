const _el = (selector) => document.querySelector(selector);

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

function hasEvents(identifier = null) {
  try {
    let events = JSON.parse(localStorage.getItem("events"));
    let data = events
      .filter((e) => {
        let d = new Date(e.date);
        return (
          identifier === `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` &&
          e.drId == localStorage.getItem("loggedInDr")
        );
      })
      .sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf());

    // console.log({events, data})
    return data;
  } catch (error) {
    return [];
  }

  // renderMonthlyCalendar()
  // return data ?? false;
}
function hasEventNow(identifier, hr) {
  let getHr = (time) => +time.toString().split(":")[0];
  try {
    let events = JSON.parse(localStorage.getItem("events"));
    let data = events.filter((e) => {
      let d = new Date(e.date);
      return (
        identifier === `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` &&
        e.drId == localStorage.getItem("loggedInDr") &&
        [getHr(e.startTime), getHr(e.endTime)].includes(hr)
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

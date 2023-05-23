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
  let events = JSON.parse(localStorage.getItem("events"));
let data =  events.filter((e) => {
    let d = new Date(e.date);
    return (identifier === `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` && e.drId == localStorage.getItem('loggedInDr'));
  });
  // renderMonthlyCalendar()
  return data?? false;
}

// hasEvents();

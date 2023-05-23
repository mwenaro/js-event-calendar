// { getDatabase, set, get, update,remove, ref, child }

// let set = window.set, get = window.get, ref= window.ref, remove = window.remove,update = window.remove, db = window.db

let _time = new Date();
// const doctors = [
//   {
//     name: "John Smith",
//     speciality: "surgeon",
//     id: 1,
//     gen: "male",
//   },
//   {
//     name: "Jane Smith",
//     speciality: "surgeon",
//     id: 2,
//     gen: "female",
//   },
//   {
//     name: "Rose M",
//     speciality: "sphysician",
//     id: 3,
//     gen: "female",
//   },
// ];

const defaultEvents = [
  {
    name: "Inspection",
    startTime: _time,
    endTime: _time.setTime(_time.getTime().toString() + 3600 * 2 * 1000),
    drId: 1,
  },
  {
    name: "Surgery",
    startTime: _time,
    endTime: _time + 3600 * 1 * 1000,
    drId: 2,
  },
  {
    name: "Meeting ",
    startTime: _time + 3600 * 2 * 1000,
    endTime: _time + 3600 * 4 * 1000,
    drId: 3,
  },
  {
    name: "Departmental meeting",
    startTime: _time + 3600 * 3 * 1000,
    endTime: _time + 3600 * 6 * 1000,
    drId: 2,
  },
  {
    name: "Inspection",
    startTime: _time - 3600 * 4 * 1000,
    endTime: _time - 3600 * 2 * 1000,
    drId: 1,
  },
];

// console.log({defaultEvents, doctors})
// defaultEvents.map(event=>console.log({start:Date(event.startTime), end:Date(event.endTime)}))

document.addEventListener("load", () => {
  let drPic = _el("#dr-pic");
  let drName = _el("#dr-name");

  console.log({ drName, drPic });
});


// function hasEvents(dateObj = null, date=null) {
//   // const day = document.querySelector("div[data-id=2023-4-22]")
//   const days = document.querySelectorAll('.grid-square')
//   const day = _el('div[data-id="2023-4-22"]')
  
//   console.log({day,days})
//   day.classList.add('bg-green');
//   renderMonthlyCalendar()
//   }
  

// hasEvents()
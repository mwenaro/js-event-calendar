// Import the export functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig2 = {
  apiKey: "AIzaSyDr8fCqLLbuTH2AyO8KW98Kf-OpPmkIC9Q",
  authDomain: "event-calendar-4202a.firebaseapp.com",
  projectId: "event-calendar-4202a",
  storageBucket: "event-calendar-4202a.appspot.com",
  messagingSenderId: "904090546059",
  appId: "1:904090546059:web:f338cd7768c9c3f13e498e",
  measurementId: "G-FSVBLNREV2",
};

const firebaseConfig = {
  apiKey: "AIzaSyAH8Z-L32kIfTzFaMGZoBE3lz4ycb5iQOs",
  authDomain: "my-first-app-7fede.firebaseapp.com",
  projectId: "my-first-app-7fede",
  storageBucket: "my-first-app-7fede.appspot.com",
  messagingSenderId: "848991765026",
  appId: "1:848991765026:web:23160bdb9aaffc9784807b",
  // databaseURL:"https://my-first-app-7fede.firebaseio.com"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
import {
  getDatabase,
  set,
  get,
  update,
  remove,
  ref,
  child,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const db = getDatabase(app);

export function saveData(table, data) {
  const id = new Date().getTime();
  set(ref(db, `${table}/${id}`), data)
    .then((snapshot) => {
      console.log({ snapshot });
      alert(table + " Successfully created");
    })
    .catch((error) => {
      console.log({ error });
      alert("Something went wrong, check data and try again");
    });
}

export { getDatabase, set, get, update, remove, ref, child, onValue };

// saveData("events", {
// eventName: "Surgery",
// date: new Date(),
// startTime: "14:30",
// endTime: "17:30",
// drId:1
// })

export function updateData(table, data, id) {
  update(ref(db, `${table}/${id}`), data)
    .then(() => alert(table + " Successfully created"))
    .catch((error) => {
      alert("Something went wrong, check data and try again");
    });
}

export function deleteData(table, id) {
  remove(ref(db, `${table}/${id}`))
    .then(() => alert(table + " Successfully deleted"))
    .catch((error) => {
      alert("Something went wrong, check data and try again");
    });
}

export function getDataById2(table, id) {
  const dbRef = ref(db);

  get(ref(child(dbRef, `${table}/${id}`)))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        alert(" Data not found!");
        return null;
      }

      return snapshot.value();
    })
    .catch((error) => {
      alert("Something went wrong, check data and try again");
      console.log({ error });
      return null;
    });
}

export async function getDataById(table, id) {
  const path = `${table}/${id}`;
  return await getData(path);
}

export async function getData(table) {
  let data = null;
  try {
    const starCountRef = await ref(db, table);
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      console.log({ data });
      return data;
    });
  } catch (error) {
    console.log({ error });
  } finally {
    return data;
  }
}

// console.log(await getDataById("events", "1684901639833"));

// Get a reference to the form element
const form = _el("#event-form");

// // Add an event listener to the form's submit event
// form.addEventListener("submit", function (e) {

//   alert("loaded from firebase");
//   e.preventDefault(); // Prevent the default form submission
//   closeModal();

//   // alert("hello")
//   // Create a new FormData object passing the form as a parameter
//   const formData = new FormData(form);

//   // Access the form data using the input element's name attribute
//   const eventName = formData.get("event-name");
//   const startTime = formData.get("start-time");
//   const date = formData.get("date") || eventDate;
//   const endTime = formData.get("end-time");

//   let event = {
//     eventName,
//     startTime,
//     date,
//     endTime,
//     drId: +getStoredData("loggedInDr"),
//   };

//   addToStoredData("events", event);
//   saveData("events", event);

//   form.reset();

//   renderMonthlyCalendar();
//   // You can now process the form data, send it to the server, etc.
// });

// export {getData, saveData, getDataById, updateData, deleteData}

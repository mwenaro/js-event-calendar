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
     id:1,
      eventName: "meeting",
      startTime: "9:40",
      date: "2023-05-02T21:00:00.000Z",
      endTime: "11:20",
      drId: 1,
    },
    {
     id:2,
      eventName: "CEM",
      startTime: "08:30",
      date: "2023-05-22T21:00:00.000Z",
      endTime: "09:27",
      drId: 2,
    },
    {
     id:3,
      eventName: "surgery",
      startTime: "08:28",
      date: "2023-05-24T21:00:00.000Z",
      endTime: "09:33",
      drId: 3,
    },
    {
     id:4,
      eventName: "meeting2",
      startTime: "08:29",
      date: "2023-05-02",
      endTime: "10:29",
      drId: 2,
    },
    {
     id:5,
      eventName: "CEM",
      startTime: "08:52",
      date: "2023-05-02T21:00:00.000Z",
      endTime: "09:52",
      drId: 1,
    },
    {
     id:6,
      eventName: "surgery",
      startTime: "06:20",
      date: "2023-05-01T21:00:00.000Z",
      endTime: "07:59",
      drId: 2,
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
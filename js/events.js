let eventListItems = document.querySelectorAll(".event-container > li");
eventListItems.forEach((item,) => {
    item.addEventListener("dblclick", (e) => {
    console.log({clicks:e.detail, target:e.target.textContent});
  });
});


function validateEventTimeFields() {

  const startTime = '';
  
}
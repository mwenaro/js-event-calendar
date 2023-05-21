const _el = (selector) => document.querySelector(selector);

const loadPartial = (path, targetElm) => {
  try {
    fetch("partials/" + path + ".partial.html")
      .then((res) => res.text())

      .then((doc) => {
        console.log({targetElm})
        targetElm.innerHTML = doc;
      });
  } catch (error) {
    targetElm.innerHTML = "<h4>Error occured loading " + path + " partial</h4>";
  }
};
console.log("partial loader loaded");

const weatherFrom = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${address}`).then((resposne) => {
    resposne.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.forecastData;
        messageTwo.textContent = data.location;
      }
    });
  });
});

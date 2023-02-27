const formEl = document.querySelector(".form");
const inputNumberEl = document.querySelector(".form-number");
const inputEl = document.querySelectorAll(".input");
const invalidEl = document.querySelectorAll(".input:invalid");
// const formValidation = new FormData(formEl);

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
});

inputEl.forEach((el) => {
  el.addEventListener("keyup", function (event) {
    console.log(event.target.validity);
  });
});

inputNumberEl.addEventListener("keydown", function (event) {
  const text = removeString(event.target.value, " ");

  if (event.keyCode !== 8) {
    switch (text.length) {
      case 4:
      case 8:
      case 12:
        return (event.target.value = `${event.target.value} `);
    }
  }
});

function removeString(text, what) {
  let parsedText = "";

  if (typeof text === "string") {
    let splitText = text.split(what);

    splitText.forEach(function (txt) {
      parsedText += txt;
    });
  }

  return parsedText;
}

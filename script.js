const formEl = document.querySelector(".form");
const inputNumberEl = document.querySelector(".form-number");
const inputEl = document.querySelectorAll(".input");

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  inputEl.forEach((el) => {
    el.setAttribute("required", true);
    el.parentNode.querySelector(".msg-error").textContent =
      el.validationMessage;

    setTimeout(() => {
      el.removeAttribute("required");
    }, "5000");
  });

  formEl.classList.add("errors");
  setTimeout(() => {
    formEl.classList.remove("errors");
  }, "5000");
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

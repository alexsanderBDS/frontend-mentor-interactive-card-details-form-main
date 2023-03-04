const formEl = document.querySelector(".form");
const inputNameEl = document.querySelector(".form-name");
const inputNumberEl = document.querySelector(".form-number");
const contentEl = document.querySelector(".content");
const msgBtn = document.querySelector(".msg-btn");
const inputEl = document.querySelectorAll(".input");

class Validations {
  el;

  constructor(el) {
    this.el = el;
  }

  empty() {
    if (!this.el.value) {
      return "Can't be blank";
    }
    return "";
  }

  min() {
    const [min, minRequired] = [
      this.el.value.toString().length,
      parseInt(this.el.getAttribute("minlength")),
    ];

    if (min < minRequired) {
      return `Less than ${minRequired}`;
    }
    return "";
  }

  number(className) {
    let onlyNumber = removeString(this.el.value, " ");
    let bool = isNaN(onlyNumber);

    if (bool && this.el.classList.contains(className)) {
      return "Wrong format, numbers only";
    }

    return "";
  }
}

function setValidation(element) {
  const validation = new Validations(element);

  let errors = [
    validation.empty(),
    validation.min(),
    validation.number("form-number"),
    validation.number("form-exp-month"),
    validation.number("form-exp-year"),
    validation.number("form-cvc"),
  ];

  const [error] = errors.filter((errorText) => {
    if (errorText) {
      return errorText;
    }
  });

  if (error) {
    element.parentNode.querySelector("span").textContent = error;
    element.parentNode.classList.add("errors");
    element.classList.add("error");
  }
}

function setError(onEvent, element) {
  element.addEventListener(onEvent, function (event) {
    setValidation(event.target);
  });
}
function unSetError(onEvent, element) {
  element.addEventListener(onEvent, function (event) {
    event.target.parentNode.classList.remove("errors");
    event.target.classList.remove("error");
  });
}

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

function capitalize(text, afterText) {
  for (var i = text.length; i > 0; i--) {
    if (text[i] === afterText) {
      const parsedText = `${text.substring(0, text.length - 1)}${text[
        i + 1
      ].toUpperCase()}`;
      return parsedText;
    }
  }
}

// * * * APPLY

inputEl.forEach(function (el) {
  unSetError("focus", el);
  setError("blur", el);
});

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const form = new FormData(formEl);

  for (const value of form.values()) {
    if (!value) {
      inputEl.forEach(function (el) {
        setValidation(el);
      });
      return;
    }
  }

  const errors = document.querySelectorAll(".errors");

  if (!errors.length) {
    contentEl.classList.add("show-msg");
  }
});

msgBtn.addEventListener("click", function () {
  inputEl.forEach((input) => {
    input.value = null;
  });

  contentEl.classList.remove("show-msg");
});

inputNameEl.addEventListener("keydown", function () {
  const text = this.value;
  if (typeof text === "string") {
    if (text.length === 1) {
      this.value = text.toUpperCase();
      return;
    }

    if (text.length > 2 && text[text.length - 2] === " ") {
      this.value = capitalize(text, " ");
      return;
    }
  }
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

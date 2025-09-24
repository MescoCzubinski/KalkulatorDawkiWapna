function format(inputString) {
  return inputString
    .replace(/[^0-9.,]/g, "")
    .replace(/^0+(?=\d)/, "")
    .replace(/,/g, ".")
    .replace(/^\.($|[^0-9])/, "0.")
    .replace(/\.{2,}/g, ".")
    .replace(/(.*?\..*?)\./g, "$1")
    .replace(/(\d+\.\d{1})\d*/g, "$1")
    .replace(/[a-zA-Z]+/g, "");
}
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", (event) => {
    const inputField = event.target;
    inputField.value = format(inputField.value);
  });
});
const visitedElements = document.querySelectorAll("input, select");
visitedElements.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value) {
      this.classList.add("visited");
    } else {
      this.classList.remove("visited");
    }
  });
});

const soilCategory = document.querySelector("#soilCategory");
const needsButtons = document.querySelector("#needsButtons");
const phValue = document.querySelector("#phValue");
const caoValue = document.querySelector("#caoValue");
const resultText = document.querySelector("#result");

const needSection = document.querySelector("#needsSection");
const phSection = document.querySelector("#phSection");

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  const allElements = document.querySelectorAll("input, select");
  allElements.forEach((input) => {
    input.value = "";
    input.classList.remove("visited");
  });
  selectedButton = "";
  result.textContent = "uzupełnij wartości";
});

let selectedButton = "";
needsButtons.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    selectedButton = event.target.value;
    calculate();
  }
});
const phValueString = (phValue) => {
  if (phValue < 4.0) return "<4.0";
  if (phValue >= 4.0 && phValue <= 4.5) return "4.0-4.5";
  if (phValue >= 4.6 && phValue <= 5.0) return "4.6-5.0";
  if (phValue >= 5.1 && phValue <= 5.5) return "5.1-5.5";
  if (phValue >= 5.6 && phValue <= 6.0) return "5.6-6.0";
  if (phValue >= 6.1 && phValue <= 6.5) return "6.1-6.5";
  if (phValue >= 6.6 && phValue <= 7.0) return "6.6-7.0";
  if (phValue > 7.0) return "<7.0";
};
function calculate() {
  let result = 0;
  if (
    soilCategory.value !== "" &&
    selectedButton !== "" &&
    phValue.value === ""
  ) {
    needSection.style.display = "block";
    phSection.style.display = "none";
    result = soil_type[soilCategory.value][selectedButton];
  } else if (
    soilCategory.value !== "" &&
    selectedButton === "" &&
    phValue.value !== ""
  ) {
    needSection.style.display = "none";
    phSection.style.display = "block";
    const phString = phValueString(phValue.value);
    console.log(phString);
    result = soil_ph[soilCategory.value][phString];
  }
  console.log(result);
  setResult(result);
}
function setResult(result) {
  if (result === undefined) {
    resultText.textContent = "zmień ustawienia";
  } else {
    result = result / caoValue.value;
    if (isNaN(result) || !isFinite(result)) {
      resultText.textContent = "uzupełnij CaO";
      return;
    } else {
      resultText.textContent = result.toLocaleString("pl-PL", 2) + " t/ha";
    }
  }
}
document.querySelectorAll("button, input, select").forEach((element) => {
  element.addEventListener("input", calculate);
  element.addEventListener("change", calculate);
  element.addEventListener("click", calculate);
});

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

const soilCategoryIUNG = document.querySelector("#soilCategoryIUNG");
const soilCategoryDLG = document.querySelector("#soilCategoryDLG");
const needsButtons = document.querySelector("#needsButtons");
const methodButtons = document.querySelector("#methodButtons");
const phValue = document.querySelector("#phValue");
const caoValue = document.querySelector("#caoValue");
const mgoValue = document.querySelector("#mgoValue");
const resultText = document.querySelector("#result");
const resultText2 = document.querySelector("#result2");

const contentSection = document.querySelector("#contentSection");
contentSection.style.display = "none";
const soilCategoryIUNGSection = document.querySelector(
  "#soilCategoryIUNGSection"
);
const soilCategoryDLGSection = document.querySelector(
  "#soilCategoryDLGSection"
);
const needSection = document.querySelector("#needsSection");
const phSection = document.querySelector("#phSection");

function resetFunction() {
  const allElements = document.querySelectorAll("input, select");
  allElements.forEach((input) => {
    input.value = "";
    input.classList.remove("visited");
  });
  needsButtons.querySelectorAll("button").forEach((button) => {
    button.classList.remove("opacity-40");
  });
  methodButtons.querySelectorAll("button").forEach((button) => {
    button.classList.remove("opacity-40");
  });
  selectedButton = "";
  selectedMethod = "";
  contentSection.style.display = "none";
  needSection.style.display = "block";
  phSection.style.display = "block";
  resultText.textContent = "uzupełnij wartości";
  resultText2.textContent = "uzupełnij wartości";
}
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => resetFunction());

let selectedMethod = "";
methodButtons.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    selectedMethod = event.target.value;
    methodButtons.querySelectorAll("button").forEach((button) => {
      button.classList.add("opacity-40");
    });
    event.target.classList.remove("opacity-40");
    contentSection.style.display = "block";
    // resetFunction();
    calculatrions();
    if (selectedMethod === "IUNG") {
      soilCategoryIUNGSection.style.display = "block";
      soilCategoryDLGSection.style.display = "none";
    } else if (selectedMethod === "DLG") {
      soilCategoryIUNGSection.style.display = "none";
      soilCategoryDLGSection.style.display = "block";
    }
  }
});
let selectedButton = "";
needsButtons.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    selectedButton = event.target.value;
    needsButtons.querySelectorAll("button").forEach((button) => {
      button.classList.add("opacity-40");
    });
    event.target.classList.remove("opacity-40");
    calculatrions();
  }
});
const phValueStringIUNG = (phValue) => {
  if (phValue < 4.0) return "<4.0";
  if (phValue >= 4.0 && phValue <= 4.5) return "4.0-4.5";
  if (phValue >= 4.6 && phValue <= 5.0) return "4.6-5.0";
  if (phValue >= 5.1 && phValue <= 5.5) return "5.1-5.5";
  if (phValue >= 5.6 && phValue <= 6.0) return "5.6-6.0";
  if (phValue >= 6.1 && phValue <= 6.5) return "6.1-6.5";
  if (phValue >= 6.6 && phValue <= 7.0) return "6.6-7.0";
  if (phValue > 7.0) return "<7.0";
};
const phValueStringDLG = (phValue) => {
  const num = Number(phValue);
  if (num < 4.1) return "<4.1";
  if (num > 7.2) return "<7.2";
  return num.toFixed(1).toString();
};
function calculateCaO() {
  let result = 0;
  if (selectedMethod === "IUNG") {
    needSection.style.display = "block";
    if (
      soilCategoryIUNG.value !== "" &&
      selectedButton !== "" &&
      phValue.value === ""
    ) {
      needSection.style.display = "block";
      phSection.style.display = "none";
      const found = soil_type[soilCategoryIUNG.value][selectedButton];
      result = found ? found : 0;
      resultText.textContent =
        result.toLocaleString("pl-PL", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " t/ha";
    } else if (
      soilCategoryIUNG.value !== "" &&
      selectedButton === "" &&
      phValue.value !== ""
    ) {
      phSection.style.display = "block";
      needSection.style.display = "none";
      const phString = phValueStringIUNG(phValue.value);
      const found = soil_ph[soilCategoryIUNG.value][phString];
      result = found ? found : 0;

      resultText.textContent =
        result.toLocaleString("pl-PL", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " t/ha";
    } else {
      resultText.textContent = "uzupełnij wartości";
    }
  } else if (selectedMethod === "DLG") {
    needSection.style.display = "none";
    phSection.style.display = "block";
    if (soilCategoryDLG.value !== "" && phValue.value !== "") {
      const phString = phValueStringDLG(phValue.value);
      const found = soil_ph_DLG.find(
        (item) =>
          item.typ_gleby === soilCategoryDLG.value &&
          item.wartosc_pH === phString
      );
      result = found ? found.dawka_wapnowania : 0;
      resultText.textContent =
        result.toLocaleString("pl-PL", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " t/ha";
    }
  }
}

function calculateWapno() {
  let caoValueNumber = Number(caoValue.value);
  let mgoValueNumber = Number(mgoValue.value);
  if (
    caoValueNumber > 0 &&
    mgoValueNumber >= 0 &&
    caoValueNumber <= 100 &&
    mgoValueNumber <= 100
  ) {
    let result = resultText.textContent
      .replace(" t/ha", "")
      .replace(",", ".")
      .replace("&nbsp;", "");
    result = (result * 100) / (caoValueNumber + 1.391 * mgoValueNumber);
    if (isNaN(result) || !isFinite(result)) {
      resultText2.textContent = "uzupełnij wartości";
      return;
    }
    resultText2.textContent =
      result.toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " t/ha";
  }
}
function calculatrions() {
  calculateCaO();
  calculateWapno();
}
document.querySelectorAll("button, input, select").forEach((element) => {
  element.addEventListener("input", calculatrions);
  element.addEventListener("change", calculatrions);
  element.addEventListener("click", calculatrions);
});

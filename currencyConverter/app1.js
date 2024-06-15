const base =
  "https://v6.exchangerate-api.com/v6/96981f6010837e6101864ddb/latest";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select ");
const toCurr = document.querySelector(".to select ");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amount.value = "";
    alert("Check Your Input");
    return; // add return to prevent further execution
  }

  const URL = `${base}/${fromCurr.value}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];

    let finalAmt = amountVal * rate;

    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${
      toCurr.value
    }`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "Error fetching exchange rate. Please try again later.";
  }
});

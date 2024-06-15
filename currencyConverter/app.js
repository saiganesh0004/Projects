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
  if (amountVal === "") {
    amount.value = "";
    msg.innerText = "";
    alert("Enter the Input");
  } else if (amountVal < 0) {
    amount.value = "";
    msg.innerText = "";
    alert("No Negative values");
  } else {
    const URL = `${base}/${fromCurr.value}`;
    console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    //   console.log(rate);
    let finalAmt = amountVal * rate;
    //   console.log(rate);
    //   console.log(finalAmt);
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
  }
});

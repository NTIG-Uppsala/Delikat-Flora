import { fetchFlowerDelivery } from './fetch.js';

const ARRAY = await fetchFlowerDelivery()
const POSTAL_INPUT = document.querySelector(".postalCodeInput")
const CONFIRM_BUTTON = document.querySelector(".confirmButton")
const POSTAL_CODE_OUTPUT = document.querySelector(".postalCodeOutput")


POSTAL_INPUT.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        postalCodeCheck()
    }
})
CONFIRM_BUTTON.addEventListener("click", postalCodeCheck)

function postalCodeCheck() {
    POSTAL_CODE_OUTPUT.style.opacity = "0"
    setTimeout(() => { POSTAL_CODE_OUTPUT.style.opacity = "1" }, 200)

    let enteredCode = POSTAL_INPUT.value.replace(/\s/g, ""); // Sets enteredCode to POSTAL_CODE_INPUT but removes all spaces

    if (enteredCode == "") {
        POSTAL_CODE_OUTPUT.textContent = "Skriv in ett postnummer i rutan";
        return;
    }
    if (isInvalidPostalCode(enteredCode)) {
        POSTAL_CODE_OUTPUT.textContent = "Detta är inte ett giltigt postnummer. Försök igen";
        return;
    }
    let match = ARRAY.find(entry => entry["postal_code"] == enteredCode);
    if (match) { // if match is found
        POSTAL_CODE_OUTPUT.textContent = "Ja, detta postnummer kan vi leverera till! Priset för din leverans är " + match["postal_price"] + " kr";
        return;
    }
    else {
        POSTAL_CODE_OUTPUT.textContent = "Tyvärr, vi levererar inte till detta postnummer";
        return;
    }

}

function isInvalidPostalCode(postalCode) {
    return /[a-zA-Z]/.test(postalCode) || !/^\d{5}$/.test(postalCode);
}


export { postalCodeCheck };
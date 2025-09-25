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
        POSTAL_CODE_OUTPUT.textContent = "Indtast et postnummer i feltet";
        return;
    }
    if (isInvalidPostalCode(enteredCode)) {
        POSTAL_CODE_OUTPUT.textContent = "Dette er ikke et gyldigt postnummer. Prøv igen.";
        return;
    }
    let match = ARRAY.find(entry => entry["postal_code"] == enteredCode);
    if (match) { // if match is found
        POSTAL_CODE_OUTPUT.textContent = "Ja, vi kan levere til dette postnummer! Prisen for din levering er " + match["postal_price"] + " SEK";
        return;
    }
    else {
        POSTAL_CODE_OUTPUT.textContent = "Vi leverer desværre ikke til dette postnummer";
        return;
    }

}

function isInvalidPostalCode(postalCode) {
    return /[a-zA-Z]/.test(postalCode) || !/^\d{5}$/.test(postalCode);
}


export { postalCodeCheck };
import { fetchFlowerDelivery } from './fetch.js';

const ARRAY = await fetchFlowerDelivery()
const POSTAL_INPUT = document.querySelector(".postalCodeInput")
const CONFIRM_BUTTON = document.querySelector(".confirmButton")
const POSTAL_CODE_OUTPUT = document.querySelector(".postalCodeOutput")


POSTAL_INPUT.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        POSTAL_CODE_OUTPUT.style.opacity = "0"
        setTimeout(() => { postalCodeCheck() }, 200)
    }
})
CONFIRM_BUTTON.addEventListener("click", postalCodeCheck)

function postalCodeCheck() {

    POSTAL_CODE_OUTPUT.style.opacity = "1"

    let enteredCode = POSTAL_INPUT.value.replace(/\s/g, ""); // Sets enteredCode to POSTAL_CODE_INPUT but removes all spaces
    if (document.documentElement.lang === "en") {
        var RESPONSE = ["Enter a postal code in the box",
            "This is not a valid postal code. Please try again",
            "Yes, we can deliver to this postal code! The price for your delivery is ",
            "Unfortunately, we do not deliver to this postal code",
        ]
        var CURANCY_UNIT = " SEK"
    }
    else {
        var RESPONSE = ["Skriv in ett postnummer i rutan",
            "Detta är inte ett giltigt postnummer. Försök igen",
            "Ja, detta postnummer kan vi leverera till! Priset för din leverans är ",
            "Tyvärr, vi levererar inte till detta postnummer",
        ]
        var CURANCY_UNIT = " kr"
    }
    if (enteredCode == "") {
        POSTAL_CODE_OUTPUT.textContent = RESPONSE[0];
        return;
    }
    if (isInvalidPostalCode(enteredCode)) {
        POSTAL_CODE_OUTPUT.textContent = RESPONSE[1];
        return;
    }
    let match = ARRAY.find(entry => entry["postal_code"] == enteredCode);
    if (match) { // if match is found
        POSTAL_CODE_OUTPUT.textContent = RESPONSE[2] + match["postal_price"] + CURANCY_UNIT;
        return;
    }
    else {
        POSTAL_CODE_OUTPUT.textContent = RESPONSE[3];
        return;
    }

}

function isInvalidPostalCode(postalCode) {
    return /[a-zA-Z]/.test(postalCode) || !/^\d{5}$/.test(postalCode);
}


export { postalCodeCheck };
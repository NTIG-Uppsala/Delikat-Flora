import { fetchFlowerDelivery } from './fetch.js';

const ARRAY = await fetchFlowerDelivery()
const POSTAL_INPUT = document.querySelector(".postalCodeInput")
const CONFIRM_BUTTON = document.querySelector(".confirmButton")

POSTAL_INPUT.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        postalCodeCheck()
    }
})
CONFIRM_BUTTON.addEventListener("click", postalCodeCheck)

// console.log(ARRAY[0]["postal_code"])

// for (let i = 0; i < ARRAY.length; i++) {
//     console.log(ARRAY[i].postal_code)
// }


function postalCodeCheck() {
    const POSTAL_CODE_OUTPUT = document.querySelector(".postalCodeOutput")

    let enteredCode = POSTAL_INPUT.value.replace(/\s/g, ""); // Sets enteredCode to POSTAL_CODE_INPUT but removes all spaces
    if (document.documentElement.lang === "en") {
        var RESPONSE = ["Enter a postal code in the box",
            "This is not a valid postal code. Please try again",
            "Yes, we can deliver to this postal code! The price for your delivery is ",
            "Unfortunately, we do not deliver to this postal code",
        ]
        var CURANCY_UNIT = " sek"
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
    console.log(ARRAY)
    let match = ARRAY.find(entry => entry["postal_code"] == enteredCode);
    console.log(match)
    if (match) { // if match is found
        POSTAL_CODE_OUTPUT.textContent = RESPONSE[2] + match["postal_price"] + CURANCY_UNIT;
        return;
    }
    else {
        POSTAL_CODE_OUTPUT.textContent = RESPONSE[3];
        return;
    }

}

// function functionName() {
//     return 
// }

function isInvalidPostalCode(postalCode) {
    return /[a-zA-Z]/.test(postalCode) || !/^\d{5}$/.test(postalCode);
}


export { postalCodeCheck };
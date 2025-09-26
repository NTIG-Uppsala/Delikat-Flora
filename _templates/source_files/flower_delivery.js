const ARRAY = await fetchFlowerDelivery(); // fetch data from the database

// create the user interface
const INTERFACE_CONTAINER = document.getElementById("postalCodeChecker");

const POSTAL_CODE_INPUT = document.createElement("INPUT");
POSTAL_CODE_INPUT.className = "postalCodeInput textSmall fontInter";
POSTAL_CODE_INPUT.setAttribute("type", "text");
POSTAL_CODE_INPUT.setAttribute("placeholder", "!!!POSTAL_CODE!!!: XXX XX");
INTERFACE_CONTAINER.appendChild(POSTAL_CODE_INPUT);

const POSTAL_CODE_OUTPUT = document.createElement("DIV");
POSTAL_CODE_OUTPUT.className = "postalCodeOutput textSmall fontInter";
INTERFACE_CONTAINER.appendChild(POSTAL_CODE_OUTPUT);

const CONFIRM_BUTTON = document.createElement("INPUT");
CONFIRM_BUTTON.className = "confirmButton textSmall fontInter";
CONFIRM_BUTTON.setAttribute("type", "button");
CONFIRM_BUTTON.setAttribute("value", "!!!CHECK_POSTAL_CODE!!!");
INTERFACE_CONTAINER.appendChild(CONFIRM_BUTTON);

POSTAL_CODE_INPUT.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        postalCodeCheck();
    }
});
CONFIRM_BUTTON.addEventListener("click", postalCodeCheck);


function postalCodeCheck() {
    POSTAL_CODE_OUTPUT.style.opacity = "0";
    setTimeout(() => { POSTAL_CODE_OUTPUT.style.opacity = "1" }, 200);

    let enteredCode = POSTAL_CODE_INPUT.value.replace(/\s/g, ""); // Sets enteredCode to POSTAL_CODE_INPUT but removes all spaces

    if (enteredCode == "") {
        POSTAL_CODE_OUTPUT.textContent = "!!!ENTER_POSTAL_CODE!!!";
        return;
    }
    if (isInvalidPostalCode(enteredCode)) {
        POSTAL_CODE_OUTPUT.textContent = "!!!INVALID_POSTAL_CODE!!!";
        return;
    }
    let match = ARRAY.find(entry => entry["postal_code"] == enteredCode);
    if (match) { // if match is found
        POSTAL_CODE_OUTPUT.textContent = "!!!ACCEPTED_POSTAL_CODE!!!" + match["postal_price"] + " !!!CURRENCY_UNIT!!!";
        return;
    }
    else {
        POSTAL_CODE_OUTPUT.textContent = "!!!REJECTED_POSTAL_CODE!!!";
        return;
    }

}

function isInvalidPostalCode(postalCode) {
    return /[a-zA-Z]/.test(postalCode) || !/^\d{5}$/.test(postalCode);
}
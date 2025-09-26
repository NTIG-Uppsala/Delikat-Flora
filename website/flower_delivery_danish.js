const ARRAY = await fetchFlowerDelivery(); // fetch data from the database

// create the user interface
const INTERFACE_CONTAINER = document.getElementById("postalCodeChecker");

const POSTAL_CODE_INPUT = document.createElement("INPUT");
POSTAL_CODE_INPUT.className = "postalCodeInput textSmall fontInter";
POSTAL_CODE_INPUT.setAttribute("type", "text");
POSTAL_CODE_INPUT.setAttribute("placeholder", "Postnummer: XXX XX");
INTERFACE_CONTAINER.appendChild(POSTAL_CODE_INPUT);

const POSTAL_CODE_OUTPUT = document.createElement("DIV");
POSTAL_CODE_OUTPUT.className = "postalCodeOutput textSmall fontInter";
INTERFACE_CONTAINER.appendChild(POSTAL_CODE_OUTPUT);

const CONFIRM_BUTTON = document.createElement("INPUT");
CONFIRM_BUTTON.className = "confirmButton textSmall fontInter";
CONFIRM_BUTTON.setAttribute("type", "button");
CONFIRM_BUTTON.setAttribute("value", "Tjek postnummer");
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
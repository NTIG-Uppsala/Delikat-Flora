const POSTAL_INPUT = document.querySelector(".postalCodeInput")

POSTAL_INPUT.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        postalCodeCheck()
    }
})

function postalCodeCheck() {
    const POSTAL_CODE_INPUT = document.querySelector(".postalCodeInput")
    const POSTAL_CODE_OUTPUT = document.querySelector(".postalCodeOutput")

    let postalCodeArray = [
        ["98138", "39 kr"],
        ["98139", "19 kr"],
        ["98140", "39 kr"],
        ["98141", "59 kr"],
        ["98144", "59 kr"],
        ["98145", "69 kr"],
        ["98146", "69 kr"],
        ["98147", "69 kr"],
    ]


    let enteredCode = POSTAL_CODE_INPUT.value.replace(/\s/g, ""); // Sets enteredCode to POSTAL_CODE_INPUT but removes all spaces

    if (enteredCode == "") {
        POSTAL_CODE_OUTPUT.textContent = "Skriv in ett postnummer i rutan";
        return;
    }
    if (isInvalidPostalCode(enteredCode)) {
        POSTAL_CODE_OUTPUT.textContent = "Detta är inte ett giltigt postnummer. Försök igen";
        return;
    }
    let match = postalCodeArray.find(entry => entry[0] === enteredCode);
    if (match) { // if match is found
        POSTAL_CODE_OUTPUT.textContent = "Ja, detta postnummer kan vi leverera till! Priset för din leverans är " + match[1];
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
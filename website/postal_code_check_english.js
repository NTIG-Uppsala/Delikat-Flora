function postalCodeCheck() {
    const POSTAL_CODE_INPUT = document.querySelector(".postalCodeInput")
    const POSTAL_CODE_OUTPUT = document.querySelector(".postalCodeOutput")
    
    let postalCodeArray = [
        ["98138", "39 kr"],
        ["98139", "19 kr"],
        ["98140", "39 kr"],
        ["98141", "59 kr"],
        ["98144", "59 kr"],
        ["98146", "69 kr"],
        ["98145", "69 kr"],
        ["98147", "69 kr"],
    ]

    
        let enteredCode = POSTAL_CODE_INPUT.value.replace(/\s/g, ""); // Sets enteredCode to POSTAL_CODE_INPUT but removes all spaces
        POSTAL_CODE_INPUT.value = "";

        if (enteredCode == "") {
            POSTAL_CODE_OUTPUT.textContent = "Enter a postal code in the box";
            return;
        }    
        if (isInvalidPostalCode(enteredCode)) {
            POSTAL_CODE_OUTPUT.textContent = "This is not a valid postal code. Please try again";
            return;
        }
        let match = postalCodeArray.find(entry => entry[0] === enteredCode);
        if (match) { // if match is found
            POSTAL_CODE_OUTPUT.textContent = "Yes, we can deliver to this postal code! The price for your delivery is " + match[1];
            return;
        }               
        else {
            POSTAL_CODE_OUTPUT.textContent = "Unfortunately, we do not deliver to this postal code";
            return;
        }
          
}

function isInvalidPostalCode(postalCode) {
    return /[a-zA-Z]/.test(postalCode) || !/^\d{5}$/.test(postalCode);
}
function onDropDownButtonClick() {
    const MENU = document.querySelector(".dropDownMenu");
    MENU.classList.toggle("show");

    window.onclick = function (event) {
        if (!event.target.matches('.dropButton')) {
            var dropdowns = document.getElementsByClassName("dropDownMenu");
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}
function flagDropDown() {
    const MENU = document.querySelector(".flagDropDownMenu");
    MENU.classList.toggle("show");

    window.onclick = function (event) {
        if (!event.target.matches('.flagDropDown')) {
            var dropdowns = document.getElementsByClassName("flagDropDownMenu");
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

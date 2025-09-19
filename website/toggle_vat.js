function toggleVAT() {


    const VAT_CHECKBOX = document.getElementById("toggleVAT");
    const PRICE_SPANS = document.querySelectorAll(".priceTag span");

    const VAT_RATE = 0.25;

    // sets an attribute to the original price of every separate product
    PRICE_SPANS.forEach(span => {
        let price = parseFloat(span.textContent.trim());
        if (!isNaN(price)) {
            span.dataset.originalPrice = price;
        }
    })

    // checks if the vatcheckbox has been previously checked
    if (document.cookie == 1) {
        VAT_CHECKBOX.checked = true;
        PRICE_SPANS.forEach(span => {
            let originalPrice = parseFloat(span.dataset.originalPrice);
            if (!isNaN(originalPrice)) {
                let priceWithoutVAT = (originalPrice / (1 + VAT_RATE)).toFixed(0);
                span.textContent = priceWithoutVAT;
            }
        })
    }

    // is run everytime the vatcheckbox is checked/unchecked
    VAT_CHECKBOX.addEventListener("change", function () {
        PRICE_SPANS.forEach(span => {
            let originalPrice = parseFloat(span.dataset.originalPrice);
            if (!isNaN(originalPrice)) {
                if (VAT_CHECKBOX.checked) {
                    let priceWithoutVAT = (originalPrice / (1 + VAT_RATE)).toFixed(0);
                    span.textContent = priceWithoutVAT;
                    document.cookie = "1";
                }

                else {
                    span.textContent = originalPrice;
                    document.cookie = "0";
                }
            }
        })
    })
}
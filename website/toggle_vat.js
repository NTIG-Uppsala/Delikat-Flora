document.addEventListener("DOMContentLoaded", function() {
    const VAT_CHECKBOX = document.getElementById("toggleVAT");
    const PRICE_SPANS = document.querySelectorAll(".priceTag span");

    const VAT_RATE = 0.25;

    PRICE_SPANS.forEach(span => {
        let price = parseFloat(span.textContent.trim());
        if (!isNaN(price)) {
            span.dataset.originalPrice = price;
        }
    });

    VAT_CHECKBOX.addEventListener("change", function(){
        PRICE_SPANS.forEach(span => {
            let originalPrice = parseFloat(span.dataset.originalPrice);
            if (!isNaN(originalPrice)) {
                if (VAT_CHECKBOX.checked) {
                    let priceWithoutVAT = (originalPrice / (1 + VAT_RATE)).toFixed(0);
                    span.textContent = priceWithoutVAT;
                }
                
                else {
                    span.textContent = originalPrice;
                }
            }
        });
    });
});
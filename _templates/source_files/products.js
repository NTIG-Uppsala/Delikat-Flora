async function createProducts() {
    const ARRAY = await fetchProducts()

    for (let i = 0; i < ARRAY.length; i++) {
        // Create product elements
        const PRODUCT_DIV = document.createElement('div')
        const PRODUCT_IMAGE = document.createElement('img')
        const PRODUCT_NAME = document.createElement('div')
        const PRODUCT_PRICE_TAG = document.createElement('div')
        const PRODUCT_PRICE = document.createElement('span')

        // If the product is a min price product, add "From:" before the price
        if (ARRAY[i].is_min_price) {
            const PRODUCT_MIN_PRICE = document.createElement('div')
            PRODUCT_MIN_PRICE.className = 'textGreyish'
            PRODUCT_MIN_PRICE.textContent = `!!!FROM!!!:`
            PRODUCT_PRICE_TAG.appendChild(PRODUCT_MIN_PRICE)
        }

        // Assigns classes 
        PRODUCT_DIV.className = 'product'
        PRODUCT_NAME.className = 'productDescription'
        PRODUCT_PRICE_TAG.className = 'priceTag'

        // Set product name and currency unit 
        PRODUCT_NAME.textContent = ARRAY[i]["!!!PRODUCT_NAME!!!"]
        var unit = document.createTextNode("!!!CURRENCY_UNIT!!!")

        // Assigns product price and image
        PRODUCT_PRICE.textContent = ARRAY[i].product_price
        PRODUCT_IMAGE.src = ARRAY[i].product_image

        // Appends elements to the DOM
        PRODUCT_DIV.appendChild(PRODUCT_IMAGE)
        PRODUCT_DIV.appendChild(PRODUCT_NAME)
        PRODUCT_PRICE_TAG.appendChild(PRODUCT_PRICE)
        PRODUCT_PRICE_TAG.appendChild(unit)
        PRODUCT_DIV.appendChild(PRODUCT_PRICE_TAG)
        document.getElementsByClassName('productsPage')[0].appendChild(PRODUCT_DIV)
    }
    toggleVAT()
}

createProducts()
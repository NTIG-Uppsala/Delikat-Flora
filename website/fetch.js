const supabaseUrl = window._env_.DATABASE_URL
const supabaseKey = window._env_.DATABASE_ANON_KEY

async function fetchProducts(selection = '*') {
    // fetch the data from the database
    let response = await fetch(supabaseUrl + '/rest/v1/products?select=' + selection, {
        headers: {
            'apikey': supabaseKey,
        }
    })
    // convert the response to a sorted JSON-object
    let data = await response.json()
    data.sort((a, b) => a.id - b.id)

    return data
}

async function fetchFlowerDelivery(selection = '*') {
    let response = await fetch(supabaseUrl + '/rest/v1/flower_delivery?select=' + selection, {
        headers: {
            'apikey': supabaseKey,
        }
    })
    // convert the response to a sorted JSON-object
    let data = await response.json()
    data.sort((a, b) => a.id - b.id)

    return data
}
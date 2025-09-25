import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = window._env_.DATABASE_URL
const supabaseKey = window._env_.DATABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchProducts(selection = '*') {
    const { data, error } = await supabase
        .from('products')
        .select(selection)
        .order('id', { ascending: true })

    if (error) {
        console.error('Error fetching data:', error)
    } else {
        return data
    }
}

async function fetchFlowerDelivery(selection = '*') {
    const { data, error } = await supabase
        .from('flower_delivery')
        .select(selection)

    if (error) {
        console.error('Error fetching data:', error)
    } else {
        console.log('Postal Codes:', data)
        return data
    }
}

export { fetchProducts, fetchFlowerDelivery }
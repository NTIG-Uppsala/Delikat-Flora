import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://hotzrgakccdxkxyqacrh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdHpyZ2FrY2NkeGt4eXFhY3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMTAwMjgsImV4cCI6MjA3MzY4NjAyOH0.A8QAEstR5AmsN8PwA1_W5jcn5u-ull1PbZObf1GEaus'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')


    if (error) {
        console.error('Error fetching data:', error)
    } else {
        console.log('Products:', data)
    }
}

async function fetchFlowergram() {
    const { data, error } = await supabase
        .from('flower_delivery')
        .select('*')


    if (error) {
        console.error('Error fetching data:', error)
    } else {
        console.log('Postal Codes:', data)
    }
}

export { fetchProducts, fetchFlowergram }
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config()
const SUPABASE = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function fetchProducts() {
    let { data, error } = await SUPABASE
        .from('products')
        .select('*')
        .order('id')
    return { data, error };
}

console.log(await fetchProducts());
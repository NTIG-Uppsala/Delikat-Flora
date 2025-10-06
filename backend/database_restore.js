import express from 'express'
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const SUPABASE = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

const originalProducts =
    [
        {
            product_name: '10 Tulpaner',
            product_name_eng: '10 Tulips',
            product_price: 100,
            product_image: 'https://hotzrgakccdxkxyqacrh.supabase.co/storage/v1/object/public/product_images/tulips_10pack.jpg',
            is_min_price: false,
            product_name_dan: '10 Tulipaner',
            day_of_discount: [
                1,
                2,
                4
            ],
            discount_price: 89
        },
        {
            product_name: '10 Rosor',
            product_name_eng: '10 Roses',
            product_price: 150,
            product_image: 'https://hotzrgakccdxkxyqacrh.supabase.co/storage/v1/object/public/product_images/roses_10pack.jpg',
            is_min_price: false,
            product_name_dan: '10 Roser',
            day_of_discount: [
                3,
                5,
                6
            ],
            discount_price: 129
        },
        {
            product_name: 'Höstbukett',
            product_name_eng: 'Autumn Bouquet',
            product_price: 400,
            product_image: 'https://hotzrgakccdxkxyqacrh.supabase.co/storage/v1/object/public/product_images/autumn_bouquet.jpg',
            is_min_price: true,
            product_name_dan: 'Efterårsbuket',
            day_of_discount: null,
            discount_price: null
        },
        {
            product_name: 'Begravningskrans',
            product_name_eng: 'Funeral Wreath',
            product_price: 800,
            product_image: 'https://hotzrgakccdxkxyqacrh.supabase.co/storage/v1/object/public/product_images/funeral_wreath.jpg',
            is_min_price: true,
            product_name_dan: 'Begravelseskrans',
            day_of_discount: null,
            discount_price: null
        },
        {
            product_name: 'Bröllopsbukett',
            product_name_eng: 'Wedding Bouquet',
            product_price: 1200,
            product_image: 'https://hotzrgakccdxkxyqacrh.supabase.co/storage/v1/object/public/product_images/wedding_bouquet.jpg',
            is_min_price: true,
            product_name_dan: 'Bryllupsbuket',
            day_of_discount: null,
            discount_price: null
        },
        {
            product_name: 'Sommarbukett',
            product_name_eng: 'Summer Bouquet',
            product_price: 200,
            product_image: 'https://hotzrgakccdxkxyqacrh.supabase.co/storage/v1/object/public/product_images/summer_bouquet.jpg',
            is_min_price: true,
            product_name_dan: 'Sommerbuket',
            day_of_discount: null,
            discount_price: null
        },
        {
            product_name: 'DEVPRODUCT',
            product_name_eng: 'DEVPRODUCT',
            product_price: 10000,
            product_image: 'https://hotzrgakccdxkxyqacrh.supabase.co/storage/v1/object/public/product_images/mysterybox.png',
            is_min_price: false,
            product_name_dan: 'DEVPRODUCT',
            day_of_discount: [
                0
            ],
            discount_price: 1111
        },
    ]

const originalFlowerDelivery =
    [
        {
            postal_code: 98138,
            postal_price: 39
        },
        {
            postal_code: 98139,
            postal_price: 19
        },
        {
            postal_code: 98140,
            postal_price: 39
        },
        {
            postal_code: 98141,
            postal_price: 59
        },
        {
            postal_code: 98144,
            postal_price: 59
        },
        {
            postal_code: 98145,
            postal_price: 69
        },
        {
            postal_code: 98146,
            postal_price: 69
        },
        {
            postal_code: 98147,
            postal_price: 69
        },
        {
            postal_code: 98146,
            postal_price: 69
        },
        {
            postal_code: 98147,
            postal_price: 69
        }
    ]


if (process.env.IS_DEV_SERVER) {
    // Clear the current database and insert the original data
    await SUPABASE.from('flower_delivery').delete().neq("id", 0);
    await SUPABASE.from('flower_delivery').insert(originalFlowerDelivery);
    await SUPABASE.from('products').delete().neq("id", 0);
    await SUPABASE.from('products').insert(originalProducts);

    console.log('Database successfully restored')
} else {
    console.log('Cannot restore database on production server')
}
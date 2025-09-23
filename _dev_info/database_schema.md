# Database schema

This project uses a PostgreSQL database.  
Below is the schema definition for the tables.

```sql
Table products {
  id int8 PRIMARY KEY
  product_name varchar
  product_name_eng varchar
  product_price int4
  is_min_price bool
  product_image text
}

Table flower_delivery {
  id int8 PRIMARY KEY
  postal_code int4
  postal_price int4
}
```
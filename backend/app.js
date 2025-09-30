const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    console.log(req)
    res.send('Hello World from express!' + req)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
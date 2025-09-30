const express = require('express')
const app = express()
const port = 8080

app.get('/admin', (req, res) => {
    res.send('Hello World from express!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
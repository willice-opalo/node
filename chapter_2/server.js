//http://localhost:8383
const express = require('express')
const app = express()
const PORT = 8383

app.get('/', (req, res) => {
    console.log('Hello opalo nodemon.js', req.method)
    // res.sendStatus(201)
    // res.status(201).send('Internal Server Erroreee')
})

app.get('/dashboard', (req, res) => {
    console.log('We have the dashboard now chief', req.method)
    res.send('hello dashboard')
    // res.status(201).send('Internal Server Erroreee')
})

app.listen(PORT, () => console.log(`server has started on the ${PORT}`))
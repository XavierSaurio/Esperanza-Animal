const express = require('express')
const app = express()
const port = 3000

app.get('/',(req, res)=>{
    res.send({
        data: 'hola mundo'
    })
})

app.listen(port, ()=>{
    console.log('La aplicacion esta en linea')
})
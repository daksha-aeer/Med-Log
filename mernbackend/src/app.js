const express = require('express')
const app = express()
const path = require('path')

require('./db/conn')

const port = process.env.PORT || 9999

app.use(express.static(path.join(__dirname, '../public')))

// app.get('/', (req,res) => {
//     res.send('hello')
// })

app.listen(port, ()=> {
    console.log('Server up at 9999')
})
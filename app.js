const express = require('express');
const app = express();
const PORT = process.env.PORT || 3700;


app.get('/', (req, res) => {
    res.json({
        apiVersion: '0.0.1-alpha'
    })
})


app.listen(PORT, () => {
    console.log('escutando a porta ' + PORT);
})
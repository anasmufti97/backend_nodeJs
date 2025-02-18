const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();



app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send('Hello World! with cookie parser');
});



app.get('/cookie', (req, res) => {
res.cookie('name', 'mufti').send('cookie set');

});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
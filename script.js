const express = require('express');
const app = express();

const userModel = require('./models/userModel');

app.use(function (req, res, next) {
    console.log("Middle wareworking");
    next();

});

// app.get('/', (req, res) => {
//     res.send('Hello World! with nodemon');
// });

// app.get('/:username', (req, res) => {
//     res.send(req.params.username);

// });

app.get('/createUser', async (req, res) => {
    let user = await userModel.create({
        name: 'anas anas 2',
        age: 25,
        email: "anasmufti123@gmail.com"
    })
    res.send(user);
}
);


app.get('/read', async (req, res) => {
    let user = await userModel.find();
    res.send(user);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
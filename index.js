const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usersRouter = require('./routes/user');
const groupsRouter = require('./routes/group');

const app = express();

app.use(express.json());
const port = 4000;

app.use(
    cors({
        origin : ["http://localhost:3000"],
        // origin : true,
        methods : 'GET, POST, OPTIONS',
        credentials : true,
    })
);

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(201).send('자 이제 시작 이 야 내 꿈을 내 꿈을 위 한 여행 피 캬츄')
})
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.listen(port, () => {
    console.log('서버가 작 동 중.')
})
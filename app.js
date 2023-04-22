const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/uni_web_volenteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: false,
});
// 这是一个注释
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.use(express.json());
app.all("*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader("Access-Control-Allow-Origin", '*')
  res.setHeader("Access-Control-Allow-Methods", 'POST, GET, OPTIONS, DELETE, PUT')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since")
  next()
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send(Result.error('该用户名已存在'));
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).send(Result.success('注册成功'));
  } catch (error) {
    res.status(500).send(Result.error('服务器错误'));
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send(Result.error('用户名不存在'));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send(Result.error('账号或者密码错误'));
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key');

    res.send(Result.success({ token, ...user.toJSON() }));
  } catch (error) {
    res.status(500).send(Result.error('服务器错误'));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const tasksRouter = require('./routes/tasks');
const Result = require('./res');

app.use('/tasks', tasksRouter);

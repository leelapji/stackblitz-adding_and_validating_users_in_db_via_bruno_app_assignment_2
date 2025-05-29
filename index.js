const express = require('express');
const { resolve } = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const users = [
  {
    email: 'john@example.com',
    password: '123456'
  }
];

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  res.status(200).json({ message: 'Login successful!' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

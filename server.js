import { put, get } from '@vercel/blob';
import express from 'express';

const app = express();
app.use(express.json());

// Get all users
app.get('/user', async (req, res) => {
  const blob = await get('users.json');
  const users = blob ? JSON.parse(blob.body.toString()) : [];
  res.json(users);
});

// Add a new user
app.post('/user', async (req, res) => {
  const blob = await get('users.json');
  const users = blob ? JSON.parse(blob.body.toString()) : [];
  users.push(req.body);
  await put('users.json', JSON.stringify(users));
  res.status(201).json({ message: 'User added successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
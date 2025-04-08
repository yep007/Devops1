const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 5000;

app.get('/api/todos', (req, res) => {
  res.json({ todos: ['Learn DevOps', 'Build a Pipeline'] });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

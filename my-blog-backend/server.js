require('dotenv').config();

const app = require('./src/app');

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

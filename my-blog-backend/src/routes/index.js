const express = require('express');
const articlesRouter = require('./articles');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/articles', articlesRouter);

module.exports = router;

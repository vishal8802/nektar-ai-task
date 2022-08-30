const express = require('express');
const { fetchLogs } = require('./logService');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const { startTime, endTime, keyword } = req.query;
  if (startTime && endTime && endTime < startTime)
    return res.status(400).send('Invalid time range');
  const logs = await fetchLogs({ startTime, endTime, keyword });
  return res.status(200).send(logs);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const express = require('express');
const { fetchLogs } = require('./logService');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const { startTime, endTime, keyword } = req.query;
    if (startTime && endTime && endTime < startTime)
      return res
        .status(400)
        .send('Invalid time range, startTime exceeding endTime');
    const logs = await fetchLogs({ startTime, endTime, keyword });
    return res.status(200).send(logs);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

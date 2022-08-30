const fs = require('fs');
const readline = require('readline');
const { dirname } = require('path');

const rootDir = dirname(require.main.filename);
const logFilePath = `${rootDir}/logs.txt`;

const fetchLogs = async ({ startTime, endTime, keyword }) => {
  return new Promise((resolve) => {
    const reader = readline.createInterface({
      input: fs.createReadStream(logFilePath),
    });
    let logs = [];
    reader.on('line', (line) => {
      /* 
        WORKING: 
          0. checking with keyword if provided, else continuing with other checks
          1.startTime and endTime not given - push to array
          2.startTime and endTime given - check time range
            if current line exceeds endTime, close reader
          3.startTime is given - check with startTime
          4.endTime is given - check with endTime
            if current line exceeds endTime, close reader
      */
      if (!keyword || line.match(new RegExp(`${keyword}`, 'i'))) {
        if (!startTime && !endTime) logs.push(line);
        else if (startTime && endTime) {
          const logTime = line.substring(0, 24);
          if (logTime >= startTime && logTime <= endTime) logs.push(line);
          else if (logTime > endTime) reader.close();
        } else if (startTime) {
          const logTime = line.substring(0, 24);
          if (logTime >= startTime) logs.push(line);
        } else if (endTime) {
          const logTime = line.substring(0, 24);
          if (logTime <= endTime) logs.push(line);
        }
      }
    });
    reader.on('close', (data) => {
      reader.removeAllListeners();
      resolve(logs);
    });
  });
};

// fetchLogs({});

module.exports = { fetchLogs };

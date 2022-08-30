# LOG Fetch

## API Reference

#### Get logs

```http
  GET /
```

| Parameter   | Type     | Description        |
| :---------- | :------- | :----------------- |
| `startTime` | `string` | Start time of logs |
| `endTime`   | `string` | End time of logs   |
| `keyword`   | `string` | Keyword to search  |

## Examples

https://naktar-ai-task.herokuapp.com

https://naktar-ai-task.herokuapp.com?startTime=2020-01-01T00:02:43.327Z&endTime=2020-01-01T00:30:17.713Z

https://naktar-ai-task.herokuapp.com?startTime=2020-01-01T00:30:17.713Z&endTime=2020-01-01T00:02:43.327Z (Bad request Error)

https://naktar-ai-task.herokuapp.com?keyword=35.18.253.99

## Working

1. checking with keyword if provided, else continuing with other checks
2. startTime and endTime not given - push to array
3. startTime and endTime given - check time range, If current line exceeds endTime, close reader
4. startTime is given - check with startTime
5. endTime is given - check with endTime, If current line exceeds endTime, close reader

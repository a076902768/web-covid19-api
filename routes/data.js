var express = require('express');
const request = require('request');
const { SERVER } = require('../assets/js/api/apiConfig');
var router = express.Router();

router.post('/', function (req, res, next) {
  const reqBody = req.body
  const reqQuery = req.queries
  console.log('reqBody: ', reqBody);

  const { page, city, startDt, endDt } = reqBody;
  const startIndex = (page - 1) * 10;
  let endIndex = (page - 1) * 10 + 9;

  const startDate = new Date(startDt).getTime();
  const endDate = new Date(endDt).getTime();


  let url = '';

  if (city) {
    url = `${SERVER}&limited=${encodeURI(city)}`
  } else {
    url = `${SERVER}`
  }

  const dataDateFilter = (body) => {
    let data = []
    data = JSON.parse(body).filter((e) => {
      const time = new Date(e.a02).getTime();
      return time >= startDate && (time <= endDate || !endDate)
    })
    return JSON.stringify(data);
  };

  request(url, (err, body) => {
    const data = [];
    if (startDate || endDate) {
      body.body = dataDateFilter(body.body);
    }
    for (let i = startIndex; i <= endIndex; i++) {
      data.push(JSON.parse(body.body)[i])
    }

    res.json({
      code: body.statusCode,
      data: {
        content: data,
        totalElement: JSON.parse(body.body).length
      }
    })
  });
});


module.exports = router;

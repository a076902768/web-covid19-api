var express = require('express');
const request = require('request');
var router = express.Router();

router.post('/', function (req, res, next) {
  const reqBody = req.body
  const reqQuery = req.queries
  console.log('reqBody: ', reqBody);

  const { page, city } = reqBody;
  const startIndex = (page - 1) * 10;
  const endIndex = (page - 1) * 10 + 9;

  let url = '';

  if (city) {
    url = `https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5001&limited=${encodeURI(city)}`
  } else {
    url = 'https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5001'
  }

  request(url, (err, body) => {
    const data = [];
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

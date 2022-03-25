var express = require('express');
const cityList = require('../jsonData/cityList.json');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json({
    code: 200,
    data: cityList
  })

});

module.exports = router;

const express = require('express');
const router = express.Router();

const {listSearch} = require('../controllers/mercari');


router.get('/rakuten/search', listSearch);




module.exports = router;

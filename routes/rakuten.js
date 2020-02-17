

const express = require('express');
const router = express.Router();

const {listSearch, productDetails} = require('../controllers/rakuten');

router.get('/rakuten/search', listSearch);
// router.get('/rakuten/product', productDetails);

module.exports = router;

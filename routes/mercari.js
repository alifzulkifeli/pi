const express = require('express');
const router = express.Router();

const {listSearch, productDetails} = require('../controllers/mercari');


router.get('/mercari/search', listSearch);
router.get('/mercari/product', productDetails);




module.exports = router;


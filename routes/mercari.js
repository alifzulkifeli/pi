const express = require('express');
const router = express.Router();

const {listSearch} = require('../controllers/mercari');


router.get('/mercari/search', listSearch);




module.exports = router;


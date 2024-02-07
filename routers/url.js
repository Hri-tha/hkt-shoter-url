const express = require('express'); 
const router = express.Router(); 
const {handleGenerateNewShortURL,hanleGetAnalytics} = require('../controlles/url')

router.post("/",handleGenerateNewShortURL); 
router.get('/analytics/:shortId',hanleGetAnalytics)
module.exports = router; 
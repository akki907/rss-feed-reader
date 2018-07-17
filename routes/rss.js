const express = require('express');
const router = express.Router();
let Parser = require('rss-parser');



// @route   POST api/rss
// @desc    Get rss
// @access  Public
router.post('/', async (req, res) => {
    if (!req.body.url) return res.json({
        success: false,
        message: 'Please provide a url'
    })
    let parser = new Parser();
    parser.parseURL(req.body.url, function (err, feed) {
        if (err) return res.json({
            success: false,
            message: 'Not a rss link.'
        })
        res.json({
            success: true,
            feed,
            message: 'Rss found.'
        })
    });


});



module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */

/**
 * @swagger--
 * /:
 *   get:
 *     summary: Sample
 *     responses:
 *       200:
 *         description: Title with express
 */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

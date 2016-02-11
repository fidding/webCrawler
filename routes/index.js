var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var proxy = require('../proxylist.js');
var url = 'https://segmentfault.com/blogs';
var content = [];
var page = 1;

function getSFData(res){
    var target = url + '?page=' + page;
    request({'url': target, 'method': 'GET'}, function (error, response, body) {
        console.log(target);
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var titleP = $('h2.title');
            var titleLength = titleP.length;
            if(titleLength == 0){
                return res.json(content);
            }
            for (var i = 0; i < titleLength; i++) {
                var title = titleP[i];
                var a = $(title).find('a');
                var c = {};
                c.title = a.text();
                c.url = a.attr('href');
                content.push(c);
            }
            page++;
            getSFData(res);
        }
    })    
} 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{ title: '爬虫'})
});
/**
 * 爬取segmentfault的所有文章标题以及地址
 */
router.get('/sfArticle', function(req, res, next) {
    getSFData(res);
    
});

module.exports = router;

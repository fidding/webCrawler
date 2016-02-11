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
/**
 * 爬取头条Ajax数据
 */
router.get('/wb', function(req, res, next){
    //var target = 'http://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100808&feed_sort=timeline&feed_filter=timeline&pre_page=1&page=1&max_id=&end_id=3937770332560579&pagebar=1&filtered_min_id=&pl_name=Pl_Third_App__9&id=10080869259994a47a0519a2379f01e33b754e&script_uri=/p/10080869259994a47a0519a2379f01e33b754e&feed_type=1&tab=home&current_page=2&since_id=%7B%22last_since_id%22%3A3935516690898763%2C%22res_type%22%3A1%2C%22next_since_id%22%3A3932341589831409%7D&domain_op=100808&__rnd=1455181668022';
    var target = 'http://toutiao.com/api/article/recent/?source=2&count=20&category=news_tech&max_behot_time=1455182922&utm_source=toutiao&offset=0&max_create_time=1455185263&_=1455189964228';
    request({'url': target, 'method': 'GET'}, function (error, response, body) {
        //console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            //var $ = cheerio.load(body);
            //var a =$('h1.username');
            var body = JSON.parse(body);
            console.log(body);
            res.json(body.data);
            
        }
    })   
})

module.exports = router;

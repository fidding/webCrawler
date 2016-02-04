var publicDir = __dirname + '/public/';
var uploadDir = __dirname + '/uploads/';

module.exports = {

    //Basic set
    name            : 'webCrawler',
    title           : '网络爬虫',
    version         : 'V1.0.0',
    key             : 'webCrawler',
    port            : 3333,

    //Paht set

    cssDir          : publicDir + 'stylesheets/',               //css路径
    jsDir           : publicDir +  'javascripts/',              //js路径
    imgDir          : publicDir +  'images/',                   //img路径




    //Database set
    mongoUrl       : 'mongodb://localhost/webCrawler',          //mongodb连接

};
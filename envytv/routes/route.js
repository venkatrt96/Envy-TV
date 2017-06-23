const express = require('express');
const router = express.Router();

const request = require('request');
const cheerio = require('cheerio');

var justlinks = [];
var dlinks = [{
    title: '',
    body: ''
}];

router.get('/links', function(request, response, next) {
    response.send(dlinks);
});

router.post('/task', function(request, response, next) {
    var task = request.body;
    if (!task.name) {
        response.status(400);
        response.json({
            "error": "Bad Data"
        });
    }
    else {
        //response.json(task);
        
        var urls = ["http://watch-free-movies-streaming.com/novamov.php",
            "http://vidzi.me/category/movies/",
            "http://www.pelispedia.tv/",
            "https://flixanity.online/",
            "http://cmovieshd.com/tag/xmovies8com/", 
            "https://yesmovies.to/",
            "http://tamilrockers.net.in/", 
            "https://tamilrockers.co/",
            "http://m4ufree.info/year-2017", 
            "http://mvgee.com/",
            "http://vumoo.li/", 
            "http://www.dizibox1.com/",
            "https://gomovies.es/"];
        var item = task.name;
        response.send(item);

        for (var i = 0; i < urls.length; i++) {
            Scrap(urls[i], item);
        }
    }
});

function Scrap(url, key){
    request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("Status code : " + response.statusCode);

        var $ = cheerio.load(body);

        $('a').each(function(index) {
        var text = $(this).text().trim();
        var link = $(this).attr('href');
        try {
            if (link.charAt(0) == '/') {
            link = url + link;
            }

            if (text.indexOf(key) != -1) {
                var what = true;
                for (var index = 0; index < justlinks.length; index++) {
                    if (justlinks[index] == link) {
                        what = false;
                    }             
                }
                if (what == true) {
                    var temp = {
                        title: '',
                        body: link
                    } 
                    justlinks.push(link);
                    dlinks.push(temp);
                }
            }

            if (link.charAt(0) != '/') {
                Scrap(link, key);
            }
        }
        catch (e) {

        }

        });
    }
    });
}

module.exports = router;

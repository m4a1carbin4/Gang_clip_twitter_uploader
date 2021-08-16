var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    xmlparser = require('express-xml-bodyparser'),
    PORT = 8000;

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'hidden',
    consumer_secret: 'hidden',
    access_token_key: 'hidden',
    access_token_secret: 'hidden'
});

app.use(express.json());
app.use(express.urlencoded());
app.use(xmlparser());

function tweetPost(content) {
    client.post('statuses/update',{status: content},function(error, tweet,response){
        if(!error){
            console.log("tweet succes: "+ content);
        }else{
            console.log(error);
        }
    });
}

app.get("/hook", (req,res) => {

    const responseText = req.query['hub.challenge'];

    res.send(responseText);
    res.status(200).end('hello pubsubhubbub');
    console.log('get 200 succes');

})

app.post("/hook", function(req,res) {
    const responseText = req.query['hub.challenge'];

    var title = req.body.title;
    var data = req.body;

    res.send(responseText);
    res.status(200).end('hello pubsubhubbub');

    console.log('post 200 succes');

    var entry_data = data.feed.entry;

    var videoid;
    var videotitle;

    var video_link;

    if(entry_data){

        videoid = entry_data[0]['yt:videoid'];
        videotitle = entry_data[0]['title'];
        video_link = "https://youtu.be/"+videoid[0];

        console.log(videoid);
        console.log(videotitle);
        console.log(video_link);

        var tweet_string = videotitle[0]+'\n'+video_link + '\n\n #GZzcliptag';

        console.log(tweet_string);
    
        tweetPost(tweet_string);

    }else{
        console.log("data error!");
    }

})

app.listen(PORT, () => console.log("server now running on 8000"));
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'hidden',
    consumer_secret: 'hidden',
    access_token_key: 'hidden',
    access_token_secret: 'hidden'
});

function tweetPost(content) {
    client.post('statuses/update',{status: content},function(error, tweet,response){
        if(!error){
            console.log("tweet succes: "+ content);
        }else{
            console.log(error);
        }
    });
}

tweetPost("testting now....");
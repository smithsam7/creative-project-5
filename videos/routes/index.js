var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/videoDB', { useNewUrlParser: true }); 

var videoSchema = mongoose.Schema({ 
    Name: String,
    Video: String
});

var Video = mongoose.model('Video', videoSchema); 

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() { 
    console.log('Connected');
});



router.post('/video', function(req, res, next) {
    console.log("POST video route");
    console.log(req.body);
    var newvideo = new Video(req.body);
    newvideo.save(function(err, post) {
        if (err) {
            return console.error("Got Error " + err);
        }
        else {
            console.log("Saved Worked!");
            console.log(post);
            res.sendStatus(200);
        }
    });
});


router.get('/video', function(req, res, next) {
    console.log("In the GET route");
    console.log(req.query);
    var nameRequested = req.query['q'];
    console.log(nameRequested);
    var obj = {}; 
    if(nameRequested){
        obj = {Name: nameRequested};
    }
    Video.find(obj, function(err, videoList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(videoList);
            res.json(videoList);
            //Otherwise console log the comments you found
        }
    });
});

router.delete('/video', function(req,res,next) {
	console.log("delete");
	Video.remove(function(err) {
		if(err) return console.error(err);	
		else {
			console.log("Delete worked");
			res.sendStatus(200);
		}
	});
});

module.exports = router;

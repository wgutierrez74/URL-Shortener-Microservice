var validUrl = require('valid-url');
//var db = require("./database.js");
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://will:gutierrez@ds125623.mlab.com:25623/fcc-backend';


module.exports = function(app){
  
  
  app.route("/").get(function(req, res){
    res.sendFile(process.cwd() + '/views/index.html');
  });
  
  
  
  
  app.route("/https://:query").get(function(req, res){
    
    //Validate URL; If good proceed
    var long = "https://"+req.params.query;
   
    
    if(validUrl.isUri(long)){
      
      var short;
      
      MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            var collection = db.collection('short-urls');
    
            var cursor = collection.find({"real-URL": long})
            if(cursor.toArray().length == 0){
               //Add long to db, create short, insert into db return short
              short="Naww";
            }
            else{
              short = cursor.toArray()[0]["short-URL"];
            }
            
            
            var json = {
              "Original URL": long,
              "Short URL": short
            };
            res.send(json);
            db.close();
      }
  
    });
      
      
      
      //res.send(json);
      
    }
    else{
      
      res.send("Not a valid url")
      
    }
    
  });
  
  
};
    
  
  
  
  
  

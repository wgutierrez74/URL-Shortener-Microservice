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
  
  
  
  
  app.route("/https://:url").get(function(req, res){
    
    //Validate URL; If good proceed
    var long = "https://"+req.params.url;
   
    
    if(validUrl.isUri(long)){
      
      
      
      MongoClient.connect(url, function (err, db) {
        if (err) {
          res.send("Error connecting");
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
           //res.send("connected1");
            var collection = db.collection('short-urls');
            
            var cursor = collection.find({"real-url": long})
            cursor.toArray(function(err, docs){
              var short;
              if(docs.length == 0){
               //Add long to db, create short, insert into db return short
               //res.send("connected2");
              collection.count({}, function(err, count){
                short="https://wg-url-shortener.glitch.me/"+(count+1);
                collection.insert({"real-url": long, "short-url": short});
                var json = {
              "Original URL": long,
              "Short URL": short
              };
            res.send(json);
            db.close();
              });
              //db.insert({"real-url": long, "short-url": "https://wg-url-shortener.glitch.me/"+addon});
              //short="https://wg-url-shortener.glitch.me/"+addon;
              
            }
            else{
              short = docs[0]["short-url"];
              var json = {
              "Original URL": long,
              "Short URL": short
              };
            res.send(json);
            db.close();
             
            }
            
            
            
              
              
            });
      }
  
    });
      
      
  
      
    }
    else{
      
      res.send("Not a valid url")
      
    }
    
  });
  
  
  app.route("/:num").get(func)
  
  
};
    
  
  
  
  
  

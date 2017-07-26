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
   
    
    if(validateURL(long)){
      
      
      
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
  
  
  
  app.route("/http://:url").get(function(req, res){
    
    //Validate URL; If good proceed
    var long = "http://"+req.params.url;
   
    
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
  
  
  
  
  app.route("/:num").get(function(req, res){
    var num = req.params;
    res.send(req.params);
    var loc = "https://wg-url-shortener.glitch.me/"+num;
    res.send(loc);
     MongoClient.connect(url, function (err, db) {
        if (err) {
          res.send("Error connecting");
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          var collection = db.collection("short-urls");
          collection.find({"short-url": loc}).toArray(function(err, doc){
            if(doc.length==0){
              res.send("Not a valid path");
              db.close();
            }
            else{
              res.send(doc[0]["real-url"]);
              //res.redirect(301, doc[0]['real-url']);
              db.close();
            }
          })
        }
       
     });
    
  });
  
  
  function validateURL(url) {
    // Checks to see if it is an actual url
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }
  
  
  
};
    
  
  
  
  
  

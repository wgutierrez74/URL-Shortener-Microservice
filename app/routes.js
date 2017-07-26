var validUrl = require('valid-url');
var db = require("./database.js");


module.exports = function(app){
  
  
  app.route("/").get(function(req, res){
    res.sendFile(process.cwd() + '/views/index.html');
  });
  
  
  
  
  app.route("/https://:query").get(function(req, res){
    
    //Validate URL; If good proceed
    var long = "https://"+req.params.query;
    //res.send(long);
   
    
    if(validUrl.isUri(long)){
      
      var short = db(long).returnURL(long);
      
      var json = {
        "Original URL": long,
        "Short URL": short
      };
      
      res.send(json);
      
    }
    else{
      
      res.send("Not a valid url")
      
    }
    
  });
  
  
};
    
  
  
  
  
  

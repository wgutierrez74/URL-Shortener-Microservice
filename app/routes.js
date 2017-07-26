


module.exports = function(app){
  
  
  app.route("/").get(function(req, res){
    res.sendFile(process.cwd() + '/views/index.html');
  });
  
  
  
  
  app.route("/:url").get(function(req, res){
    
    //Validate URL; If good proceed
    var query = req.params.query
    if(validUrl)
    
    
  });
  
  
  
  
  
  
  
};
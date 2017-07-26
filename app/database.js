var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = 'mongodb://will:gutierrez@ds125623.mlab.com:25623/fcc-backend';      
//(Focus on This Variable)

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    var collection = db.collection('short-urls');
    console.log(collection);
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});
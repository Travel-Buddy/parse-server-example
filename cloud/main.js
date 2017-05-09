
Parse.Cloud.define('hello', function(req, res) {
  console.log('Parse.serverURL: ' + Parse.serverURL);
  res.success('Parse cloud url: ' + __dirname + '/cloud/main.js');
  res.success('Parse.serverURL: ' + Parse.serverURL);
});


Parse.Cloud.afterDelete("Trip", function(request) {
  console.log('Parse.serverURL: ' + Parse.serverURL);
 query = new Parse.Query("Destination");
 query.equalTo("trip", request.object);
 query.find({ useMasterKey: true,
   success: function(destinations) {
     Parse.Object.destroyAll(destinations, {
       useMasterKey: true,
       success: function() {},
       error: function(error) {
         console.error("Error deleting related destinations " + error.code + ": " + error.message);
       }
     });
   },
   error: function(error) {
     console.error("Error finding related destinations" + error.code + ": " + error.message);
   }
 });
});


Parse.Cloud.afterDelete("Destination", function(request) {
  console.log('Parse.serverURL: ' + Parse.serverURL);
 query = new Parse.Query("Plan");
 query.equalTo("destination", request.object);
 query.find({ useMasterKey: true,
   success: function(plans) {
     Parse.Object.destroyAll(plans, {
       useMasterKey: true,
       success: function() {},
       error: function(error) {
         console.error("Error deleting related plans " + error.code + ": " + error.message);
       }
     });
   },
   error: function(error) {
     console.error("Error finding related plans" + error.code + ": " + error.message);
   }
 });
});

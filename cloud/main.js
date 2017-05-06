
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.afterDelete("Trip", function(request) {
 Parse.Cloud.useMasterKey;
 query = new Parse.Query("Destination");
 query.equalTo("trip", request.object);
 query.find({
   success: function(destinations) {
     Parse.Object.destroyAll(destinations, {
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
 Parse.Cloud.useMasterKey;
 query = new Parse.Query("Plan");
 query.equalTo("destination", request.object);
 query.find({
   success: function(plans) {
     Parse.Object.destroyAll(plans, {
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

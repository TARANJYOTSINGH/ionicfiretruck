
angular.module('starter.services', [])
.factory('Manufacturers',function() {
 	var  Manufacturer=[{name:'Seagrave'},
     {name:'ALF'},
     {name:'Maxim'},
     {name:'Mack'},
     {name:'Darley'},
     {name:'Hahn'},
     {name:'Brockway'},
     {name:'Ford'},
     {name:'Autocar'},
     {name:'Crown'}
 ];
  return {
    all: function() {
      return Manufacturer;
    }}
 })
.factory('sharedProperties', function () {
 var user = {firstname:" "};      
 
        return {
            getfirstname: function () {
                return user.firstname;
            },
            setfirstname: function(value) {
                user.firstname = value;
            }
        };
    });
 
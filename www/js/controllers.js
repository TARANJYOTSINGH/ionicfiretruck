
angular.module('starter.controllers', [])

.controller("FirebaseController", function($scope,$rootScope,$state, $firebaseAuth,sharedProperties) {

    var fbAuth = $firebaseAuth(fb);

     $scope.facebook=function(){
     	 fbAuth.$authWithOAuthPopup("facebook").then(function(authData) {
            var username=authData.facebook.cachedUserProfile.first_name;
     	 sharedProperties.setfirstname(username);
     	 	//alert(sharedProperties.getfirstname());
    console.log("Logged in as:", username);
    
    $state.go("secure");
  }).catch(function(error) {
    console.log("Authentication failed:", error);
  });
  

     }
    $scope.login = function(username, password) {
             fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            $scope.error="invalid username or password";
        });
    }

    $scope.register = function(username, password) {
        fbAuth.$createUser({email: username, password: password}).then(function(userData) {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

})
.controller("SecureController", function($scope,$filter,$ionicActionSheet,$ionicHistory, $firebaseArray, $cordovaCamera,Manufacturers,sharedProperties) {

    $ionicHistory.clearHistory();
     $scope.username=sharedProperties.getfirstname();
    $scope.images = [];
     //console.log(sharedProperties.getfirstname());
     // alert(sharedProperties.getfirstname());
     
    var fbAuth = fb.getAuth();
    if(fbAuth) {
        console.log(fbAuth);
        $scope.profileImage=fbAuth.facebook.cachedUserProfile.picture.data.url;
        $scope.firstname=fbAuth.facebook.cachedUserProfile.first_name;
        $scope.manufacturerName=Manufacturers.all();
        var userReference = fb.child("users/" + fbAuth.uid);

        var syncArray = $firebaseArray(userReference.child("images"));
        $scope.images = syncArray;
         
        

       

    } else {
        $state.go("firebase");
    }
   
    $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Take Photo from Camera' },
       { text: 'Photo Library' }
     ],
     
     
     cancelText: '<b>Cancel</b>',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
        
        
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
           
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
           if(index==0)
           {
            options.sourceType=Camera.PictureSourceType.PHOTOLIBRARY;
            alert( options.sourceType);}
            else
            {
            options.sourceType=Camera.PictureSourceType.CAMERA;
             alert( options.sourceType);}
        
        $cordovaCamera.getPicture(options).then(function(imageData) {
            var date =$filter('date')(new Date(), 'EEEE, MMMM d, y');
            syncArray.$add({Dateuploaded:date,model:"2014", image: imageData}).then(function() {
                alert("Image has been uploaded on " + date);
            });
        }, function(error) {
            console.error(error);
        });
    
          
       return true;
     }
   });

   

 };

    $scope.upload = function() {
        
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        
        $cordovaCamera.getPicture(options).then(function(imageData) {
            var date =$filter('date')(new Date(), 'EEEE, MMMM d, y');
            syncArray.$add({Dateuploaded:date,model:"2014", image: imageData}).then(function() {
                alert("Image has been uploaded on " + date);
            });
        }, function(error) {
            console.error(error);
        });
    }
});;
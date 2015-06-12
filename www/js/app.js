// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at 
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});


function billingCtrl($scope,billingData,$log) {
  $scope.billingData = [];

  $scope.refresh = function(){
    console.log("refreshing....");
    billingData.getBillingData($scope);
    console.log("refreshed!!!");
  };
}

function billingData($http,$q,$ionicPopup,$log){
  this.getBillingData = function ($scope) {
      console.log("called getBillingData");
      // $http({method: "jsonp", url: "http://192.168.1.105:3000/api/testbillings/initApp?callback=JSON_CALLBACK"})
      $http.get("http://192.168.1.105:3000/api/testbillings/initApp")
      .success(function(data,status){
        console.log("got data");
        $scope.billingData = data.initApp.billDimensions;
        console.log("set data to array");
      })
      .error(function(err,status){
        console.log("error occured: %s",err);
        $ionicPopup.alert({
         title: 'Oops! An error occured.',
         template: err
        });
      })
      .finally(function() {
        console.log($scope.billingData);
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
  }
}

app.service("billingData",["$http","$ionicPopup","$log",billingData]);
app.controller("billingCtrl",["$scope","billingData","$log",billingCtrl]);
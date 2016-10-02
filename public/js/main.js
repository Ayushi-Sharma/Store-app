var app = angular.module("app", ['ui.router','naif.base64']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '../index.html'
        })
        .state('all-stores', {
            url: '/stores',
            templateUrl: 'partials/partial-all-stores.html'
        })
        .state('stores-add', {
            url: '/new',
            templateUrl: 'partials/partial-add-store.html'
        })
        .state('store', {
            url: '/store/:id',
            templateUrl: 'partials/partial-store-details.html'
        });
})
.controller('homeCtrl', function($scope){
    $scope.custom = true;
})
.controller('storeCtrl', function($scope,$http,$state,$rootScope,$timeout){
    $scope.aboutUs = ''; 
    $scope.products = [];
    $scope.addProduct = function () {
        $scope.error = "";
        if (!$scope.productName) {return $scope.error = "Cannot add an empty product";}
        if ($scope.products.indexOf($scope.productName) == -1) {
            $scope.products.push($scope.productName);
        } else {
            $scope.error = "This name is already taken.";
        }
        $scope.productName = null;
    }
    $scope.removeItem = function (x) {
        $scope.error = "";
        $scope.products.splice(x, 1);
    }
    
    $scope.addStore = function(name, description, location, products, from, to, coverImage, image){

        var images = [];
        firebase.database().ref('Stores/' +name).set({
            id : firebase.database.ServerValue.TIMESTAMP,
            Details : {
                Name : name,
                Description : description,
                Location : location,
                Products : products,
                Cover : coverImage,
                Images : image,
                TimingFrom : from,
                TimingTo : to
             }
        });
        
        firebase.database().ref().update({

        });
        $scope.addName = null;
        $scope.aboutUs = null;
        $scope.location = null;
        $scope.coverPhoto = null;
        $scope.userPhoto = null;
        $scope.timing = null;
        $scope.productName = null;        
    }
    var getData = firebase.database().ref('Stores');
    getData.on('value', function(data){
        $rootScope.abc = [];
        $rootScope.abc = (data.val());
        console.log($scope.abc);
    });
    $scope.storeDetail = function(name){
        var getDataDetail = firebase.database().ref('Stores/'+name);
        getDataDetail.on('value', function(data){
            $rootScope.abc = [];
            $rootScope.store = (data.val()); 
            console.log($scope.store);   
    });
    }
    $scope.showImage = function(image){

    }
    
    $scope.value = [];
    $timeout(function() {
        var name = $rootScope.storeName
        $scope.value = $rootScope.abc;
        console.log($scope.value);
    }, 40000);
    $timeout(function() {
        var name = $rootScope.storeName
        $scope.detail = $rootScope.store;
        console.log($scope.detail);
    }, 40000);
    $scope.load = true;
    $scope.loadingDetails = true;
    $timeout(function(){
        $scope.load = false;
    }, 40000);
    $timeout(function(){
        $scope.loadingDetails = false;
    }, 40000);
    
});

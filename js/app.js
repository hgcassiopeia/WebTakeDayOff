var myApp = angular.module('app',['ui.router','ngMaterial','ngMessages']);
myApp.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login',{
      url: '/',
      templateUrl: 'template/login.html'
    })
    .state('register',{
      url: '/register',
      templateUrl: 'template/register.html',
    })
    .state('request',{
      url: '/request',
      templateUrl: 'template/request.html',
    })
    .state('result',{
      url: '/result',
      templateUrl: 'template/result.html',
    })
    .state('export',{
      url: '/export',
      templateUrl: 'template/export.html',
    })
});

myApp.controller('formController',function($scope){
  $scope.reason = 'hello';
  this.myDate = new Date();
  this.isOpen = false;
});

myApp.controller('loginController',function($rootScope,$scope,$location){

  $rootScope.checkPage = function(){
    $rootScope.location = $location;
  }

  $scope.goToRegister = function(){
    $location.path('/register');
  }

  $scope.submit = function(){
    var uname = $scope.username;
    var pword =  $scope.password;
    if($scope.username == 'admin' && $scope.password == 'admin'){
      $location.path('/request');
    }else{
      alert('Wrong User Password')
    }
  }
});

myApp.controller('registerController',function($scope){
	$scope.registerSubmit = function(){
		var regis_username = $scope.regisusername;
		var regis_pass = $scope.regispass;
		console.log(regis_username);
		console.log(regis_pass);
	}
});

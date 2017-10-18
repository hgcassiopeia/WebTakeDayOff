var myApp = angular.module('app',['ui.router','ngMaterial','ngMessages']);
var baseurl = angular.element('meta[name="baseUrl"]').attr('content');
// console.log(baseurl);
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

myApp.controller('loginController',function($rootScope,$scope,$location,indexService){

  $rootScope.checkPage = function(){
    $rootScope.location = $location;
  }

  $scope.goToRegister = function(){
    $location.path('/request');
  }

  $scope.submit = function(){
    console.log($scope.form)
    indexService.loginService($scope.form).success(function($data){
        console.log($data);
        var getData = angular.extend($data);
        if(getData.type != 1 && getData.type != 2){
          $location.path('/request');
        }else{
          alert(getData.status);
        }
    });
  }
});

myApp.controller('registerController',function($scope,indexService,$location){
	$scope.registerSubmit = function(){
    indexService.registerService($scope.form).success(function($data){
        var getData = angular.extend($data);
        console.log(getData);
        if(getData.data == true){
          $location.path('/');
        }else{
          alert('Cannot Register');
        }
    });
	}
});

var myApp = angular.module('app',['ui.router','ngMaterial','ngMessages']);
myApp.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('request',{
      url: '/',
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
    .state('login',{
      url: '/login',
      templateUrl: 'template/login.html'
    })
});

myApp.controller('formController',function($scope){
  $scope.reason = 'hello';
  this.myDate = new Date();
  this.isOpen = false;
});

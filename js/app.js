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
    .state('viewrequest',{
      url: '/viewrequest',
      templateUrl: 'template/view_day_off_request(approve).html',
    })
    .state('result',{
      url: '/result',
      templateUrl: 'template/result.html',
    })
    .state('modmem',{
      url: '/modmem',
      templateUrl: 'template/modifymember.html',
    })
    .state('modpro',{
      url: '/modpro',
      templateUrl: 'template/modifyproject.html',
    })
    .state('addpro',{
      url: '/addpro',
      templateUrl: 'template/addproject.html',
    })
    .state('export',{
      url: '/export',
      templateUrl: 'template/export.html',
    })
});

myApp.controller('requestController',function($scope){

  $scope.DateFrom = new Date();
  $scope.DateTo = new Date();

  $scope.requestDayOff = function(){
    console.log($scope.form)
  }
});

myApp.controller('loginController',function($rootScope,$scope,$location,indexService){

  $rootScope.checkPage = function(){
    $rootScope.location = $location;
  }

  $scope.goToRegister = function(){
    $location.path('/request');
  }

  $scope.submit = function(){
    indexService.loginService($scope.form).success(function($data){
        var getData = angular.extend($data);
        if(getData.type != 1 && getData.type != 2){
          localStorage.setItem('profile',JSON.stringify(getData.data));
          $rootScope.name = getData.data.firstname+' '+getData.data.lastname;
          $rootScope.positionCheck = getData.data.position_id;
          if($rootScope.positionCheck == 1){
            $location.path('/viewrequest');
          }else{
            $location.path('/request');
          }
        }else{
          alert(getData.status);
        }
    });
  }

  $scope.logout = function(){
    localStorage.removeItem('profile');
  }
});

myApp.controller('registerController',function($scope,indexService,$location){
	$scope.registerSubmit = function(){
    indexService.registerService($scope.form).success(function($data){
        var getData = angular.extend($data);
        if(getData.data == true){
          $location.path('/');
        }else{
          alert('Cannot Register');
        }
    });
	}
});

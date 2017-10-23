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
//===========================Add Project==========================================//
myApp.controller('addProjectController',function($scope,indexService){

    $scope.checkLogin = function(){
      $scope.store = JSON.parse(localStorage.getItem('profile'));
      if($scope.store){
        $scope.users = $scope.store;
        indexService.TeamService({'teamId':$scope.users.team_id}).success(function($data){
          var getData = angular.extend($data);
          console.log(JSON.stringify(getData));
          $scope.team = getData.data;
        });
      }else{
        localStorage.removeItem('profile');
        $location.path('/');
      }
    }

});
//========================Result===================================================//
myApp.controller('resultController',function($scope,indexService){
  $scope.getResult = function(){
    indexService.ResultService().success(function($data){
        var getData = angular.extend($data);
        console.log(JSON.stringify(getData));
        $scope.listResult = getData.data;
    });
  }
});
//=======================ViewRequest==============================================//
myApp.controller('viewRequestController',function($scope,indexService){

  $scope.selectedList = {};

  $scope.getView = function(){
    indexService.ViewRequestService().success(function($data){
        var getData = angular.extend($data);
        // console.log(JSON.stringify(getData));
        $scope.listRequest = getData.data;
    });
  }
  //----------------------------Approve---------------------------------------//
  $scope.ApproveSubmit = function(){

    $scope.count = [];
    $scope.approveData = [];

    angular.forEach($scope.listRequest, function(value,key){
        angular.forEach($scope.selectedList, function (selected, item) {
                if (selected) {
                  $scope.count.push(item)
                  if(key == item){
                    $scope.approveData.push(value);
                  }
                }
        });
    });
    // console.log(JSON.stringify($scope.approveData))
    indexService.ApproveService($scope.approveData).success(function($data){
        var getData = angular.extend($data);
        // console.log(JSON.stringify($data));
        $scope.getView();
    });
  }
  //------------------------------Reject--------------------------------------//
  $scope.RejectSubmit = function(){

    $scope.count = [];
    $scope.rejectData = [];

    angular.forEach($scope.listRequest, function(value,key){
        angular.forEach($scope.selectedList, function (selected, item) {
                if (selected) {
                  $scope.count.push(item)
                  if(key == item){
                    $scope.rejectData.push(value);
                  }
                }
        });
    });
    // console.log(JSON.stringify($scope.approveData))
    indexService.RejectService($scope.rejectData).success(function($data){
        var getData = angular.extend($data);
        // console.log(JSON.stringify($data));
        $scope.getView();
    });
  }

});
//===============================Request===========================================//
myApp.controller('requestController',function($scope,indexService,$location){

  $scope.DateFrom = new Date();
  $scope.DateTo = new Date();

  $scope.checkLogin = function(){
    $scope.store = JSON.parse(localStorage.getItem('profile'));
    if($scope.store){
      $scope.users = $scope.store.user_id;
    }else{
      localStorage.removeItem('profile');
      $location.path('/');
    }
  }

  $scope.requestDayOff = function(){
    if($scope.form){
      $scope.form.User = $scope.users;
      // console.log(JSON.stringify($scope.form));
    }else{
      $scope.form = "";
    }
    indexService.requestService($scope.form).success(function($data){
        var getData = angular.extend($data);
        // console.log(JSON.stringify(getData))
        if(getData.data == true){
          $scope.form = "";
        }
        alert(getData.status)
    });
  }
});
//===================================Login===========================================//
myApp.controller('loginController',function($rootScope,$scope,$location,indexService){

  $rootScope.checkPage = function(){
    $rootScope.location = $location;
  }

  $scope.goToRegister = function(){
    $location.path('/request');
  }

  $scope.checkLogin = function(){
    $scope.store = JSON.parse(localStorage.getItem('profile'));
    if($scope.store){
      $rootScope.name = $scope.store.firstname+' '+$scope.store.lastname;
      $rootScope.userID = $scope.store.user_id;
      $rootScope.positionCheck = $scope.store.position_id;;
    }else{
      localStorage.removeItem('profile');
      $location.path('/');
    }
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
//=====================================Register======================================//
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

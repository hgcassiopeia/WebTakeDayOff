myApp.service('indexService', function($http){

  this.loginService = function(data){
      var formData = data;
      console.log('data login >> '+JSON.stringify(formData))
      var promise = $http({
        method: 'POST',
        url: baseurl + 'php/login.php',
        data: formData
      });
      return promise;
  };

  this.registerService = function(data){
      var formData = data;
      var promise = $http({
        method: 'POST',
        url: baseurl + 'php/register.php',
        data: formData
      });

      return promise;
  };

  this.requestService = function(data){
      var formData = data;
      var promise = $http({
        method: 'POST',
        url: baseurl + 'php/request.php',
        data: formData
      });

      return promise;
  };

  this.ViewRequestService = function(){
      var promise = $http({
        method: 'GET',
        url: baseurl + 'php/viewRequest.php',
      });

      return promise;
  };

});

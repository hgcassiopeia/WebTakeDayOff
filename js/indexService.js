myApp.service('indexService', function($http){

  this.loginService = function(data){
      var formData = data;
      var promise = $http({
        method: 'POST',
        url: baseurl + 'php/login.php',
        data: formData
      });
      return promise;
  };

});

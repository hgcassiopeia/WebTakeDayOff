myApp.service('indexService', function($http){

  this.loginService = function(data){
      var formData = data;
      console.log('data login >> '+formData)
      var promise = $http({
        method: 'POST',
        url: baseurl + 'php/login.php',
        data: formData
      });
      return promise;
  };

  this.registerService = function(data){
      var formData = data;
      console.log('data regis >> '+formData)
      var promise = $http({
        method: 'POST',
        url: baseurl + 'php/register.php',
        data: formData
      });
      console.log('test pro>>'+JSON.stringify(promise));
      return promise;
  };

});

(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddCtrl', AddCtrl);

    AddCtrl.$inject = ['Results', '$scope', '$alert', '$cookies'];

    function AddCtrl(Results, $scope, $alert, $cookies) {
      $scope.error = false;
      $scope.formField = null;
      const userId = $cookies.get('userId');

      $scope.addForm = function() {
        const alertSuccess = $alert({
          title: 'Succss',
          content: 'New website has been added',
          container: '#alertContainer',
          type: 'success',
          duration: 6
        });

        const add = {
          title: $scope.title,
          url: $scope.url,
          description: $scope.description,
          id: userId
        }
        Results.postSite(add)
          .then(function(data) {
            console.log('new site added to db');
            console.log(data);
            $scope.url = '';
            $scope.description = '';
            $scope.title = '';
            alertSuccess.show();
          })
          .catch(function() {
            console.log('website failed to save');
          });
      }

    }
})();
var myapp = angular.module('sampleapp', [ 'ngAnimate', 'ui.bootstrap' ]);
myapp.controller('samplecontoller', function ($scope, $http, $uibModal) {
// GET DATA FROM API
$scope.showData = function( $parametr ){
    $http.get("http://test-api.kuria.tshdev.io/?" + $parametr ).success(function(response) {  
        //console.log('page='+ response.pagination.current);
        //console.log($scope.linki);
        $scope.items = response.payments;
        $scope.current = parseInt(response.pagination.current);
        $scope.leftEnd = response.pagination.leftEnd;
        $scope.rightEnd = response.pagination.rightEnd;
        $scope.left = response.pagination.left;
        $scope.right = response.pagination.right;
        $scope.linki = response.pagination.links;
        // CREATE PAGINATION BASED ON DATA FROM API (from to)
        $scope.from = response.pagination.from;
        $scope.to = response.pagination.to;
        var list = [];
        for (var i = $scope.from; i <= $scope.to; i++) {
            list.push(i);
        }
        $scope.nums = list;
        // RESET FORM
        $scope.resetForm =  function() {
            $scope.search.name = '';
            $scope.search.rating = '';
        }  
	})
}    
// MODAL OPEN
$scope.open = function (item) {
    var uibModalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        item: item,
        resolve: {
            items: function () {
                return $scope.items;
            },
            item: function(){
                return item;
            }
        }
    });
};
}); 
// MODAL WINDOW    
angular.module('sampleapp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, item) {
  console.log(item);
  $scope.item = item;
  
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };
});
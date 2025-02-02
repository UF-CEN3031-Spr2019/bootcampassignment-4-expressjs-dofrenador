angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
    saved redirect back to the list page. Otherwise, display the error
	 */ 
  var listing={
      code:$scope.newListing.code,
      name:$scope.newListing.name,
      address:$scope.newListing.address
  };
    Listings.create(listing).then(function(response){
    $scope.listings.push(response.data);
    $scope.listings = $scope.listings.sort(function (a, b) {
    return a.code.localeCompare(b.code);
  });
},function(error){
      console.log('Unable to create: ', error);
    });
      $scope.newListing={};
};

    $scope.deleteListing = function(id) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
    
      Listings.delete(id).then(function(response){
        for(var i=0; i< $scope.listings.length; i++){
          if($scope.listings[i]._id == response.data._id){
            $scope.listings.splice(i ,1);
          }
        }
       //$scope.listings.splice( $scope.listings.indexOf(response),1);
       //$state.go('listings.list', { successMessage: 'Listing succesfully removed!' });
        },function(error){
          console.log('Unable to delete',error);
        });
          
          
    };
  

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
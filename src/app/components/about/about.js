angular.module('myApp.about', [])
.controller('aboutCtrl',[function(){
	this.aboutText = 'This is the about component!';

	$scope.selectCarDetails = function(vinValue){
    	    $scope.singleVinValues=vinValue;
    	    $scope.netPrice = parseInt(vinValue.Pricing.BaseMSRP) + parseInt(vinValue.Pricing.Options) +parseInt(vinValue.Pricing.DestinationDeliveryCharge) +parseInt(vinValue.Pricing.MSRP);

    };
}]);
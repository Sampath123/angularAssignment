angular.module('myApp.home', [])
.controller('homeCtrl',['$http', '$scope',function($http, $scope){

    var welcomeText1;
    $scope.carPrice = [{ordertype:"asc",ordervalue:"Sort by Low to high"}, {ordertype:"desc",ordervalue:"Sort by High to Low"}];
 $http.get("http://wwwqa.servicesus.ford.com/inventory/FilterItems.json?make=Ford&model=Mustang&year=2017")
 .then(function(response) {
    $scope.status = response.data.Response.status;
    $scope.FilterDefinitions = response.data.Response;
    var filetrsize = response.data.Response.FilterDefinitions.FilterDefinition;
    var ExteriorColor1 = [];
    var group1 =[];
    var filterDefArr = [];
    var interiorcolorArr = [];
    for (var i = 0; i< filetrsize.length; i++) {

        var filetrsize1 = response.data.Response.FilterDefinitions.FilterDefinition[i].FilterItems.FilterItem;
         if(response.data.Response.FilterDefinitions.FilterDefinition[i].ID=="ExteriorColor") {
            for (var j=0; j<filetrsize1.length; j++) {
                var valu = response.data.Response.FilterDefinitions.FilterDefinition[i].FilterItems.FilterItem[j].SwatchHexCode;
                var values =valu.substr(2);
                ExteriorColor1.push(values);
                $scope.ExteriorColor = ExteriorColor1;
                var filterDefVal=response.data.Response.FilterDefinitions.FilterDefinition[i].FilterItems.FilterItem[j];
                filterDefArr.push(filterDefVal);
                $scope.filterDefinations = filterDefArr;
            }
         }
         if(response.data.Response.FilterDefinitions.FilterDefinition[i].ID=="InteriorColor") {
            for (var k=0; k<filetrsize1.length; k++) {
                var groupValue = response.data.Response.FilterDefinitions.FilterDefinition[i].FilterItems.FilterItem[k].Group;
                group1.push(groupValue);
                var unique_array = [];
                for(var m = 0;m < group1.length; m++){
                    if(unique_array.indexOf(group1[m]) == -1){
                        unique_array.push(group1[m]);
                    }
                }
                $scope.group = unique_array;
                var interiorcolorVal=response.data.Response.FilterDefinitions.FilterDefinition[i].FilterItems.FilterItem[k];
                interiorcolorArr.push(interiorcolorVal);
            }
            $scope.interiorcolor = interiorcolorArr;
         }
    }
 });

	//this.welcomeText = welcomeText1;
	$scope.selectCarColor= function(carID){
	    var VinValueArr = [];
	    $http.get("http://servicesdev.forddirect.fordvehicles.com/inventory/Search.json?make=Ford&model=Mustang&year=2017&dealerPACode=05453;09158&postalCode=90210&exteriorColor="+carID)
          .then(function(response){
          var fordvehicles = response.data.Response.VehicleSearch.Vehicles.Vehicle;
          for (var v = 0; v < fordvehicles.length; v++) {
            var VinResValue = response.data.Response.VehicleSearch.Vehicles.Vehicle[v];
            VinValueArr.push(VinResValue);
            $scope.VinValues = VinValueArr;
          }
        });
	};

	$scope.selectInteriorCarColor = function(InteriorColor){
	    var VinValueArr = [];
        $http.get("http://servicesdev.forddirect.fordvehicles.com/inventory/Search.json?make=Ford&model=Mustang&year=2017&dealerPACode=05453;09158&postalCode=90210&interiorColor="+InteriorColor)
            .then(function(response){
            var fordvehicles = response.data.Response.VehicleSearch.Vehicles.Vehicle;
            for (var v = 0; v < fordvehicles.length; v++) {
                var VinResValue = response.data.Response.VehicleSearch.Vehicles.Vehicle[v];
                VinValueArr.push(VinResValue);
                $scope.VinValues = VinValueArr;
            }
        });
    };

	$scope.selectCarDetails = function(vinValue){
	    $scope.singleVinValues=vinValue;
	    $scope.netPrice = parseInt(vinValue.Pricing.BaseMSRP) + parseInt(vinValue.Pricing.Options) +parseInt(vinValue.Pricing.DestinationDeliveryCharge) +parseInt(vinValue.Pricing.MSRP);
	};

    $scope.allFordCarForRange = function(range) {
        var allCarArr = [];
        $http.get("http://wwwqa.servicesus.ford.com/inventory/Search.json?make=Ford&model=F-150;Fiesta;Mustang;Fusion;Transit&year=2017&dealerPACode=05453;09158&postalCode=90210")
        .then(function(response){
            var allFordvehicles = response.data.Response.VehicleSearch.Vehicles.Vehicle;
            for (var v = 0; v < allFordvehicles.length; v++) {
                var allCarValue = response.data.Response.VehicleSearch.Vehicles.Vehicle[v];
                allCarArr.push(allCarValue);
            }
            allCarArr = allCarArr.slice(0, range);
            $scope.VinValues = allCarArr;
        });
    };

	$scope.allFordCars= function(valu){
	    var allCarArr = [];
	    var allCarPrice = [];
        $http.get("http://wwwqa.servicesus.ford.com/inventory/Search.json?make=Ford&model=F-150;Fiesta;Mustang;Fusion;Transit&year=2017&dealerPACode=05453;09158&postalCode=90210")
            .then(function(response){
                var allFordvehicles = response.data.Response.VehicleSearch.Vehicles.Vehicle;
                for (var v = 0; v < allFordvehicles.length; v++) {
                    var allCarValue = response.data.Response.VehicleSearch.Vehicles.Vehicle[v];
                    var allCarPriceValue = response.data.Response.VehicleSearch.Vehicles.Vehicle[v].Pricing.MSRP;
                    allCarArr.push(allCarValue);
                    allCarPrice.push(allCarPriceValue);
                    $scope.maxVal = allCarArr.length;
                }
                $scope.maxVal = allCarArr.length;
                if(valu=="desc") {
                    allCarArr.reverse();
                    $('#optionButton').text("Sort by High to Low");
                } else { $('#optionButton').text("Sort by Low to high");}

                $scope.maxPrice = Math.max.apply(null, allCarPrice);
                $scope.minPrice = Math.min.apply(null, allCarPrice);
                $scope.VinValues = allCarArr;
        });
	};
}]);


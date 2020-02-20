var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $http ,$location,$ionicLoading) {

//	indTrade  交易规则 
//	indGuide  使用指南 
//	indKnow   投资知识
	$scope.guideNum = getTheRequestParams().index || 0;
	console.log($scope.guideNum) 
	$scope.recordArr = [
		{
            "name" : "止盈止损",
            "clickId" : "guideLoss()"
       },
       {
            "name" : "代金券",
            "clickId" : "guideVouchers()"
       }
    ]
	getArrParams($scope.recordArr,$scope.guideNum) 
	
	//止盈止损
	$scope.guideLoss = function(){
		location.href = "guideLoss.html?index="+0;
	}
	//代金券
	$scope.guideVouchers = function(){
		location.href = "guideVouchers.html?index="+1; 
	}
	

});
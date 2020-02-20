var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $http ,$location,$ionicLoading) {
  
	//	indTrade  交易规则 
//	indGuide  使用指南 
//	indKnow   投资知识
	$scope.guideNum = getTheRequestParams().index || 0;
	console.log($scope.guideNum) 
	$scope.recordArr = [
			{
            "name" : "铜镍数据",
            "clickId" : "knowCopnic()"
       },
       {
            "name" : "KDJ指标",
            "clickId" : "knowKDJ()"
       },
       {
            "name" : "了解K线",
            "clickId" : "knowKline()"
       },
       {
            "name" : "MACD指标",
            "clickId" : "knowMACD()"
       },
       {
            "name" : "SMA技巧",
            "clickId" : "knowSMA()"
       },
       {
            "name" : "支撑阻力",
            "clickId" : "knowTrendsup()"
       },
       {
            "name" : "美国数据",
            "clickId" : "knowUSdata()"
       },
       {
            "name" : "品种介绍",
            "clickId" : "knowVarieties()"
       },
       {
            "name" : "EMA技巧",
            "clickId" : "knowEMA()"
       }
    ]
	getArrParams($scope.recordArr,$scope.guideNum) 
	//铜镍数据
	$scope.knowCopnic = function(){
		location.href = "knowCopnic.html?index="+0;
	}
	//KDJ
	$scope.knowKDJ = function(){
		location.href = "knowKDJ.html?index="+1;
	}
	//K线
	$scope.knowKline = function(){
		location.href = "knowKline.html?index="+2;
	}
	//MACD
	$scope.knowMACD = function(){
		location.href = "knowMACD.html?index="+3; 
	}
	//SMA
	$scope.knowSMA = function(){
		location.href = "knowSMA.html?index="+4;
	}
	//EMA
	$scope.knowEMA = function(){
		location.href = "knowEMA.html?index="+8;
	}
	//趋&nbsp;势&nbsp;与&nbsp;支&nbsp;撑&nbsp;阻&nbsp;力
	$scope.knowTrendsup = function(){
		location.href = "knowTrendsup.html?index="+5;
	}
	//美国数据
	$scope.knowUSdata = function(){
		location.href = "knowUSdata.html?index="+6;
	}
	//品&nbsp;种&nbsp;介&nbsp;绍
	$scope.knowVarieties = function(){
		location.href = "knowVarieties.html?index="+7;
	}
	

});
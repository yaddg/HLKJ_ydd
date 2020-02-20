var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $http ,$location,$ionicLoading) {
	
	//	indTrade  交易规则 
	//	indGuide  使用指南 
	//	indKnow   投资知识 
	$scope.guideNum = getTheRequestParams().index || 0;
	console.log($scope.guideNum);
	$scope.infoData = new Date().getFullYear() +"-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
	$scope.recordArr = [
			 {
            "name" : "买涨买跌",
            "clickId" : "tradeBuyfall()"
       },
       {
            "name" : "持仓过夜",
            "clickId" : "tradeNight()"
       },
       {
            "name" : "平仓、建仓、持仓",
            "clickId" : "tradePosition()"
       },
       {
            "name" : "充值提现时间",
            "clickId" : "tradePresent()"
       },
       {
            "name" : "手续费",
            "clickId" : "tradeSercharge()"
       },
       {
            "name" : "交易时间",
            "clickId" : "tradeTradtime()"
       }
    ]
	getArrParams($scope.recordArr,$scope.guideNum)
	
	//什 么 是 买 涨 买 跌
	$scope.tradeBuyfall = function(){
		location.href = "tradeBuyfall.html?index="+0;
	}
	//什 么 是 持 仓 过 夜
	$scope.tradeNight = function(){
		location.href = "tradeNight.html?index="+1;
	}
	//什 么 是 平 仓、建 仓、持 仓
	$scope.tradePosition = function(){
		location.href = "tradePosition.html?index="+2;
	}
	//充 值 提 现 时 间 及 出 入 金 手续 费
	$scope.tradePresent = function(){
		location.href = "tradePresent.html?index="+3;
	}
	//手 续 费 如 何 收 取
	$scope.tradeSercharge = function(){
		location.href = "tradeSercharge.html?index="+4; 
	}
	//交 易 时 间
	$scope.tradeTradtime = function(){
		location.href = "tradeTradtime.html?index="+5; 
	}
	
	

});
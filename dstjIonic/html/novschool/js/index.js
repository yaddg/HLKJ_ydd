var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $http ,$location,$ionicLoading) {
	// loading
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
  
	$scope.myVar1 = true;
	$scope.myVar2 = true;
	$scope.myVar3 = true;
	$scope.myVar = false;
	//颜色 
	$scope.indTrades = "indTrades";
	$scope.indGuides = "indGuides";
	$scope.indKnows = "indKnows";
//	indTrade  交易规则 
//	indGuide  使用指南 
//	indKnow   投资知识
	
	//切换展示 交易规则 
	$scope.indTrade = function(){
		if($scope.myVar1 == true){
			$scope.indTrades = "mycol";
			$scope.indGuides = "othcol";
			$scope.indKnows = "othcol";
			$scope.myVar1 = false; 
			$scope.myVar2 = true;
			$scope.myVar3 = true;
			$scope.myVar = true;
		}
	}
	////切换展示 使用指南 
	$scope.indGuide = function(){
		if($scope.myVar3 == true){
			$scope.indTrades = "othcol";
			$scope.indGuides = "mycol";
			$scope.indKnows = "othcol";
			$scope.myVar1 = true; 
			$scope.myVar2 = true;
			$scope.myVar3 = false;
			$scope.myVar = true;
		}
		
	}
	 
	////切换展示 投资知识 
	$scope.indKnow = function(){
		if($scope.myVar2 == true){
			$scope.indTrades = "othcol";
			$scope.indGuides = "othcol";
			$scope.indKnows = "mycol";
			$scope.myVar1 = true; 
			$scope.myVar2 = false;
			$scope.myVar3 = true;
			$scope.myVar = true;
		}
	}
	//	indTrade  交易规则 
	$scope.indTradeUrl = "html/indtrade/";
	//什 么 是 买 涨 买 跌
	$scope.tradeBuyfall = function(){
		location.href = $scope.indTradeUrl + "tradeBuyfall.html?index="+0;
	}
	//什 么 是 持 仓 过 夜
	$scope.tradeNight = function(){
		location.href =  $scope.indTradeUrl + "tradeNight.html?index="+1; 
	}
	//什 么 是 平 仓、建 仓、持 仓
	$scope.tradePosition = function(){
		location.href =  $scope.indTradeUrl + "tradePosition.html?index="+2;
	}
	//充 值 提 现 时 间 及 出 入 金 手续 费
	$scope.tradePresent = function(){
		location.href =  $scope.indTradeUrl + "tradePresent.html?index="+3;
	}
	//手 续 费 如 何 收 取
	$scope.tradeSercharge = function(){
		location.href =  $scope.indTradeUrl + "tradeSercharge.html?index="+4;  
	}
	//交 易 时 间
	$scope.tradeTradtime = function(){
		location.href = $scope.indTradeUrl + "tradeTradtime.html?index="+5;  
	}
	
	//	indGuide  使用指南 
	$scope.indGuideUrl = "html/indguide/";
	//止盈止损
	$scope.guideLoss = function(){
		location.href = $scope.indGuideUrl + "guideLoss.html?index="+0;
	}
	//代金券
	$scope.guideVouchers = function(){
		location.href = $scope.indGuideUrl + "guideVouchers.html?index="+1; 
	}
	
	
	//	indKnow   投资知识 
	$scope.indKnowUrl = "html/indknow/";
	//铜镍的影响因素
	$scope.knowCopnic = function(){
		location.href = $scope.indKnowUrl + "knowCopnic.html?index="+0;
	}
	//KDJ
	$scope.knowKDJ = function(){
		location.href = $scope.indKnowUrl + "knowKDJ.html?index="+1; 
	}
	//K线
	$scope.knowKline = function(){
		location.href = $scope.indKnowUrl + "knowKline.html?index="+2;
	}
	//MACD
	$scope.knowMACD = function(){
		location.href = $scope.indKnowUrl + "knowMACD.html?index="+3; 
	}
	//SMA
	$scope.knowSMA = function(){
		location.href = $scope.indKnowUrl + "knowSMA.html?index="+4;
	}
	//EMA
	$scope.knowEMA = function(){
		location.href = $scope.indKnowUrl + "knowEMA.html?index="+8;
	}
	//趋&nbsp;势&nbsp;与&nbsp;支&nbsp;撑&nbsp;阻&nbsp;力
	$scope.knowTrendsup = function(){
		location.href = $scope.indKnowUrl + "knowTrendsup.html?index="+5; 
	}
	//美国数据
	$scope.knowUSdata = function(){
		location.href = $scope.indKnowUrl + "knowUSdata.html?index="+6; 
	}
	//品&nbsp;种&nbsp;介&nbsp;绍
	$scope.knowVarieties = function(){
		location.href = $scope.indKnowUrl + "knowVarieties.html?index="+7;
	}
	$ionicLoading.hide();

});

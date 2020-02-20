var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $http ,$location,$ionicLoading) {
  
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
	////切换展示
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
	 
	////切换展示
	$scope.awarDate = function(){
		$scope.nowDate;
		$scope.nowDateDay;
		$scope.nowMonth;
		$scope.nowYear;
		$scope.nowYMD;
		for(var i = 0; i < 7; i++) {
			nowDate = new Date();
			nowDateDay = nowDate.getDate(); //日期
			now = new Date(nowDate.getTime() - 86400000 * i);
			nowWeek = now.getDay(); //星期几 
			nowDay = now.getDate(); //日期
			nowMonth = now.getMonth() + 1;
			nowYear = now.getFullYear();
			nowYMD = nowYear.toString() + nowMonth + nowDay
			if(nowWeek != 0 && nowWeek != 6) {
				switch(nowWeek) {
					case 1:
						nowWeek = "一";
						break;
					case 2:
						nowWeek = "二";
						break;
					case 3:
						nowWeek = "三";
						break;
					case 4:
						nowWeek = "四";
						break;
					case 5:
						nowWeek = "五";
						break;
				} 
				awarDay.unshift(nowDay)
				awarweek.unshift(nowWeek)
				awarDat.unshift(nowYMD)
			}
		}
		//receiveObj.awarHtml();
	}
	

});
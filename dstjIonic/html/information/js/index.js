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
  
	$scope.myVar1 = false;
	$scope.myVar2 = true;
	$scope.myVar3 = true;
	//$scope.myVar = false;
	//颜色 
	$scope.indTrades = "indTrades";
	$scope.indGuides = "indGuides";
	$scope.indKnows = "indKnows";
//	indTrade  交易规则 
//	indGuide  使用指南 
//	indKnow   投资知识

	$scope.infoData = new Date().getMonth()+1 + "月" + new Date().getDate()+ "日";
	console.log($scope.infoData);
	//切换展示 交易规则 
	$scope.indTrade = function(){

		if($scope.myVar1 == true){

			$scope.indTrades = "mycol01";
			$scope.indGuides = "othcol";
			$scope.indKnows = "othcol";
			$scope.myVar1 = false; 
			$scope.myVar2 = true;
			$scope.myVar3 = true;
			//$scope.myVar = true;
		}
	}
	////切换展示 使用指南 
	$scope.indGuide = function(){
		if($scope.myVar3 == true){
			$scope.indTrades = "othcol";
			$scope.indGuides = "mycol02";
			$scope.indKnows = "othcol";
			$scope.myVar1 = true; 
			$scope.myVar2 = true;
			$scope.myVar3 = false;
			//$scope.myVar = true;
		}
		
	}
	 
	////切换展示 投资知识 
	$scope.indKnow = function(){
		if($scope.myVar2 == true){
			$scope.indTrades = "othcol";
			$scope.indGuides = "othcol";
			$scope.indKnows = "mycol03";
			$scope.myVar1 = true; 
			$scope.myVar2 = false;
			$scope.myVar3 = true;
			//$scope.myVar = true;
		}
	}
	//	indTrade  首页推荐
	$scope.indTradeUrl = "html/infohome/";
	//1市场营销丨营销策划方案运营管理流程思维
	$scope.dstjInfo01 = function(){
		location.href = $scope.indTradeUrl + "dstjInfo01.html?index="+1;
	}
	//2世界上最伟大的商业模式，核心就这2个字
	$scope.dstjInfo02 = function(){
		location.href =  $scope.indTradeUrl + "dstjInfo02.html?index="+2; 
	}
	//3增长第一难：如何找到撬动目标的大因子
	$scope.dstjInfo03 = function(){
		location.href =  $scope.indTradeUrl + "dstjInfo03.html?index="+3;
	}
	//4成熟公司的体系是什么样的？
	$scope.dstjInfo04 = function(){
		location.href =  $scope.indTradeUrl + "dstjInfo04.html?index="+4;
	}
	//5穷游网、蚂蜂窝等旅游社区前景如何？
	$scope.dstjInfo05 = function(){
		location.href =  $scope.indTradeUrl + "dstjInfo05.html?index="+5;  
	}
	//6如何做好营销管理？
	$scope.dstjInfo06 = function(){
		location.href = $scope.indTradeUrl + "dstjInfo06.html?index="+6;  
	}
	//7如何做好营销管理？
	$scope.dstjInfo07 = function(){
		location.href = $scope.indTradeUrl + "dstjInfo07.html?index="+7;  
	}
	//8如何做好营销管理？
	$scope.dstjInfo08 = function(){
		location.href = $scope.indTradeUrl + "dstjInfo08.html?index="+8;  
	}
	//9如何做好营销管理？
	$scope.dstjInfo09 = function(){
		location.href = $scope.indTradeUrl + "dstjInfo09.html?index="+9;  
	}
	//10如何做好营销管理？
	$scope.dstjInfo10 = function(){
		location.href = $scope.indTradeUrl + "dstjInfo10.html?index="+10;  
	}
	
	//	indGuide  实战与市场
	$scope.indGuideUrl = "html/indguide/";
	//怎样把100元的产品卖出300元的感觉？
	$scope.dstjMark01 = function(){
		location.href = $scope.indGuideUrl + "dstjMark01.html?index="+1; 
	}
	//拼多多会终结淘宝和京东,还是会昙花一现?
	$scope.dstjMark02 = function(){
		location.href = $scope.indGuideUrl + "dstjMark02.html?index="+2; 
	}
	//如何消除消费者购买时的顾虑？
	$scope.dstjMark03 = function(){
		location.href = $scope.indGuideUrl + "dstjMark03.html?index="+3; 
	}
	//为什么那些广告很low，却是爆款
	$scope.dstjMark04 = function(){
		location.href = $scope.indGuideUrl + "dstjMark04.html?index="+4; 
	}
	//如何借力别人的客户拥有自己的海量客户
	$scope.dstjMark05 = function(){
		location.href = $scope.indGuideUrl + "dstjMark05.html?index="+5; 
	}
	//饭店的杠杆借力营销案例
	$scope.dstjMark06 = function(){
		location.href = $scope.indGuideUrl + "dstjMark06.html?index="+6; 
	}
	
	
	//	indKnow   行业百科
	$scope.indKnowUrl = "html/indknow/";
	//心锚建立法：利用心锚构建与客户的良好关系，并完成销售的过程
	$scope.dstjEncy01 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy01.html?index="+1; 
	}
	//确定性效应
	$scope.dstjEncy02 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy02.html?index="+2;
	}
	//框架效应
	$scope.dstjEncy03 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy03.html?index="+3; 
	}
	//产品升级
	$scope.dstjEncy04 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy04.html?index="+4;
	}
	//叫卖式广告
	$scope.dstjEncy05 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy05.html?index="+5;
	}
	//社会化媒体
	$scope.dstjEncy06 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy06.html?index="+6; 
	}
	//销售周期
	$scope.dstjEncy07 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy07.html?index="+7;
	}
	//闭环营销
	$scope.dstjEncy08 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy08.html?index="+8;
	}
	//自产自销
	$scope.dstjEncy09 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy09.html?index="+9;
	}
	//整合营销
	$scope.dstjEncy010 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy010.html?index="+10;
	}
	//营销投资回报率
	$scope.dstjEncy11 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy11.html?index="+11;
	}
	//市场和营销
	$scope.dstjEncy12 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy12.html?index="+12;
	}
	//价格机制
	$scope.dstjEncy13 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy13.html?index="+13;
	}
	//体验营销
	$scope.dstjEncy14 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy14.html?index="+14;
	}
	//移动营销
	$scope.dstjEncy15 = function(){
		location.href = $scope.indKnowUrl + "dstjEncy15.html?index="+15;
	}
	$ionicLoading.hide();
	//$scope.indTrade();

});

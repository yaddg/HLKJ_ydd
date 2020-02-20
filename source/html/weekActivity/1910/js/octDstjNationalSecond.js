var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var isflag;
var sepVou;

var htmlFont;

var rowNum = 1;
//返回字符
var octArr = [];
//字
var octString1;
var octString2;
var octString3;
//提示
var sepVou;
var octVou

//弹框标记提示
var octFlag;
var receiveObj = {
	isopen: false,

	AppKnow: function() {
		window.location.href = 'hailang://www.hailang.com/native?name=recharge';
	},
	receive: function(data) {

		//回到页面顶部  
		if(data == 0) {
			//中奖50
			sepVou = "";
			octVou = "恭喜您获得50积分";

			$(".FortuneBut").text("朕知道了")
			$(".FortuneBut").unbind("click");

			$(".FortuneImg").attr("src", "http://qiniuapp.mqkji.cn/sprFesSecAlert50.png")
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 1) {
			//中奖100
			sepVou = "";
			octVou = "恭喜您获得100积分";

			$(".FortuneBut").text("朕知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.mqkji.cn/sprFesSecAlert100.png")
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 2) {
			//中奖8
			sepVou = "";
			octVou = "恭喜您获得8元代金券";

			$(".FortuneBut").text("朕知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.mqkji.cn/sprFesSecAlert8.png")
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 3) {
			//中奖8
			sepVou = "";
			octVou = "运气不错哦！<br/>恭喜您获得120元代金券";
			$(".FortuneBut").text("朕知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneBut").css("margin-top", "0.16rem");
			$(".FortuneImg").attr("src", "http://qiniuapp.mqkji.cn/sprFesSecAlert120.png")
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 4) {
			//中奖8
			sepVou = "";
			octVou = "抱歉,您还未达到开宝箱的游戏条件";

			$(".FortuneBut").text("去充值")
			$(".FortuneBut").unbind("click");
			$(".FortuneBut").css("margin-top", "0.16rem");
			isflag = 1;
			$(".FortuneImg").attr("src", "http://qiniuapp.mqkji.cn/sprFesSecAlert.png")
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 5) {
			//个人次数已完
			sepVou = "";
			octVou = "抱歉<br/>您当前开宝箱次数已用完";

			$(".FortuneBut").text("朕知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneBut").css("margin-top", "0.16rem");
			$(".FortuneImg").attr("src", "http://qiniuapp.mqkji.cn/sprFesSecAlert.png")
			receiveObj.myObtain(octVou, sepVou);
		} else {
			//活动总次数已完
			sepVou = "";
			octVou = data;

			$(".FortuneBut").text("朕知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneBut").css("margin-top", "0.16rem");
			$(".FortuneImg").attr("src", "http://qiniuapp.mqkji.cn/sprFesSecAlert.png")
			receiveObj.myObtain(octVou, sepVou);
		}
	},
	myObtain: function(desc, heci) {
		$("#drawDesc").text(heci);
		$("#heci").html(desc);
		$("#myObtainImg").css("display", "block");
		$("#myObtain").css("display", "block");
	},
	closeObtain: function() {
		//				$("#myObtain").css("display", "none");
		//				$(".robShadow").css("display", "block");
		if(isflag == true) {
			isflag == false
			window.location.href = 'hailang://www.hailang.com/native?name=recharge';
			//window.location.href = 'hailang://www.hailang.com/native?name=home&index=1';
		} else {
			location.reload();
		}
	},
	closeTips: function() {
		location.reload();
		//$("#mySupernatant").css("display", "none");
	},
	//活动规则
	octTips: function() { 
		$(".mySupernatant").css("background", "rgba(119,34,225,1)");
		//活动规则
		$("#myTip").css("display", "block");
		//获奖记录
		$("#myRecord").css("display", "none");
		$("#mySupernatant").css("display", "block");
	},
	//排行榜规则
	octCardPrize: function() { 
		
		$(".mySupernatant").css("background", "rgba(249,65,43,1)");
		//活动规则
		$("#myTip").css("display", "none");
		//获奖记录
		$("#myRecord").css("display", "block");
		$("#mySupernatant").css("display", "block");
	},
	//奖品展示关闭
	octCardPrizeClose: function() {
		//奖品展示关闭 
		$("#myPrize").css("display", "none");
	},
	//排行榜
	novRankingList: function(data) {
		//历史记录
		console.log(data)
		var str1 = '';
		var str2 = '';
		var dataReward;
		var novRanking; //名次

		var novNum; //手机号
		var novWinNum; //盈利金额

		var novReward; //奖励 
		//      "nickName": "dstj549024",				用户昵称
		//      "mobile": "135****0888",                用户手机号
		//      "closeProfit": 1000                     盈利金额
		$.each(data, function(i, item) {

			novNum = item.mobile;
			novWinNum = item.closeProfit;
			//novReward = item.convertReward;
			if(rowNum == 1) {
				if(i == 0) {
					$(".RechCardIpT01").html(novNum);
					$(".RechCardMonT02").html(novWinNum+"元");
					$(".RechCardTxtT03").html("盈利金额");
					$(".RechCardImg02 img").attr("src","http://qiniuapp.hailangkeji.com/octDstjNatSecWin01.png");
				} else if(i == 1) {
					$(".RechCardIpO01").html(novNum);
					$(".RechCardMonO02").html(novWinNum+"元");
					$(".RechCardTxtO03").html("盈利金额");
					$(".RechCardImg01 img").attr("src","http://qiniuapp.hailangkeji.com/octDstjNatSecWin02.png");
				} else if(i == 2) {
					$(".RechCardIpTh01").html(novNum);
					$(".RechCardMonTh02").html(novWinNum+"元");
					$(".RechCardTxtTh03").html("盈利金额");
					$(".RechCardImg03 img").attr("src","http://qiniuapp.hailangkeji.com/octDstjNatSecWin03.png");
				} else {

					novRanking = i + 1;

//					if(novRanking > 3 && novRanking < 11) {
//						novReward = "800元";
//					} else if(novRanking > 10 && novRanking < 21) {
//						novReward = "400元";
//					} else if(novRanking > 20 && novRanking < 51) {
//						novReward = "200元";
//					} else {
//						novReward = "0元";
//					}
					str1 += '<li><div>' + novRanking + '</div>';
					str1 += '<div>' + novNum + '</div>';
					str1 += '<div>' + novWinNum + '元</div>';
					str1 += '</li>';
				}
			} else {
				novRanking = i + 1 + ((rowNum - 1) * 10);

//				if(novRanking > 3 && novRanking < 11) {
//					novReward = "800元";
//				} else if(novRanking > 10 && novRanking < 21) {
//					novReward = "400元";
//				} else if(novRanking > 20 && novRanking < 51) {
//					novReward = "200元";
//				} else {
//					novReward = "0元";
//				}
				str1 += '<li><div>' + novRanking + '</div>';
				str1 += '<div>' + novNum + '</div>';
				str1 += '<div>' + novWinNum + '</div>';
				str1 += '</li>';
			}
		});
		rowNum = rowNum + 1;

		if(data.length > 3 && data.length < 10) {
			str1 += '<div class="decLoadmore" onclick="receiveObj.closeObtain()">暂无更多数据，快来冲击榜单</div>';
		} else if(data.length == 10) {
			str1 += '<div class="decLoadmore" onclick="receiveObj.octData()">加载更多</div>';
		} else {
			str1 += '<div class="decLoadmore"><img class="emptyImg" src="http://qiniuapp.hailangkeji.com/octDstjNatSecEmp.png" onclick="return false" /><br/>暂无更多数据，快来冲击榜单哦~</div>';
		}
		$("#tossContRankUl").html(str1);
		$("#tossContRankUl li").css("border-bottom", "1px solid #EFEFEF");
		//		$("#myTip").css("display", "none");
		//		$("#myRecord").css("display", "block");
		//		$("#mySupernatant").css("display", "block");

	},
	//预加载页面
	octData: function() {
		console.log(rowNum);
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/profitLeaderBoard",
			data: {
				memberId: memberId,
				page: rowNum,
				pageSize: 10
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var data = data.data;

					if(data.status == 1) {
						$(".RechCardRecord").html("活动未开始");
					} else if(data.status == 2) {
						//排行榜
						$(".RechCardRecord").html("活动已结束");
						//$(".RechCardRecord").click(receiveObj.octScratch);
					} else if(data.status == 5) {
						var proTime = data.currentTime; //当前时间
						var proMoney = data.profitAmount || 0; //当前盈利
						var proRank = data.memberRank || "---"; //当前名次
						var proLastRank = data.gapProfitAmount || 0; //当前居上一名
						var proRank200; //当前居前200
						var proLastTxt;//
						if(proRank == -1){
							proRank = "---";
							proRank200 = proLastRank;
							proLastTxt = "距离前200名还差：<span>"+proRank200+"元</span>";
							$(".contentCardP02 span").html(proRank);
						}else{
							proLastTxt = "距离上一名次还差：<span>"+proLastRank+"元</span>";
							$(".contentCardP02").html("您当前名次：<span>" + proRank + "名</span>");
							
						}
						
						$(".contentCardP01 label").html(proTime);
						$(".contentCardP01 span").html(proMoney + "元");
						$(".contentCardP03").html(proLastTxt);
						
						var proRankList = data.leaderBoardList; //排行榜
						
						if(proRankList == null || proRankList == undefined || proRankList == [] || proRankList == "") {
							return;
						}
						//排行榜
						receiveObj.novRankingList(proRankList);
						//$(".RechCardRecord").click(receiveObj.octScratch);
					} else {

					}

				} else if(data.code == 500) {
					alert(data.desc);
				} else {
					alert("系统错误");
				}
			},
			error: function(er) {
				console.log(er);
				alert("系统错误" + er);
			}
		});
	}
}
window.onload = function() {

	rqstParamsObj = getTheRequestParams(); //加载页面参数
	//receiveObj.init();
	receiveObj.octData();
	//活动规则
	$(".novRule").click(receiveObj.octTips);
	$(".novListRule").click(receiveObj.octCardPrize); 
	
}
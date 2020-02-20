var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var isflag;
var sepVou;
var octVou;

var novFlag = "0";

var leftNum = 0;
var packetSize;
var rechAlertId = 0;

var receiveObj = {
	isopen: false,

	AppKnow: function() {
		window.location.href = 'hailang://www.hailang.com/native?name=recharge';
	},
	init: function() {
		var htmlWidth = document.documentElement.clientWidth;
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var htmlHeight = document.body.scrollHeight; //body高度
		var htmlFont = htmlWidth / 360 * 100;
		$("html").css("font-size", htmlFont + "px");
		var myObtainHeight = $(".RechTip").position().top + 10;
		console.log(myObtainHeight)
		$("body").css("height", myObtainHeight + "px");
		$("html").css("height", myObtainHeight + "px");
		$("#myObtain").css("height", myObtainHeight + "px");
	},
	receive: function(data) {
		var sepVou;
		//回到页面顶部  
		if(data == 0) {
			//没有投资次数
			sepVou = "抱歉，您还未达到刮奖的投资条件~";
			receiveObj.myObtain(sepVou, "");
			$(".FortuneBut").text("去投资")
			isflag = true;
			$(".FortuneBut").attr("onclick", "receiveObj.closeObtain()");
		}
	},
	myObtain: function(desc, heci) {
		$("#drawDesc").html(desc);
		$("#heci").html(heci);
		$("#myObtainImg").css("display", "block");
		$("#myObtain").css("display", "block");
	},
	closeObtain: function() {
		//				$("#myObtain").css("display", "none");
		//				$(".robShadow").css("display", "block");
		if(isflag == true) {
			isflag == false
			window.location.href = 'hailang://www.hailang.com/native?name=home&index=1';

		} else if(isflag == 0) {
			isflag == false
			$("#myObtain").css("display", "none");
		} else {
			$("#myObtain").css("display", "none");
			//location.reload();
		}
	},
	closeTips: function() {
		$("#mySupernatant").css("display", "none");
	},
	//活动规则
	novTips: function() {
		$("#myTip").css("display", "block");

		$(".mySupernatantTxt>p:first-child").css("color", "#FF4B25");
		$(".mySupernatant").css("background", "rgba(255,75,37,1)");

		$("#myRecord").css("display", "none");
		$("#mySupernatant").css("display", "block");
	},
	//预加载页面
	novData: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/findMemberActivityReward",
			data: {
				memberId: memberId
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var data = data.data;
					var dayTxt = ""; //瓜分金额
					if(data.status == "1") { //未开始
						dayTxt = "活动未开始";
						$("#marCashCouponCardBut").removeClass("marCashCouponCardBut");
						$("#marCashCouponCardBut").addClass("marCashCouponCardAlBut");
						$("#marCashCouponCardBut").html("活动未开始");
						$(".marCashCouponNumTxt").html(dayTxt);
						return;
					} else if(data.status == "2") { //已结束
						dayTxt = "活动已结束";
						$("#marCashCouponCardBut").removeClass("marCashCouponCardBut");
						$("#marCashCouponCardBut").addClass("marCashCouponCardAlBut");
						$("#marCashCouponCardBut").html("活动已结束")
						$(".marCashCouponNumTxt").html(dayTxt);
						return;
					} else if(data.status == "4") { //未领取
						$("#marCashCouponCardBut").attr("onclick", "receiveObj.novExchange();");
						return;
					} else { //开始
						//	"gapAmount": 0,差多少钱 满400
						//  "days": 1,累计满足天数
						//  "expectedReward": 32 预计获得奖励
						var currentDateCash = data.gapAmount; //投资金额
						var days = data.days; //投资天数
						var expectedReward = data.expectedReward; //预计获得奖励

						//						if(currentDateCash > 399) {
						//							if(dayWin == 0) {
						//								novOberScr(0);
						//							} else {
						//								novOberScr(1);
						//							}
						//						}
						//var joinTime = data.joinTime; //领取时间
						if(currentDateCash == undefined || currentDateCash == null || currentDateCash == ""){
							currentDateCash= 0;
						}
						if(days == undefined || days == null || days == ""){
							days= 0;
						}
						if(expectedReward == undefined || expectedReward == null || expectedReward == ""){
							expectedReward= 0;
						}
						//console.log(couponReward)
						$("#marCashCouponCardBut").removeClass("marCashCouponCardBut");
						$("#marCashCouponCardBut").addClass("marCashCouponCardAlBut");

						$("#marCashCouponCardBut").html("已领取资格");

						$(".marCashCouponCardTxt").html("");
						//alert(currentDateCash);
						if(currentDateCash>0){
							$(".marCashCouponInve span").html(currentDateCash);
						}else{
							$(".marCashCouponInve").html("今日已满足投资400元");
						}
						

						$(".marCashCouponDay").html(days);

						$(".marCashCouponNum").html(expectedReward);

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
	},
	//领取资格
	novExchange: function() {

		$.ajax({
			url: hltjDomainUrl + "/activity/joinActivity",
			data: {
				memberId: memberId
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					location.reload();
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
	},
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

}
window.onload = function() {

	rqstParamsObj = getTheRequestParams(); //加载页面参数
	receiveObj.novData();

	$("#marCashCouponCardBut").addClass("marCashCouponCardBut");
	$(".noviceWelfareDstjBut").on("click", function() {
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
			window.location.href = hltjAppObj.openUrl;
		} else {
			window.location.href = hltjAppObj.appLoginUrl;
		}
	});
	//	addChannelVisitRecord(); //添加渠道访问记录  
}

function novOberScr(num) {
	var prizeType = num;

	if(prizeType == 0) {
		//积分不足
		sepVou = "今日投资金额已完成啦";
		octVou = "恭喜您！"
			//		$(".FortuneBut").css("margin-top", "0.18rem");
			//		$(".FortuneHint").css("margin-top", "1.08rem");

		$(".myObtainImg").css("background-image", "url(https://jpg.hailangkj.cn/aprCarveUpAlertBg.png)");
		$(".FortuneBut").text("我知道了");
		receiveObj.myObtain(octVou, sepVou);
	} else if(prizeType == 1) {
		//积分不足
		sepVou = "恭喜您成功完成投资任务";
		octVou = "棒棒哒!"
			//		$(".FortuneBut").css("margin-top", "0.18rem");
			//		$(".FortuneHint").css("margin-top", "1.08rem");

		$(".myObtainImg").css("background-image", "url(https://jpg.hailangkj.cn/aprCarveUpAlertBg.png)");
		$(".FortuneBut").text("我知道了");
		receiveObj.myObtain(octVou, sepVou);
	} else if(prizeType == 7) {
		//活动未开始
		sepVou = "";
		octVou = "活动未开始！"
			//		$(".FortuneBut").css("margin-top", "0.18rem");
			//		$(".FortuneHint").css("margin-top", "1.08rem");

		$(".myObtainImg").css("background-image", "url(https://jpg.hailangkj.cn/aprCarveUpAlertBg.png)");
		$(".FortuneBut").text("我知道了");
		receiveObj.myObtain(octVou, sepVou);
	} else if(prizeType == 8) {
		//活动已结束 
		sepVou = "";
		octVou = "活动已结束 ！"
			//		$(".FortuneBut").css("margin-top", "0.18rem");
			//		$(".FortuneHint").css("margin-top", "1.08rem");

		$(".myObtainImg").css("background-image", "url(https://jpg.hailangkj.cn/aprCarveUpAlertBg.png)");
		$(".FortuneBut").text("我知道了");
		receiveObj.myObtain(octVou, sepVou);
	}

}

function chk(num) {
	return(num % 2 == 0) ? true : false; //判断是否能整除2
}
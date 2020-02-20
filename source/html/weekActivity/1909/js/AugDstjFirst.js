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
	init: function() {
		var htmlWidth = document.documentElement.clientWidth;
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var htmlHeight = document.body.scrollHeight; //body高度
	},
	receive: function(data) {
		
		//回到页面顶部  
		if(data == 0) {
			//活动未开始
			sepVou = "";
			octVou = "活动未开始";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 1) {
			//抽奖次数已达上限
			sepVou = "";
			octVou = "抽奖次数已达上限<br/>留点给新朋友吧";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");

			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("top", "1.04rem");
			
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 2) {
			//条件不足赶紧去投资吧
			sepVou = "";
			octVou = "抱歉，您的当前投资 <br/>条件不足赶紧去投资吧！";
			isflag = true;
			$(".FortuneBut").text("马上投资")
			
			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("top", "1.04rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 8) {
			//中奖8
			sepVou = "";
			octVou = "恭喜您获得8元代金券";
			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");
			
			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.54rem");
			$(".FortuneBut").css("top", "1.76rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg8.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 16) {
			//中奖16
			sepVou = "";
			octVou = "恭喜您获得16元代金券";

			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");

			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.54rem");
			$(".FortuneBut").css("top", "1.76rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg16.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 40) {
			//中奖40
			sepVou = "";
			octVou = "恭喜您获得40元代金券";

			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");

			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.54rem");
			$(".FortuneBut").css("top", "1.76rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg40.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 80) {
			//中奖80
			sepVou = "";
			octVou = "恭喜您获得80元代金券";

			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");

			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.54rem");
			$(".FortuneBut").css("top", "1.76rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg80.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 120) {
			//中奖120
			sepVou = "";
			octVou = "恭喜您获得120元代金券";

			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");

			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.54rem");
			$(".FortuneBut").css("top", "1.76rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg120.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 50) {
			//中奖50
			sepVou = "";
			octVou = "恭喜您获得50积分<br/>（积分实时到账）";

			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");
			
			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.4rem");
			$(".FortuneBut").css("top", "1.56rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg50.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 100) {
			//中奖100
			sepVou = "";
			octVou = "恭喜您获得100积分<br/>（积分实时到账）";

			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");

			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.4rem");
			$(".FortuneBut").css("top", "1.56rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg100.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 200) {
			//中奖200
			sepVou = "";
			octVou = "恭喜您获得200积分<br/>（积分实时到账）";

			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");

			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.4rem");
			$(".FortuneBut").css("top", "1.56rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg200.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 400) {
			//中奖400
			sepVou = "";
			octVou = "恭喜您获得400积分<br/>（积分实时到账）";

			$(".FortuneBut").text("继续抽奖")
			$(".FortuneBut").unbind("click");

			$(".myObtainImg").css("height","2.5rem");
			$(".FortuneHint").css("top", "1.4rem");
			$(".FortuneBut").css("top", "1.56rem");
			$(".myObtainImg").css("background-image", "url(http://qiniuapp.hailangkeji.com/augDstjFirstBg400.png)");
			receiveObj.myObtain(octVou, sepVou);
		} else {
			//活动已结束
			sepVou = "";
			octVou = "活动已结束";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
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
			isflag = false;
			window.location.href = 'dasheng://www.dasheng.com/native?name=home&index=1';
			//window.location.href = 'hailang://www.hailang.com/native?name=home&index=1';
		} else {
			location.reload();
		}
	},
	closeTips: function() {
		$("#mySupernatant").css("display", "none");
	},
	//获奖记录
	octScratch: function() {

		$("#myTip").css("display", "none");
		$("#myRecord").css("display", "block");
		$("#mySupernatant").css("display", "block");

		//$("#mySupernatant").css("background-color", "#FF9730");
		//$("#mySupernatant").css("background-image", "url(http://qiniuapp.hailangkeji.com/juneFestivalPrizeBg.png)");
	},
	//滚动播出
	novAwardRecord: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/inviteAndCouponNotify",
			data: {},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				//receiveObj.novAwardRecord(tidings);
				if(data.code == 0) {
					var data = data.data;
					var str1 = '';
					var str2 = '';
					var nickName;
					var reward;
					var inviteNum;
					var time;
					$.each(data, function(i, item) {
						//老王爱吃肉 获得200元代金券
						nickName = item.nickName;
						inviteNum = item.type; //1券2积分
						reward = item.reward;
						if(nickName == undefined || nickName == null || nickName == "") {
							nickName = "大圣淘金";
						}
						if(inviteNum == 1) {
							inviteNum = "元代金券";
						} else {
							inviteNum = "积分";
						}
						if(reward == undefined || reward == null || reward == "") {
							reward = "0";
						}
						str1 += '<li>恭喜' + nickName + '<span>获得' + reward + inviteNum + '</span></li>';
						$("#ul1").html(str1)
					});
					$('.secCardTipNumList').liMarquee({
						direction: 'up',
						scrollamount: 25,
						hoverstop: false,
						drag: false
					});
				} else if(data.code == 500) {
					console.log(data.desc);
					//alert(data.desc);
				} else {
					alert("系统错误");
				}
			},
			error: function(er) {
				console.log(er);
				receiveObj.shortLinks();
				alert("系统错误" + er);
			}
		});
	},
	//预加载页面
	octData: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/inviteAndCouponReward",
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
				//receiveObj.novAwardRecord(tidings);
				if(data.code == 0) {
					var data = data.data;
					receiveObj.status = data.status;
					//  "sumIntegralLottery": 400,					积分获取总奖励
					//  "sumCouponLottery": 0,						代金券获取总奖励
					//  "count": 1,									抽取次数
					//  "leaving": 7,								剩余次数
					//  "gapAmount": 200,							距离300差多少
					//  "status": 5									1 活动未开始  2 活动已结束  3 已领取资格  4 未领取资格 5 进行中
					if(data.status == 5) {
						var count = data.count; //抽取次数 
						var prizeVo = data.prizeVo; //详细奖励
						receiveObj.sumIntegralLottery = data.sumIntegralLottery; //积分获取总奖励
						receiveObj.sumCouponLottery = data.sumCouponLottery; //代金券获取总奖励
						receiveObj.leaving = data.leaving; //剩余次数
						if(receiveObj.leaving == null || receiveObj.leaving == undefined || receiveObj.leaving == ""){
							receiveObj.leaving = 0;
						}
						receiveObj.gapAmount = data.gapAmount; //距离300差多少

						$(".augDstjFirstIconUp span").html(receiveObj.gapAmount);

						$(".RechCardNum span").html(receiveObj.leaving + "次");

						var str1 = '';
						var str2 = '';
						var prizeDesc; //获得prizeDesc
						var prizeCount; //获得prizeCount

						var prizeType; //1、代金券2、积分 
						var prizeTypeTxt;
						$.each(prizeVo, function(i, item) {
							//老王爱吃肉 获得200元代金券
							prizeDesc = item.prizeDesc;
							prizeCount = item.prizeCount;
							prizeType = item.prizeType;
							
							if(prizeType == 1) {
								prizeTypeTxt = "张";
							} else {
								prizeTypeTxt = "次";
							}
							if(prizeCount>0){
								str1 += '<li>获得' + prizeDesc + '<span>' + prizeCount + prizeTypeTxt + '</span></li>';
							}
							$("#optionBgLi").html(str1)
						});
						//$("#optionBgLi").html(str)
						receiveObj.novAwardRecord();
					} else if(data.status == 1) {
						//receiveObj.receive(0);
					} else if(data.status == 2) {
						//receiveObj.receive();
					} else {
						receiveObj.receive();
					}
					//打开
					$(".augDstjFirstGoBut").click(receiveObj.octAction);
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
	//开箱子
	octAction: function() {
		var div = $(".augDstjFirstGoBut");
		div.css("animation-play-state", "paused");
		if(receiveObj.status == 1){
			receiveObj.receive(0);
			return;
		}else if(receiveObj.status == 2){
			receiveObj.receive();
			return;
		}
		//		div.animate({
		//			height: '1.65rem',
		//			marginTop: '-0.2rem'
		//		}, "slow");
		//		div.animate({
		//			width: '1.65rem',
		//			marginLeft: '-0.2rem'
		//		}, "slow");
		//		div.animate({
		//			height: '1.25rem',
		//			marginTop: '0.2rem'
		//		}, "slow");
		//		div.animate({
		//			width: '1.25rem',
		//			marginLeft: '0.2rem'
		//		}, "slow");
		//		return;
		//		if(receiveObj.secTipAll < 1) {
		//			var dataTxt = "您来晚一步啦，宝箱次数已经用完哦~~";
		//			receiveObj.receive(dataTxt);
		//			return;
		//		}
		//		if(receiveObj.memberPacket >=10) {
		//			receiveObj.receive(5);
		//			return;
		//		}
		if(receiveObj.leaving <= 0) {
			receiveObj.receive(2);
			return;
		}
		//var RechCardId = $(this).attr("id");
		$(".augDstjFirstGoBut").off("click");

		$.ajax({
			url: hltjDomainUrl + "/activity/openInviteAndCouponReward",
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
					var prizeStatus = data.prizeStatus; //1 正常  2 抽奖达到上限80次 3 抽奖次数不足
					var prizeSize = data.prizeSize; //奖励
					var prizeType = data.prizeType; //奖励 类型

					if(prizeStatus == 2) {
						receiveObj.receive(2);
						return;
					} else if(prizeStatus == 3) {
						receiveObj.receive(1);
						return;
					} else {

					}
					setTimeout(function() {
						receiveObj.receive(prizeSize)
					}, 200);
				} else if(data.code == 500) {
					//alert(data.desc);
					receiveObj.receive();
				} else {
					receiveObj.receive();
					//alert("系统错误");
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

	receiveObj.octData();
	//	$('.secCardTipNumList').liMarquee({
	//		direction: 'up',
	//		scrollamount: 25,
	//		hoverstop: false,
	//		drag: false
	//	});
	//活动规则
	//$(".novRule").click(receiveObj.octTips);
	//获奖记录
	$(".augDstjFirstArrow").click(receiveObj.octScratch);
	
	//receiveObj.receive();
	//	addChannelVisitRecord(); //添加渠道访问记录 
	//	receiveObj.rechData(); 
	//receiveObj.receive(1);
}
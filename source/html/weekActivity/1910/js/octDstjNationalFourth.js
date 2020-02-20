var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var isflag;

var rowNum = 1;
//返回字符
var midAutumn = "暂无抽奖次数（您有0次 领取抽奖机会，待领取）";
//提示
var sepVou;
var octVou

//弹框标记提示
var octFlag;
//未领取次数
var octExchangeNum = 0;
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
		} else if(data == 99) {
			//抽奖次数已达上限
			sepVou = "";
			octVou = "您的奖励已达上限";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			//$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlertAll.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			//$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 55) {
			//条件不足赶紧去投资吧
			sepVou = "";
			octVou = "暂无抽奖次数";
			isflag = true;
			$(".FortuneBut").text("马上投资");

			//$(".FortuneImg").attr("src","http://qiniuapp.hailangkeji.com/sepDstjMidAutAlertAll.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 8) {
			//中奖8
			sepVou = "";
			octVou = "恭喜您获得8元代金券";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/octDstjNatFourthAlert8.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 50) {
			//中奖50
			sepVou = "";
			octVou = "恭喜您获得50积分";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/octDstjNatFourthAlert50.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 64) {
			//中奖64
			sepVou = "";
			octVou = "恭喜您获得64元代金券";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/octDstjNatFourthAlert64.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 200) {
			//中奖200
			sepVou = "";
			octVou = "恭喜您获得200元代金券";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/octDstjNatFourthAlert200.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 202) {
			//中奖200积分
			sepVou = "";
			octVou = "恭喜您获得200积分";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/octDstjNatFourthAlert200s.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 400) {
			//中奖400积分
			sepVou = "";
			octVou = "恭喜您获得400积分";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/octDstjNatFourthAlert400.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 502) {
			//兑换失败
			sepVou = "";
			octVou = midAutumn;
			//isflag = true;
			$(".FortuneBut").text("我知道了");

			//$(".FortuneImg").attr("src","http://qiniuapp.hailangkeji.com/sepDstjMidAutAlertAll.png");
			$(".FortuneBut").css("margin-top", "0.18rem");
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
	RechCardRecord: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/myTreasureDrawInfo ",
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
					if(data == undefined || data == null || data == "") {
						return;
					}
					data = data.treasureDrawVo;
					console.log(data);
					var str1 = '';
					var str2 = '';
					var prizeDesc; //获得prizeDesc
					var prizeCount; //获得prizeCount

					var prizeType; //1、代金券2、积分 
					var prizeNum;
					
					var prizeIntNum=0;//积分额度
					var prizeAllNum=0;//奖励总额度
					$.each(data, function(i, item) {
						//"prizeSize": 8,奖励额度
						//"prizeType": 1,1 代金券  2 积分
						//"num": 1    获得次数
						//prizeDesc = item.prizeDesc;
						prizeCount = item.prizeSize; //奖励额度
						prizeType = item.prizeType; //1 代金券  2 积分
						prizeNum = item.num; //获得次数

						if(prizeType == 1) {
							str1 += '<li>恭喜您获得' + prizeCount + '元代金券<span>' + prizeNum + '次</span></li>';
							
						} else if(prizeType == 2) {
							prizeIntNum = prizeCount*prizeNum;
							prizeAllNum = prizeAllNum + prizeIntNum;
						}
						
					});
					str1 += '<li>恭喜您获得积分共计<span>' + prizeAllNum + '积分</span></li>';
					$("#optionBgLi").html(str1);
				} else if(data.code == 500) {
					console.log(data.desc);
					//alert(data.desc);
				} else {
					alert("系统错误");
				}
			},
			error: function(er) {
				console.log(er);
				//receiveObj.shortLinks();
				alert("系统错误" + er);
			}
		});
		$("#myTip").css("display", "none");
		$("#myRecord").css("display", "block");
		$("#mySupernatant").css("display", "block");

		//$("#mySupernatant").css("background-color", "#FF9730");
		$("#mySupernatant").css("background-color", "#FF9730");
	},
	//活动规则
	novRuleTip: function() {
		$("#myTip").css("display", "block");
		$("#myRecord").css("display", "none");
		$("#mySupernatant").css("display", "block");

		//$("#mySupernatant").css("background-color", "#FF9730");
		$("#mySupernatant").css("background-color", "#FF4716");
	},

	//滚动播出
	novAwardRecord: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/treasureNotify",
			data: {},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var data = data.data;
					if(data == undefined || data == null || data == "") {
						return;
					}
					console.log(data);
					var str = '';
					var nickName;
					var reward;
					$.each(data, function(i, item) {
						//老王爱吃肉 获得200元代金券
						nickName = item.nickName;
						//inviteNum = item.exchangeType; //1.400积分，2.8，3.120，4.400
						reward = item.reward;
						if(nickName == undefined || nickName == null || nickName == "") {
							nickName = "大圣淘金";
						}

						str += '<li>恭喜' + nickName + '<span>获得' + reward + '元代金券</span></li>';
						$("#ul1").html(str)
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
				//receiveObj.shortLinks();
				alert("系统错误" + er);
			}
		});
	},
	//预加载页面
	octData: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/treasureLoadingInfo",
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
					console.log(data.status);
					receiveObj.status = data.status;
					//  "leaving": 7,								剩余次数 
					//  "status": 5		1 活动未开始  2 活动已结束  3 已领取资格  4 未领取资格 5 进行中

					if(data.status == 5) {
						var levelAndNumberVo = data.levelAndNumberVo; //可兑换 
						receiveObj.leaving = data.leaving; //剩余次数
						if(receiveObj.leaving == null || receiveObj.leaving == undefined || receiveObj.leaving == "") {
							receiveObj.leaving = 0;
						}

						$(".contBoxTxt span").html(receiveObj.leaving + "次");
						//获取可兑换次数
						var str1 = '';
						var str2 = '';
						var level;
						var reward;
						$.each(levelAndNumberVo, function(i, item) {
							//老王爱吃肉 获得200元代金券
							level = item.level; //level：档位  4 单笔120   2单笔64    1单笔40 
							reward = item.number || 0; // 可以领取的次数
							octExchangeNum = octExchangeNum + reward;
							if(level == 1) {
								$(".sepCardTxt01 span").html(reward + "次");
								if(reward > 0) {
									$("#sepCardBut01").on("click", function() {
										receiveObj.sepQueryMoonExch(1);
									})
									$("#sepCardBut01").removeClass("sepCardAlBut");
									$("#sepCardBut01").addClass("sepCardBut");
								}
//								else {
//									$("#sepCardBut01").toggleClass("sepCardAlBut");
//								}
							} else if(level == 2) {
								$(".sepCardTxt02 span").html(reward + "次");
								if(reward > 0) {
									$("#sepCardBut02").on("click", function() {
										receiveObj.sepQueryMoonExch(2);
									})
									$("#sepCardBut02").removeClass("sepCardAlBut");
									$("#sepCardBut02").addClass("sepCardBut");
								}
//								else {
//									$("#sepCardBut02").toggleClass("sepCardAlBut");
//								}
							} else if(level == 4) {
								$(".sepCardTxt03 span").html(reward + "次");
								if(reward > 0) {
									$("#sepCardBut03").on("click", function() {
										receiveObj.sepQueryMoonExch(4);
									})
									$("#sepCardBut03").removeClass("sepCardAlBut");
									$("#sepCardBut03").addClass("sepCardBut");
								}
//								else {
//									$("#sepCardBut03").toggleClass("sepCardAlBut");
//								}
							} else {
								return
							}

						});
						receiveObj.novAwardRecord();
						//receiveObj.sepQueryMoon();
					} else if(data.status == 1) {
						//receiveObj.receive(0);
					} else if(data.status == 2) {
						//receiveObj.receive();
					} else {
						receiveObj.receive();
					}
					//打开
					$(".contBoxOpen").click(receiveObj.octAction);
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
	//兑换
	sepQueryMoonExch: function(num) {

		$(".sepCardBut").off("click");
		console.log(num);
		$.ajax({
			url: hltjDomainUrl + "/activity/receiveTreasureNum",
			data: {
				memberId: memberId,
				level: num
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var data = data.data;

					if(data.receivingStatus == 0) {
						midAutumn = "兑换失败！"
						receiveObj.receive(502);
						return;
					}
					location.reload();
				} else if(data.code == 500) {
					//alert(data.desc);
					midAutumn = data.desc;
					receiveObj.receive(502);
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
	},
	//开月饼
	octAction: function() {
		//		var div = $(".augDstjFirstGoBut");
		//		div.css("animation-play-state", "paused");
		if(receiveObj.status == 1) {
			receiveObj.receive(0);
			return;
		} else if(receiveObj.status == 2) {
			receiveObj.receive();
			return;
		}
		if(receiveObj.leaving <= 0) {
			if(octExchangeNum > 0) {
				midAutumn = "暂无抽奖次数（您有" + octExchangeNum + "次 领取抽奖机会，待领取）";
				receiveObj.receive(502);
			} else {
				receiveObj.receive(55);
			}
			return;
		}

		$(".contBoxOpen").off("click");

		$.ajax({
			url: hltjDomainUrl + "/activity/openTreasure",
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
					if(data.prizeStatus == 2) {
						//midAutumn = "未中奖，再来一次！"
						receiveObj.receive(99);
						return;
					} else if(data.prizeStatus == 3) {
						receiveObj.receive(55);
						return;
					}

					var prizeType = data.prizeType; // 1 代金券 2 积分 
					var prizeSize = data.prizeSize;
					var prizeNum;
					if(prizeSize == 8) {
						//receiveObj.receive(4);
						prizeNum = 8;
					} else if(prizeSize == 50) {
						//receiveObj.receive(2);
						prizeNum = 50;
					} else if(prizeSize == 64) {
						//receiveObj.receive(5);
						prizeNum = 64;
					} else if(prizeSize == 200) {
						if(prizeType == 1) {
							prizeNum = 200;
						} else {
							prizeNum = 202;
						}
					} else if(prizeSize == 400) {
						prizeNum = 400;
						//receiveObj.receive(1);
					} else {
						prizeNum = "";
					}
					setTimeout(function() {
						receiveObj.receive(prizeNum)
					}, 200);
				} else if(data.code == 500) {
					//alert(data.desc);
					midAutumn = data.desc;
					receiveObj.receive(502);
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

	//$("#sepCardBut01").toggleClass("sepCardAlBut");
	//活动规则
	$(".novRule").click(receiveObj.novRuleTip);
	//获奖记录
	$(".contBoxMyExc").click(receiveObj.RechCardRecord);

	//receiveObj.novAwardRecord();
	//	addChannelVisitRecord(); //添加渠道访问记录 
	//	receiveObj.rechData(); 
	//receiveObj.receive(64);
}
var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var isflag;

var rowNum = 1;
//返回字符
var midAutumn = "兑换失败，还差五仁、 豆沙、鲜肉、莲蓉、蛋黄月饼";
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
		} else if(data == 99) {
			//抽奖次数已达上限
			sepVou = "";
			octVou = "您的奖励已达上限<br/>留点给小白吧";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlertAll.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 55) {
			//条件不足赶紧去投资吧
			sepVou = "";
			octVou = "当前投资金额不足 <br/>未达到参与资格";
			isflag = true;
			$(".FortuneBut").text("马上投资");

			//$(".FortuneImg").attr("src","http://qiniuapp.hailangkeji.com/sepDstjMidAutAlertAll.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 1) {
			//蛋黄
			sepVou = "";
			octVou = "恭喜您抽到蛋黄月饼 <br/>抓紧兑换代金券吧!";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert01.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 2) {
			//豆沙
			sepVou = "";
			octVou = "恭喜您抽到豆沙月饼 <br/>抓紧兑换代金券吧!";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert02.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 3) {
			//莲蓉
			sepVou = "";
			octVou = "恭喜您抽到莲蓉月饼 <br/>抓紧兑换代金券吧!";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert03.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 4) {
			//五仁
			sepVou = "";
			octVou = "恭喜您抽到五仁月饼 <br/>抓紧兑换代金券吧!";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert04.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 5) {
			//鲜肉
			sepVou = "";
			octVou = "恭喜您抽到鲜肉月饼 <br/>抓紧兑换代金券吧!";

			$(".FortuneBut").text("我知道了")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert05.png");
			//			$(".FortuneHint").css("top", "0.94rem");
			$(".FortuneBut").css("margin-top", "0.25rem");

			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 8) {
			//中奖8
			sepVou = "";
			octVou = "8元代金券兑换成功";

			$(".FortuneBut").text("OK")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert8.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 120) {
			//中奖120
			sepVou = "";
			octVou = "120元代金券兑换成功";

			$(".FortuneBut").text("OK")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert120.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 400) {
			//中奖400
			sepVou = "";
			octVou = "成功兑换400元代金券<br/>超棒的!";

			$(".FortuneBut").text("OK")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert400.png");
			$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 402) {
			//中奖400积分
			sepVou = "";
			octVou = "400积分兑换成功";

			$(".FortuneBut").text("OK")
			$(".FortuneBut").unbind("click");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutAlert400s.png");
			//$(".FortuneBut").css("margin-top", "0.25rem");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 502) {
			//兑换失败
			sepVou = "";
			octVou = midAutumn;
			isflag = true;
			$(".FortuneBut").text("马上投资");

			//$(".FortuneImg").attr("src","http://qiniuapp.hailangkeji.com/sepDstjMidAutAlertAll.png");
			$(".FortuneBut").css("margin-top", "0.25rem");
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
			url: hltjDomainUrl + "/activity/showExchange",
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
					if(data==undefined || data== null ||data==""){
						return;
					}
					data = data.exchangeRecords;
					console.log(data);
					var str1 = '';
					var str2 = '';
					var prizeDesc; //获得prizeDesc
					var prizeCount; //获得prizeCount

					var prizeType; //1、代金券2、积分 
					var prizeTypeTxt;
					$.each(data, function(i, item) {
						//老王爱吃肉 获得200元代金券
						//prizeDesc = item.prizeDesc;
						prizeCount = item.exchangeCount;//数量
						prizeType = item.exchangeType;//1.400积分 2.8  3.120  4.400

						if(prizeType == 1) {
							prizeTypeTxt = "恭喜您获得400积分";
						} else if(prizeType == 2) {
							prizeTypeTxt = "恭喜您获得8元代金券";
						} else if(prizeType == 3) {
							prizeTypeTxt = "恭喜您获得120元代金券";
						} else if(prizeType == 4) {
							prizeTypeTxt = "恭喜您获得400元代金券";
						}
						if(prizeCount > 0) {
							str1 += '<li>' + prizeTypeTxt + '<span>' + prizeCount + '次</span></li>';
						}
						$("#optionBgLi").html(str1)
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
		$("#myTip").css("display", "none");
		$("#myRecord").css("display", "block");
		$("#mySupernatant").css("display", "block");

		//$("#mySupernatant").css("background-color", "#FF9730");
		$("#mySupernatant").css("background-image", "url(http://qiniuapp.hailangkeji.com/sepDstjMidAutRecord.png)");
	},
	//活动规则
	novRuleTip: function() {
		$("#myTip").css("display", "block");
		$("#myRecord").css("display", "none");
		$("#mySupernatant").css("display", "block");

		//$("#mySupernatant").css("background-color", "#FF9730");
		$("#mySupernatant").css("background-image", "url(http://qiniuapp.hailangkeji.com/sepDstjMidAutTipBg.png)");
	},

	//滚动播出
	novAwardRecord: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/broadcastRoll",
			data: {},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var data = data.data;
					if(data==undefined || data== null ||data==""){
						return;
					}
					data = data.exchangeRecords;
					console.log(data);
					var str1 = '';
					var str2 = '';
					var nickName;
					var reward;
					var inviteNum;
					var time;
					$.each(data, function(i, item) {
						//老王爱吃肉 获得200元代金券
						nickName = item.nickName;
						inviteNum = item.exchangeType; //1.400积分，2.8，3.120，4.400
						reward = item.reward;
						if(nickName == undefined || nickName == null || nickName == "") {
							nickName = "大圣淘金";
						}
						if(inviteNum == 1) {
							inviteNum = "400积分";
						} else if(inviteNum == 2) {
							inviteNum = "8元代金券";
						} else if(inviteNum == 3) {
							inviteNum = "120元代金券";
						} else if(inviteNum == 4) {
							inviteNum = "400元代金券";
						}

						str1 += '<li>恭喜' + nickName + '已兑换<span>' + inviteNum + '</span></li>';
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
				//receiveObj.shortLinks();
				alert("系统错误" + er);
			}
		});
	},
	//预加载页面
	octData: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/drawNumber",
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
					//  "sumIntegralLottery": 400,					积分获取总奖励
					//  "sumCouponLottery": 0,						代金券获取总奖励
					//  "count": 1,									抽取次数
					//  "leaving": 7,								剩余次数
					//  "gapAmount": 200,							距离300差多少
					//  "status": 5		1 活动未开始  2 活动已结束  3 已领取资格  4 未领取资格 5 进行中

					if(data.status == 5) {
						//var count = data.drawCount; //抽取次数 
						//var prizeVo = data.prizeVo; //详细奖励
						//receiveObj.sumIntegralLottery = data.sumIntegralLottery; //积分获取总奖励
						//receiveObj.sumCouponLottery = data.sumCouponLottery; //代金券获取总奖励
						receiveObj.leaving = data.drawCount; //剩余次数
						if(receiveObj.leaving == null || receiveObj.leaving == undefined || receiveObj.leaving == "") {
							receiveObj.leaving = 0;
						}

						$(".contentCardTxt span").html(receiveObj.leaving + "次");
						receiveObj.sepQueryMoon();
					} else if(data.status == 1) {
						//receiveObj.receive(0);
					} else if(data.status == 2) {
						//receiveObj.receive();
					} else {
						receiveObj.receive();
					}
					//打开
					$(".contentCard02 img").click(receiveObj.octAction);
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
	//查询月饼
	sepQueryMoon: function() {
		$.ajax({
			url: hltjDomainUrl + "/activity/queryMoon",
			data: {
				memberId: memberId
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				receiveObj.novAwardRecord();
				if(data.code == 0) {
					var data = data.data;
					if(data==undefined || data== null ||data==""){
						return;
					}
					//	  "fiveKernelCake": 6,五仁月饼
					//    "freshMeatCake": 7,鲜肉月饼
					//    "yolkCake": 9,蛋黄
					//    "beanPasteCake": 4,豆沙
					//    "lotusPasteCake": 8,莲蓉
					//  "status": 5		1 活动未开始  2 活动已结束  3 已领取资格  4 未领取资格 5 进行中
					receiveObj.fiveKernelCake = data.fiveKernelCake;
					receiveObj.freshMeatCake = data.freshMeatCake;
					receiveObj.yolkCake = data.yolkCake;
					receiveObj.beanPasteCake = data.beanPasteCake;
					receiveObj.lotusPasteCake = data.lotusPasteCake;
					if(receiveObj.fiveKernelCake > 0) {
						$(".myCard04>div").html(receiveObj.fiveKernelCake)
						$(".myCard04>div").css("z-index", "1");
						$(".myCard04").css("background-image", "url(http://qiniuapp.hailangkeji.com/sepDstjMoonCake04.png)");
					};
					if(receiveObj.freshMeatCake > 0) {
						$(".myCard05>div").html(receiveObj.freshMeatCake)
						$(".myCard05>div").css("z-index", "1");
						$(".myCard05").css("background-image", "url(http://qiniuapp.hailangkeji.com/sepDstjMoonCake05.png)");
					};

					if(receiveObj.yolkCake > 0) {
						$(".myCard01>div").html(receiveObj.yolkCake)
						$(".myCard01>div").css("z-index", "1");
						$(".myCard01").css("background-image", "url(http://qiniuapp.hailangkeji.com/sepDstjMoonCake01.png)");
					};

					if(receiveObj.beanPasteCake > 0) {
						$(".myCard02>div").html(receiveObj.beanPasteCake)
						$(".myCard02>div").css("z-index", "1");
						$(".myCard02").css("background-image", "url(http://qiniuapp.hailangkeji.com/sepDstjMoonCake02.png)");
					};
					if(receiveObj.lotusPasteCake > 0) {
						$(".myCard03>div").html(receiveObj.lotusPasteCake)
						$(".myCard03>div").css("z-index", "1");
						$(".myCard03").css("background-image", "url(http://qiniuapp.hailangkeji.com/sepDstjMoonCake03.png)");
					};
					$(".sepCardBut").on("click", function() {
						var idTem = $(this).attr("id");
						var moonTxt = true;
						var moonType;
						var moonNumT;
						var midAutumnJO = new Array();
						if(idTem == "sepCardBut01") {
							moonNumT = 1;
							if(receiveObj.fiveKernelCake < 1) {
								moonType = false;
								midAutumnJO.push("五仁");
							};
							if(receiveObj.beanPasteCake < 1) {
								moonType = false;
								midAutumnJO.push("豆沙");
							};

						} else if(idTem == "sepCardBut02") {
							moonNumT = 2;
							if(receiveObj.fiveKernelCake < 1) {
								moonType = false;
								midAutumnJO.push("五仁");
							};
							if(receiveObj.beanPasteCake < 1) {
								moonType = false;
								midAutumnJO.push("豆沙");
							};
							if(receiveObj.freshMeatCake < 1) {
								moonType = false;
								midAutumnJO.push("鲜肉");
							};
						} else if(idTem == "sepCardBut03") {
							moonNumT = 3;

							if(receiveObj.fiveKernelCake < 1) {
								moonType = false;
								midAutumnJO.push("五仁");
							};
							if(receiveObj.beanPasteCake < 1) {
								moonType = false;
								midAutumnJO.push("豆沙");
							};
							if(receiveObj.freshMeatCake < 1) {
								moonType = false;
								midAutumnJO.push("鲜肉");
							};
							if(receiveObj.lotusPasteCake < 1) {
								moonType = false;
								midAutumnJO.push("莲蓉");
							};
						} else if(idTem == "sepCardBut04") {
							moonNumT = 4;

							if(receiveObj.fiveKernelCake < 1) {
								moonType = false;
								midAutumnJO.push("五仁");
							};
							if(receiveObj.beanPasteCake < 1) {
								moonType = false;
								midAutumnJO.push("豆沙");
							};
							if(receiveObj.freshMeatCake < 1) {
								moonType = false;
								midAutumnJO.push("鲜肉");
							};
							if(receiveObj.lotusPasteCake < 1) {
								moonType = false;
								midAutumnJO.push("莲蓉");
							};
							if(receiveObj.yolkCake < 1) {
								moonType = false;
								midAutumnJO.push("蛋黄");
							};
						};

						if(moonType == false) {
							moonTxt = midAutumnJO.join();
							midAutumn = "兑换失败，还差" + moonTxt + "月饼";
							receiveObj.receive(502);
							return;
						} else {
							receiveObj.sepQueryMoonExch(moonNumT);
						}

					})
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
			url: hltjDomainUrl + "/activity/exchangeCoupons",
			data: {
				memberId: memberId,
				moonType: num
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var data = data.data;
					if(data==undefined || data== null ||data==""){
						midAutumn = "兑换失败！"
						receiveObj.receive(502);
						return;
					}
					var moonSuc = data.moonSuc;
					console.log(moonSuc)
					if(moonSuc == 1) {
						if(num == 1) {
							receiveObj.receive(402);
							return;
						} else if(num == 2) {
							receiveObj.receive(8);
							return;
						} else if(num == 3) {
							receiveObj.receive(120);
							return;
						} else if(num == 4) {
							receiveObj.receive(400);
							return;
						}
					} else if(moonSuc == 2) {
						receiveObj.receive(99);
						return;
					} else if(moonSuc == 3) {
						receiveObj.receive(502);
						return;
					} else {
						receiveObj.receive();
					}
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
			receiveObj.receive(55);
			return;
		}
		//var RechCardId = $(this).attr("id");
		$(".contentCard02 img").attr("src", "http://qiniuapp.hailangkeji.com/sepDstjMidAutButDown.png");
		$(".contentCard02 img").off("click");

		$.ajax({
			url: hltjDomainUrl + "/activity/drawMoon",
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
					if(data==undefined || data== null ||data==""){
						midAutumn = "未中奖，再来一次！"
						receiveObj.receive(502);
						return;
					}
					//var prizeStatus = data.prizeStatus; //1 正常  2 抽奖达到上限80次 3 抽奖次数不足
					//var prizeSize = data.prizeSize; //奖励
					var prizeType = data.prizeType; //月饼样式 1.五仁 2.豆沙，3.鲜肉，4.莲蓉，5.蛋黄
					var prizeSize;
					if(prizeType == 1) {
						//receiveObj.receive(4);
						prizeSize = 4;
					} else if(prizeType == 2) {
						//receiveObj.receive(2);
						prizeSize = 2;
					} else if(prizeType == 3) {
						//receiveObj.receive(5);
						prizeSize = 5;
					} else if(prizeType == 4) {
						//receiveObj.receive(3);
						prizeSize = 3;
					} else if(prizeType == 5) {
						prizeSize = 1;
						//receiveObj.receive(1);
					} else {
						prizeSize = "";
					}
					setTimeout(function() {
						receiveObj.receive(prizeSize)
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
	//活动规则
	$(".novRule").click(receiveObj.novRuleTip);
	//获奖记录
	$(".RechCardRecord").click(receiveObj.RechCardRecord);

	//receiveObj.novAwardRecord();
	//	addChannelVisitRecord(); //添加渠道访问记录 
	//	receiveObj.rechData(); 
	//receiveObj.receive(402);
}
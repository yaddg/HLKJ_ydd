var memberId = getTheRequestParams().memberId;
console.log(memberId)
var playnum = 0;
var countMemberDraw = 0;
var htmlWidth = document.documentElement.clientWidth;
var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
var coupon1;
var coupon2;
var drawObj = {
	myObtain: function(desc, heci) {
		$("#drawDesc").html(desc);
		$("#heci").html(heci);
		$("#myObtainImg").css("display", "block");
		$("#myObtain").css("display", "block");
	},
	closeObtain: function() {
		location.reload();
		//		if(isflag == true) {
		//			isflag == false
		//			window.location.href = 'zhijian://www.zhijian.com/native?name=home&index=4';
		//
		//		} else if(isflag == 0) {
		//			isflag == false
		//			$("#myObtain").css("display", "none");
		//		} else {
		//			location.reload();
		//		}
	},
	myExchange: function(num) {
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
			if(num == 1) {
				//修改头像
				window.location.href = "dasheng://www.dasheng.com/native?name=home&index=3";
			} else if(num == 2) {
				//修改昵称
				window.location.href = "dasheng://www.dasheng.com/native?name=home&index=3";
			} else if(num == 3) {
				//实名认证
				window.location.href = "dasheng://www.dasheng.com/native?name=home&index=3";
			} else if(num == 4) {
				//关注
				window.location.href = "dasheng://www.dasheng.com/native?name=home&index=2";
			} else if(num == 5) {
				//首页
				window.location.href = "dasheng://www.dasheng.com/native?name=home&index=0";
			} else if(num == 6) {
				//充值
				window.location.href = "dasheng://www.dasheng.com/native?name=recharge";
			}
		} else {
			window.location.href = hltjAppObj.appLoginUrl;
		}
	},
	myKnowBook: function() {
		window.location.href = 'indexKnow.html';
	},

	//刷新页面
	newData: function() {
		//		alert(hltjDomainUrl);
		//		alert(memberId);
		if(memberId == "null" || memberId == undefined || memberId == "") {
			$("#proCashCouponDayBut01").on("click", function() {
				window.location.href = "dasheng://www.dasheng.com/native?name=tobuy";
			})
			$("#proCashCouponDayBut02").on("click", function() {
				window.location.href = "dasheng://www.dasheng.com/native?name=home&index=1";
			})
			$("#proCashCouponDayBut03").on("click", function() {
				window.location.href = "dasheng://www.dasheng.com/native?name=home&index=1";
			})
			return;
		}
		//		alert(hltjDomainUrl);
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/task/taskStatusLoad",
			data: {
				memberId: memberId
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					//0.待完成1.已完成
					//headImgStatus; //换头像
					//nicknameStatus;//修改昵称
					//authenticStatus;//实名认证
					//followStatus;//关注达人
					//signStatus;//签到
					//signDayNum;//签到天

					//CouponTaskSet coupon1;//新手任务代金券面额
					//CouponTaskSet coupon2;//每日任务代金券面额
					var data = data.data;
					var headImgStatus = data.headImgStatus; //换头像
					var nicknameStatus = data.nicknameStatus; //修改昵称
					var authenticStatus = data.authenticStatus; //实名认证
					var followStatus = data.followStatus; //关注达人
					var signStatus = data.signStatus; //签到
					var signDayNum = data.signDayNum; //签到天

					coupon1 = data.coupon1; //新手任务代金券面额
					var amount01 = coupon1.amount; //新手代金券面额01
					coupon2 = data.coupon2; //每日任务代金券面额
					var amount02 = coupon2.amount; //新手代金券面额02

					var proBarNum = 0; //进度条
					if(headImgStatus == 1) {
						proBarNum++;
						$(".headKnowIcon01").css("display", "block");
					}
					if(nicknameStatus == 1) {
						proBarNum++;
						$(".headKnowIcon02").css("display", "block");
					}
					if(authenticStatus == 1) {
						proBarNum++;
						$(".headKnowIcon03").css("display", "block");
					}
					if(followStatus == 1) {
						proBarNum++;
						$(".headKnowIcon04").css("display", "block");
					}
					if(signStatus == 1) {
						proBarNum++;
						$(".headKnowIcon06").css("display", "block");
					} else {
						if(signDayNum == "" || signDayNum == null) {
							signDayNum = 0;
						};
						$(".headKnowIcon05 span").html(signDayNum);
						$(".headKnowIcon05").css("display", "block");

					}

					//代金券金额
					$(".proCashCouNum01").html(amount01);
					$(".proCashCouNum02").html(amount02);
					//进度条 
					$(".proBubble span").html(proBarNum);

					var proBarLeng = proBarNum * 20;
					var coupon1Receive = data.coupon1Receive;
					//alert(proBarNum)
					if(proBarNum == 5) {
						$(".proBubble").css("margin-left", "82%");
						$(".proBubble").css("background-image", "url(http://qiniuapp.hailangkeji.com/newDstjTaskBubbles.png)");
						if(coupon1Receive > 0) {
							$("#proCashCouponBut").text("已领取");
						} else {
							$("#proCashCouponBut").removeClass("proCashCouponBut");
							$("#proCashCouponBut").addClass("proCashCouponAlBut");
							$("#proCashCouponBut").text("领取");
							$("#proCashCouponBut").on("click", function() {
								drawObj.newReceive(1);
							})
						}
					} else {
						var proBarLengMar;
						if(proBarNum == 4) {
							$(".proBubble").css("margin-left", "75%");
						} else if(proBarNum == 3) {
							$(".proBubble").css("margin-left", "55%");
						} else if(proBarNum == 2) {
							$(".proBubble").css("margin-left", "35%");
						} else if(proBarNum == 1) {
							$(".proBubble").css("margin-left", "15%");
						} else if(proBarNum == 0) {
							$(".proBubble").css("margin-left", "0");
						}
					}
					$(".progressSpe").css("width", proBarLeng + "%");

					var dayTask = data.dayTask; //每日任务
					var dayTask01 = dayTask[0]; //每日任务
					var dayTask02 = dayTask[1]; //每日任务
					var dayTask03 = dayTask[2]; //每日任务
					var dayTaskNum = 0;

					$(".cashCouponTxt01 span").text(dayTask01.taskSet);
					$(".cashComTxt01 span").text(data.tobuyNum);
					$(".cashComTxt01 code").text(dayTask01.taskSet);
					if(data.tobuyNum >= dayTask01.taskSet) {
						dayTaskNum++;

						$("#proCashCouponDayBut01").text("已完成");
						$("#proCashCouponDayBut01").removeClass("proCashCouponTaskBut");
						$("#proCashCouponDayBut01").addClass("proCashCouponTaskAlBut");
					} else {
						$("#proCashCouponDayBut01").on("click", function() {
							window.location.href = "dasheng://www.dasheng.com/native?name=tobuy";
						})
					}

					$(".cashCouponTxt02 span").text(dayTask02.taskSet);
					$(".cashComTxt02 span").text(data.nieBuyNum);
					$(".cashComTxt02 code").text(dayTask02.taskSet);
					if(data.nieBuyNum >= dayTask02.taskSet) {
						dayTaskNum++;

						$("#proCashCouponDayBut02").text("已完成");
						$("#proCashCouponDayBut02").removeClass("proCashCouponTaskBut");
						$("#proCashCouponDayBut02").addClass("proCashCouponTaskAlBut");
					} else {
						$("#proCashCouponDayBut02").on("click", function() {
							window.location.href = "dasheng://www.dasheng.com/native?name=home&index=2";
						})
					}

					$(".cashCouponTxt03 span").text(dayTask03.taskSet);
					$(".cashComTxt03 span").text(data.memberCash);
					$(".cashComTxt03 code").text(dayTask03.taskSet);
					if(data.memberCash >= dayTask03.taskSet) {
						dayTaskNum++;

						$("#proCashCouponDayBut03").text("已完成");
						$("#proCashCouponDayBut03").removeClass("proCashCouponTaskBut");
						$("#proCashCouponDayBut03").addClass("proCashCouponTaskAlBut");
					} else {
						$("#proCashCouponDayBut03").on("click", function() {
							window.location.href = "dasheng://www.dasheng.com/native?name=home&index=2";
						})
					}
					console.log(dayTaskNum);
					var coupon2Receive = data.coupon2Receive;

					if(dayTaskNum == 3) {
						if(coupon2Receive > 0) {
							$("#proCashCouponDayBut").text("已领取");
						} else {
							$("#proCashCouponDayBut").removeClass("proCashCouponBut");
							$("#proCashCouponDayBut").addClass("proCashCouponAlBut");
							$("#proCashCouponDayBut").text("领取");
							$("#proCashCouponDayBut").on("click", function() {
								drawObj.newReceive(2);
							})
						}

					}
					$(".cashComTxts").text(dayTaskNum);

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
	//领取
	newReceive: function(num) {
		var amount;
		var count;
		var coupon;
		var couponConfigId;
//		if(num == 1) {
//			amount = coupon1.amount;
//			count = coupon1.couponNum;
//			coupon = 1;
//			couponConfigId = coupon1.couponType;
//		} else if(num == 2) {
//			amount = coupon2.amount;
//			count = coupon2.couponNum;
//			coupon = 2;
//			couponConfigId = coupon2.couponType;
//		}
//		$("#proCashCouponBut").off("click");
//		$("#proCashCouponDayBut").off("click");
		$.ajax({
			url: "http://47.98.216.230:8866/dstj-activity" + "/task/receiveCoupon",
			data: {
				memberId: "236763",
				amount: 8,
				count: 1,
				coupon:1,
				couponConfigId: 3
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					//location.reload();
					novOberScr(amount);
					return;
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
	myIntegBook: function(num) {
		var distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		//var distHeight = 380 - distance;
		if(num == 1) {
			$(".boxbg").css("display", "block");
			$(".contCardFloat").css("display", "block");
		} else {
			//$("body").css("overflow","visible");
			$(".boxbg").css("display", "none");
			$(".contCardFloat").css("display", "none");
		}
	}

}
window.onload = function() {
	drawObj.newReceive();

	//	$(".headTopWP").on("click", knowSwitch);
	//	$(".headComChar").on("click", knowSwitch);
	//	$(".headKline").on("click", knowSwitch);
	//	$(".indexKnowCardbg").on("click", knowSwitch);
	//
	//	$(".headKnow").on("click", knowWP);
	$(".newbieTaskModHead").on("click", function() {
		drawObj.myExchange(1);
	});
	$(".newbieTaskModNick").on("click", function() {
		drawObj.myExchange(2);
	});
	$(".newbieTaskRealNameAuth").on("click", function() {
		drawObj.myExchange(3);
	});
	$(".newbieTaskFocuPeo").on("click", function() {
		drawObj.myExchange(4);
	});
	$(".newbieTaskContLand").on("click", function() {
		drawObj.myExchange(1);
	});
	$(".headComCharCardImg01").on("click", function() {
		drawObj.myExchange(6);
	});
	$(".headComCharCardImg02").on("click", function() {
		drawObj.myExchange(5);
	});

	$("#proCashCouponBut").addClass("proCashCouponBut");
	$("#proCashCouponDayBut").addClass("proCashCouponBut");

	$("#proCashCouponDayBut01").addClass("proCashCouponTaskBut");
	$("#proCashCouponDayBut02").addClass("proCashCouponTaskBut");
	$("#proCashCouponDayBut03").addClass("proCashCouponTaskBut");

}

function novOberScr(num) {
	sepVou = "恭喜获得" + num + "元代金券";
	octVou = "领取成功";

	$(".newAlertCard span").text(num);
	drawObj.myObtain(octVou, sepVou);
}
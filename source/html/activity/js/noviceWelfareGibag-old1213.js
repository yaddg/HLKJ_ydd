var memberId = getTheRequestParams().memberId;
var playnum = 0;
var countMemberDraw = 0;

var drawObj = {
	init: function() {
		var htmlWidth = document.documentElement.clientWidth;
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var htmlHeight = document.body.scrollHeight; //body高度
		//		var bgimgHeight = $("#bgimg").height();
		//
		//		var bgdivHeight = bgimgHeight - 5;
		//		$("#bgdiv").css("height", bgdivHeight + "px"); //防点击图片div
		//
		//		var FortuneTipBot = $(".FortuneTip").position().top + 362;
		var myObtainHeight = $(".sepTips").position().top + 94;

		$("#myObtain").css("height", myObtainHeight + "px");
		//		$(".FortuneTips").css("top", FortuneTipBot + "px");

	},
	AppKnow: function() {
		window.location.href = 'hailang://www.hailang.com/native?name=home&index=1';
	},
	myObtain: function(desc, heci) {
		$("#drawDesc").text(heci);
		$("#heci").html(desc);
		$("#myObtainImg").css("display", "block");
		$("#optionBgO").css("display", "none");
		$("#myObtain").css("display", "block");
	},
	closeObtain: function() {
		$("#myObtain").css("display", "none");
	},
	goObtain: function(num) {
		if(num == 1) {
			//注册
			window.location.href = "hailang://www.hailang.com/native?name=register";
		} else if(num == 2) {
			//充值
			window.location.href = "hailang://www.hailang.com/native?name=recharge";
		} else if(num == 3) {
			//投资
			window.location.href = "hailang://www.hailang.com/native?name=home&index=1";
		} else if(num == 4) {
			//投资
			window.location.href = "hailang://www.hailang.com/native?name=home&index=1";
		}
	},
	closeRecharge: function() {
		$("#noObtain").css("display", "none");
	},

	//刷新页面
	sepData: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/api/record/welfare",
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
						$("#sepCont8").text("已错过");
						$("#sepCont8").css("background", "none");
						$("#sepCont8").css("color", "#f3caca");
						$("#sepCont8").css("border", "1px solid #f3caca");
						$("#sepCont8").attr("onclick", "");

						$("#sepCont100").text("已错过");
						$("#sepCont100").css("background", "none");
						$("#sepCont100").css("color", "#f3caca");
						$("#sepCont100").css("border", "1px solid #f3caca");
						$("#sepCont100").attr("onclick", "");

						$("#sepCont1000").text("已错过");
						$("#sepCont1000").css("background", "none");
						$("#sepCont1000").css("color", "#f3caca");
						$("#sepCont1000").css("border", "1px solid #f3caca");
						$("#sepCont1000").attr("onclick", "");
						
						$("#sepCont100S").text("已错过");
						$("#sepCont100S").css("background", "none");
						$("#sepCont100S").css("color", "#f3caca");
						$("#sepCont100S").css("border", "1px solid #f3caca");
						$("#sepCont100S").attr("onclick", "");
					} else {
						var registerLevel = data.registerLevel; //注册
						var firstCharge = data.firstCharge; //充值
						var firstCash = data.firstCash; //投资
						var hard = data.hard; //勤劳奖
						var five = data.fiveDay; //完成
						if(registerLevel == 1) {
							$("#sepCont8").text("已完成");
							$("#sepCont8").css("background", "none");
							$("#sepCont8").css("color", "#FFC84D");
							$("#sepCont8").css("border", "1px solid rgba(255,200,77,1)");
							$("#sepCont8").attr("onclick", "");
						}

						if(firstCharge == 1) {
							$("#sepCont100").text("已完成");
							$("#sepCont100").css("background", "none");
							$("#sepCont100").css("color", "#FFC84D");
							$("#sepCont100").css("border", "1px solid rgba(255,200,77,1)");
							$("#sepCont100").attr("onclick", "");
						} else if(firstCharge == 2) {
							$("#sepCont100").text("已错过");
							$("#sepCont100").css("background", "none");
							$("#sepCont100").css("color", "#f3caca");
							$("#sepCont100").css("border", "1px solid #f3caca");
							$("#sepCont100").attr("onclick", "");
						}

						if(firstCash == 1) {
							$("#sepCont1000").text("已完成");
							$("#sepCont1000").css("background", "none");
							$("#sepCont1000").css("color", "#FFC84D");
							$("#sepCont1000").css("border", "1px solid rgba(255,200,77,1)");
							$("#sepCont1000").attr("onclick", "");
						} else if(firstCash == 2) {
							$("#sepCont1000").text("已错过");
							$("#sepCont1000").css("background", "none");
							$("#sepCont1000").css("color", "#f3caca");
							$("#sepCont1000").css("border", "1px solid #f3caca");
							$("#sepCont1000").attr("onclick", "");
						}
						if(hard == 1) {
							$("#sepCont100S").attr("class", "voucherExchFin");
							$("#sepCont100S").attr("onclick", "");
							$("#sepCont100S").text("已完成");
						}
						if(five == 1) {
							$(".contCardrewardBut").text("已领取");
						}
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
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		//alert(ua);
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
}

window.onload = function() {
	rqstParamsObj = getTheRequestParams(); //加载页面参数
	//	addChannelVisitRecordChannel(0)
	drawObj.init();
	console.log(memberId)
		//	if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
	drawObj.sepData();
	$("#sepCont8").attr("onclick", "drawObj.goObtain(1)");
	$("#sepCont100").attr("onclick", "drawObj.goObtain(2)");
	$("#sepCont1000").attr("onclick", "drawObj.goObtain(3)");
	$("#sepCont100S").attr("onclick", "drawObj.goObtain(4)");

	//	} else {
	//		drawObj.receive(0);
	//	}

}
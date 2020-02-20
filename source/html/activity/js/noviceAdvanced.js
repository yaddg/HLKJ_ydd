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
		}
	},
	closeRecharge: function() {
		$("#noObtain").css("display", "none");
	},
	//领取
	novReceive: function(num) {
		$.ajax({
			url: hltjDomainUrl + "/activity/receive",
			data: {
				memberId: memberId,
				integral: num
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
	//刷新页面
	advData: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/smallAmountLoad",
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
					var status = data.status;

					var novAdvanced200 = $("#novAdvanced200");
					var novAdvanced800 = $("#novAdvanced800");
					var novAdvanced2000 = $("#novAdvanced2000");
					if(status == 1) {
						novAdvanced200.text("未开始");
						novAdvanced200.attr('class', 'novAdvHavrece');
						novAdvanced800.text("未开始");
						novAdvanced800.attr('class', 'novAdvHavrece');
						novAdvanced2000.text("未开始");
						novAdvanced2000.attr('class', 'novAdvHavrece');
					} else if(status == 2) {
						novAdvanced200.text("已结束");
						novAdvanced200.attr('class', 'novAdvHavrece');
						novAdvanced800.text("已结束");
						novAdvanced800.attr('class', 'novAdvHavrece');
						novAdvanced2000.text("已结束");
						novAdvanced2000.attr('class', 'novAdvHavrece');
					} else if(status == 3) {
						//0.去投资1.领取2.已领取3.不可享
						var buttonOne = data.buttonOne; //200
						var buttonTwo = data.buttonTwo; //800
						var buttonThree = data.buttonThree; //2000

						if(buttonOne == 0) {
							novAdvanced200.text("去投资");
							novAdvanced200.attr('class', 'novAdvToinvest');
							novAdvanced200.attr("onclick", "drawObj.goObtain(3)");
						} else if(buttonOne == 1) {
							novAdvanced200.text("领取");
							novAdvanced200.attr('class', 'novAdvUncollected');
							novAdvanced200.attr("onclick", "drawObj.novReceive(200)");
						} else if(buttonOne == 2) {
							novAdvanced200.text("已领取");
							novAdvanced200.attr('class', 'novAdvHavrece');
						} else if(buttonOne == 3) {
							novAdvanced200.text("不可享");
							novAdvanced200.attr('class', 'novAdvNoenjoyed');
						}

						if(buttonTwo == 0) {
							novAdvanced800.text("去投资");
							novAdvanced800.attr('class', 'novAdvToinvest');
							novAdvanced800.attr("onclick", "drawObj.goObtain(3)");
						} else if(buttonTwo == 1) {
							novAdvanced800.text("领取");
							novAdvanced800.attr('class', 'novAdvUncollected');
							novAdvanced800.attr("onclick", "drawObj.novReceive(800)");
						} else if(buttonTwo == 2) {
							novAdvanced800.text("已领取");
							novAdvanced800.attr('class', 'novAdvHavrece');
						} else if(buttonTwo == 3) {
							novAdvanced800.text("不可享");
							novAdvanced800.attr('class', 'novAdvNoenjoyed');
						}

						if(buttonThree == 0) {
							novAdvanced2000.text("去投资");
							novAdvanced2000.attr('class', 'novAdvToinvest');
							novAdvanced2000.attr("onclick", "drawObj.goObtain(3)");
						} else if(buttonThree == 1) {
							novAdvanced2000.text("领取");
							novAdvanced2000.attr('class', 'novAdvUncollected');
							novAdvanced2000.attr("onclick", "drawObj.novReceive(2000)");
						} else if(buttonThree == 2) {
							novAdvanced2000.text("已领取");
							novAdvanced2000.attr('class', 'novAdvHavrece');
						} else if(buttonThree == 3) {
							novAdvanced2000.text("不可享");
							novAdvanced2000.attr('class', 'novAdvNoenjoyed');
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
		//drawObj.advData();
	var novAdvanced200 = $("#novAdvanced200");
	var novAdvanced800 = $("#novAdvanced800");
	var novAdvanced2000 = $("#novAdvanced2000");
	novAdvanced200.text("未开始");
	novAdvanced200.attr('class', 'novAdvHavrece');
	novAdvanced800.text("未开始");
	novAdvanced800.attr('class', 'novAdvHavrece');
	novAdvanced2000.text("未开始");
	novAdvanced2000.attr('class', 'novAdvHavrece');
	//	} else {
	//		drawObj.receive(0);
	//	}

}
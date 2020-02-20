var memberId = getTheRequestParams().memberId;
var playnum = 0;
var countMemberDraw = 0;
var htmlWidth = document.documentElement.clientWidth;
var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度

var drawObj = {
	init: function() {
		var htmlHeight = document.body.scrollHeight; //body高度
		var htmlFont = 100 * (htmlWidth / 360); // 10px / 640px * 320px 
		$("html").css("font-size", htmlFont + "px");
		//		alert(htmlFont)
		//		var FortuneTipBot = $(".FortuneTip").position().top + 362;
		//var myObtainHeight = $(".sepTips").position().top + 94;

		//$("#myObtain").css("height", myObtainHeight + "px");
		//		$(".FortuneTips").css("top", FortuneTipBot + "px");

	},
	myKnowInfor: function() {
		window.location.href = 'hailang://www.hailang.com/native?name=text_live';
	},
	myExchange: function(num) {
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
			//勤劳
			window.location.href = "hailang://www.hailang.com/native?name=home&index=1";
		}
	},
	myKnowBook: function() {
		window.location.href = 'indexKnow.html';
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
					var registerLevel = data.registerLevel; //注册
					var firstCharge = data.firstCharge; //充值
					var firstCash = data.firstCash; //投资
					var hard = data.hard; //勤劳奖
					var five = data.fiveDay; //完成
					if(registerLevel == 1) {
						$("#voucherExchO").attr("class", "voucherExchFin");
						$("#voucherExchO").attr("onclick", "");
						$("#voucherExchO").text("已完成");
					}
					if(firstCharge == 1) {
						$("#voucherExchT").attr("class", "voucherExchFin");
						$("#voucherExchT").attr("onclick", "");
						$("#voucherExchT").text("已完成");
					} else if(firstCharge == 2) {
						$("#voucherExchT").attr("class", "voucherExchMiss");
						$("#voucherExchT").attr("onclick", "");
						$("#voucherExchT").text("已错过");
					}
					if(firstCash == 1) {
						$("#voucherExchTh").attr("class", "voucherExchFin");
						$("#voucherExchTh").attr("onclick", "");
						$("#voucherExchTh").text("已完成");
					}else if(firstCash == 2) {
						$("#voucherExchTh").attr("class", "voucherExchMiss");
						$("#voucherExchTh").attr("onclick", "");
						$("#voucherExchTh").text("已错过");
					}
					if(hard == 1) {
						$("#voucherExchF").attr("class", "voucherExchFin");
						$("#voucherExchF").attr("onclick", "");
						$("#voucherExchF").text("已完成");
					}
					if(five == 1) {
						$(".contCardrewardBut").text("已领取");
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
	myIntegBook: function(num) {
		var distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		//var distHeight = 380 - distance;
		if(num == 1) {
			//$(".contCardFloat").css("margin-top", distHeight);
			//$("html,body").css("height", cilentHeight);
			//$(".boxbg").css("height", cilentHeight);
			//$("html,body").css("overflow","hidden");

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
	rqstParamsObj = getTheRequestParams(); //加载页面参数
	//	addChannelVisitRecordChannel(0)
	drawObj.init();
	drawObj.sepData();
	//$("body").scroll(drawObj.touch);
	//document.addEventListener('touchmove', drawObj.touch, false);  
}
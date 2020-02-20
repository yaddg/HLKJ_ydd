var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var tops = 0;
var isflag = false;
var playnum = 1;
var countMemberDraw = 0;
$(function() {
	var $btn = $('.g-lottery-img'); // 旋转的div

	var isture = 0; //是否正在抽奖
	var clickfunc = function() {
			$.ajax({
				//url: "http://192.168.1.19:8866/dstj-activity/activity/roundDraw",
				url: hltjDomainUrl + "/activity/roundDraw",
				data: {
					memberId: memberId,
					type: playnum
				},
				type: "POST",
				dataType: 'json',
				crossDomain: true,
				success: function(data, status, xhr) {
					console.log(data);
					if(data.code == 0) {
						var data = data.data;
						var status = data.status;

						if(status == "0") {
							var id = data.prize;
							
							switch(id) {
								case "8":
									rotateFunc(1, 275, '恭喜您获得8元代金券');
									break;
								case "16":
									rotateFunc(2, 185, '恭喜您获得16元代金券');
									break;
								case "20":
									rotateFunc(3, 5, '恭喜您获得20积分');
									break;
								case "100":
									rotateFunc(4, 320, '恭喜您获得100积分');
									break;
								case "120":
									rotateFunc(5, 230, '恭喜您获得120元代金券');
									break;
								case "0":
									rotateFunc(6, 95, '谢谢参与');
									break;
							}
							$(".FortuneBut").css("margin-top","0.36rem");
						} else if(status == "1") {
							drawObj.myObtain("您当前积分不足暂无 抽奖次数", "");
							return;
						} else if(status == "2") {
							drawObj.myObtain("您当前投资金额不足暂无 抽奖次数", "");
							return;
						} else if(status == "3") {
							$(".FortuneBut").css("margin-top","0.36rem")
							drawObj.myObtain("活动未开始", "");
							return;
						} else if(status == "4") {
							$(".FortuneBut").css("margin-top","0.36rem")
							drawObj.myObtain("活动已结束", "");
							return;
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
		//	$(".playbtn").click(function() {
		//		if(isture) return; // 如果在执行就退出
		//		isture = true; // 标志为 在执行
		//		rotateFunc(1, 120, '恭喜您获得8元代金券');
		//	});
	$(".playbtn").click(function() {
		var isLogin = commonObj.isLogin();
		if(!isLogin) {
			return false;
		}
		if(isture) return; // 如果在执行就退出
		isture = true; // 标志为 在执行
		if(playnum == 1) {
			if(drawObj.integral < 400) {
				drawObj.myObtain("您当前积分不足暂无 抽奖次数", "");
				return;
			}
		} else if(playnum == 2) {
			if(drawObj.drawNum < 1) {

				$(".FortuneBut").text("去投资");
				isflag = true;
				drawObj.myObtain("您当前投资金额不足暂无 抽奖次数", "");
				return;
			}
		};
		clickfunc();

	});

	var rotateFunc = function(awards, angle, text) {
		isture = true;
		$btn.stopRotate();
		$btn.rotate({
			angle: 0, //旋转的角度数
			duration: 4000, //旋转时间
			animateTo: angle + 1615, //给定的角度,让它根据得出来的结果加上1615度旋转
			callback: function() {
				isture = false; // 标志为 执行完毕
				// alert(text);
				console.log(text)
				if(awards == 6){
					$(".FortuneBut").text("继续加油");
				}
				drawObj.myObtain(text, "");
				drawObj.fortuneData();
			}
		});
	};
});

var drawObj = {
	myObtain: function(desc, heci) {
		$("#drawDesc").html("");
		$("#heci").html(desc);
		$("#myObtainImg").css("display", "block");
		$("#myObtain").css("display", "block");
	},
	closeObtain: function() {
		
		if(isflag == true) {
			isflag = false;
			window.location.href = 'dasheng://www.dasheng.com/native?name=home&index=1';
		} else {
			var _url = "http://" + window.location.host + "/dstjmobile/source/html/weekActivity/1910/octWheelFortune.html?memberId=" + memberId;
			window.location.href = _url;
			//receiveObj.closeTips();
			//$("#myObtain").css("display", "none");
		}
	},
	closeTips: function() {
		$("#mySupernatant").css("display", "none");
		//location.reload();
	},
	//获奖记录
	RechCardRecord: function() {
		$.ajax({
			//url: "http://192.168.1.19:8866/dstj-activity/activity/getDrawContent",
			url: hltjDomainUrl + "/activity/getDrawContent ",
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
					console.log(data);
					var str1 = '';
					var str2 = '';
					var prizeDesc; //获得prizeDesc
					var prizeCount; //获得prizeCount

					var prizeType; //1、代金券2、积分 
					var prizeNum;

					var prizeIntNum = 0; //积分额度
					var prizeAllNum = 0; //奖励总额度
					$.each(data, function(i, item) {
						//"prizeSize": 8,奖励额度
						//"prizeType": 1,1 代金券  2 积分
						//"num": 1    获得次数
						//prizeDesc = item.prizeDesc;
						prizeCount = item.drawDesc; //奖励额度

						prizeNum = item.count; //获得次数

						str1 += '<li>恭喜您获得' + prizeCount + '<span>' + prizeNum + '次</span></li>';

					});

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
		$("#mySupernatant").css("background-color", "#502F99");
	},
	fortuneData: function() {
		$.ajax({
			url: hltjDomainUrl + "/activity/getDrawCount",
			//url: "http://192.168.1.19:8866/dstj-activity/activity/getDrawCount",
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

					drawObj.drawNum = data.drawNum; //抽奖次数
					drawObj.integral = data.integral; //可用积分 

					$('.octWheelForCheckLeft').text("您当前积分:" + drawObj.integral);
					$('.octWheelForCheckRight').text("当前可抽奖次数:" + drawObj.drawNum + "次"); //显示还剩下多少次抽奖机会 

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
	//drawObj.init();
	//drawObj.myObtain("您当前投资金额不足暂无 抽奖次数", "");
	//获奖记录
	$(".contBoxMyExc").click(drawObj.RechCardRecord);

	$(".bgdivLeft").addClass("bgdivBut");
	$(".bgdivRight").addClass("bgdivEmp");

	$(".bgdivLeft").on("click", function() {
		playnum = 1;
		$(".bgdivLeft").removeClass("bgdivEmp");
		$(".bgdivLeft").addClass("bgdivBut");
		$(".bgdivRight").removeClass("bgdivBut");
		$(".bgdivRight").addClass("bgdivEmp");

		$(".octWheelForCheck>div:nth-child(2)").css("border-color", "#683BCD");
		$(".octWheelForCheck>div:first-child").css("border-color", "#FFE065");

	});
	$(".bgdivRight").on("click", function() {
		playnum = 2;
		$(".bgdivLeft").removeClass("bgdivBut");
		$(".bgdivLeft").addClass("bgdivEmp");
		$(".bgdivRight").removeClass("bgdivEmp");
		$(".bgdivRight").addClass("bgdivBut");

		$(".octWheelForCheck>div:first-child").css("border-color", "#683BCD");
		$(".octWheelForCheck>div:nth-child(2)").css("border-color", "#FFE065");
	});
	if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {

		drawObj.fortuneData();
	} else {
		//playnum = 0; //初始次数，由后台传入
		//$('#FortuneFrequency').text(playnum); //显示还剩下多少次抽奖机会 
		//giveObj.setconetnttext("登陆后查看奖励金额");
	}

}
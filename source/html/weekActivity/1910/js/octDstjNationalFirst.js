var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var tops = 0;
var isflag = false;

var floSNum;
var alertNum;
var opacityFire = 1;
var leaving;
var receiveObj = {
	isopen: false,
	receive: function(data) {
		var octVou;
		var sepVou;
		//回到页面顶部  
		if(data == 100) {
			//中奖100
			sepVou = "恭喜您!";
			octVou = "获得100积分";
			$(".FortuneBut").text("");
			//$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/juneFourthCardAlert1.png");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 120) {
			//中奖120
			sepVou = "恭喜您!";
			octVou = "获得120元代金券";
			$(".FortuneBut").text("");
			//$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/juneFourthCardAlert2.png");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 25) {
			//中奖25
			sepVou = "恭喜您!";
			octVou = "获得25积分";
			$(".FortuneBut").text("");
			//$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/juneFourthCardAlert8.png");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 200) {
			//中奖200
			sepVou = "恭喜您!";
			octVou = "获得200积分";
			$(".FortuneBut").text("");
			//$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/juneFourthCardAlert16.png");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 800) {
			//中奖800
			sepVou = "恭喜您!";
			octVou = "获得800积分";
			$(".FortuneBut").text("");
			//$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/juneFourthCardAlert24.png");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 40) {
			//中奖40
			sepVou = "恭喜您!";
			octVou = "获得40元代金券";
			//$(".FortuneBut").text("我知道了");
			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/juneFourthCardAlert100.png");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 50) {
			//中奖50
			sepVou = "恭喜您!";
			octVou = "获得50积分";
			$(".FortuneBut").text("");
			//$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/juneFourthCardAlert200.png");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 16) {
			//中奖16
			sepVou = "恭喜您!";
			octVou = "获得16元代金券";
			$(".FortuneBut").text("");
			//			$(".FortuneImg").attr("src", "http://qiniuapp.hailangkeji.com/juneFourthCardAlert500.png");
			receiveObj.myObtain(octVou, sepVou);
		} else if(data == 0) {
			//今日抽奖次数已用完！
			sepVou = "今日抽奖次数已用完！";
			octVou = "";
			$(".FortuneBut").text("")

			$(".FortuneBut").css("margin-top", "0.42rem");
			receiveObj.myObtain(octVou, sepVou);
		} else {
			//活动未开始
			sepVou = data;
			octVou = "";
			$(".FortuneBut").text("")

			$(".FortuneBut").css("margin-top", "0.42rem");
			receiveObj.myObtain(octVou, sepVou);
		}
	},
	myObtain: function(desc, heci) {
		$("#drawDesc").html(heci);
		$("#heci").html(desc);
		$("#myObtainImg").css("display", "block");
		$("#myObtain").css("display", "block");
	},
	closeObtain: function() {

		//				$(".robShadow").css("display", "block");
		if(isflag == true) {
			isflag = false;
			window.location.href = 'zhijian://www.zhijian.com/native?name=home&index=1';
		} else {
			var _url = "http://" + window.location.host + "/dstjmobile/source/html/weekActivity/1910/octDstjNationalFirst.html?memberId=" + memberId;
			window.location.href = _url;
			//receiveObj.closeTips();
			//$("#myObtain").css("display", "none");
		}
	},
	closeTips: function() {
		$("#mySupernatant").css("display", "none");
		//location.reload();
	},
	//奖品展示
	octCardPrize: function() {
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
	//滚动播出
	novAwardRecord: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/randomBroadcast",
			data: {
				memberId: memberId
			},
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
					var prizeDesc;
					$.each(data, function(i, item) {
						//老王爱吃肉 获得200元代金券
						nickName = item.nickName;
						prizeDesc = item.prizeDesc;
						str1 += '<li>' + nickName + '&nbsp;获得<span>' + prizeDesc + '</span>元代金券</li>';
						$("#ul1").html(str1)
					});
					$('.conetntList div').liMarquee({
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
				alert("系统错误" + er);
			}
		});
	},
	//预加载页面
	juneData: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/dayTurntableRewardInfo",
			data: {
				memberId: memberId
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				//receiveObj.novAwardRecord(tidings);
				if(data.code == 0) {
					var data = data.data;
					if(data.status == 5) {
						leaving = data.leaving;
						//获奖记录
						//$(".RechCardRecord").click(receiveObj.octScratch); 
						$(".td_5").on("click", function() {
							receiveObj.rechData();
						});
						var dataList = data.dayTurntableList;
						console.log(dataList);
						if(dataList == undefined || dataList == null || dataList == "") {
							return;
						}
						var str1 = '';
						var str2 = '';
						var prizeDesc; //获得prizeDesc
						var prizeCount; //获得prizeCount

						var prizeType; //1、代金券2、积分 
						var prizeTypeTxt;
						$.each(dataList, function(i, item) {
							//老王爱吃肉 获得200元代金券
							//prizeDesc = item.prizeDesc;
							prizeCount = item.num; //数量
							prizeType = item.inviteType; //1.400积分 2.8  3.120  4.400

							if(prizeCount > 0) {
								str1 += '<li>' + prizeType + '积分<span>' + prizeCount + '次</span></li>';
							}
							$("#optionBgLi").html(str1)
						});

					} else if(data.status == 1) {
						$(".td_5").on("click", function() {
							receiveObj.receive("活动为开始");
						});
					} else if(data.status == 2) {
						$(".td_5").on("click", function() {
							receiveObj.receive("活动已结束");
						});
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
	rechData: function() {
		if(memberId == 'undefined' || memberId == null || memberId == 'null' || memberId.length < 1) {
			console.log("请先登录！")
			$(".indexBut").text("请先登录");
			window.location.href = hltjAppObj.appLoginUrl;
			return;
		};
		if(leaving < 1) {
			receiveObj.receive(0);
			return;
		}
		$(".td_5").off("click");
		$.ajax({
			url: hltjDomainUrl + "/activity/openDayTurntableReward",
			data: {
				memberId: memberId
			},
			type: "post",
			dataType: 'json',
			beforeSend: function() {
				//等待延迟的函数
			},
			success: function(data, status, xhr) {
				console.log(data);

				if(data.code == 0) {
					var data = data.data;
					//floSNum = 0;//100积分
					//floSNum = 1;//120元代金券
					//floSNum = 2;//25积分
					//floSNum = 3;//200积分
					//floSNum = 4;//800积分
					//floSNum = 5;//40元代金券
					//floSNum = 6;//50积分
					//floSNum = 7;//16元代金券

					if(data.prizeSize == 100) {
						floSNum = 0;
						alertNum = 100;
					} else if(data.prizeSize == 200) {
						floSNum = 3;
						alertNum = 200;
					} else if(data.prizeSize == 800) {
						floSNum = 4;
						alertNum = 800;
					} else if(data.prizeSize == 25) {
						floSNum = 2;
						alertNum = 25;
					} else if(data.prizeSize == 50) {
						floSNum = 6;
						alertNum = 50;
					} else if(data.prizeSize == 40) {
						floSNum = 5;
						alertNum = 40;
					} else if(data.prizeSize == 120) {
						floSNum = 1;
						alertNum = 120;
					} else if(data.prizeSize == 16) {
						floSNum = 7;
						alertNum = 16;
					} else {
						return;
					}
					lottery.lottery({
						selector: '#lottery',
						width: 3,
						height: 3,
						index: 0, // 初始位置
						initSpeed: 500, // 初始转动速度
						target: floSNum,
						upStep: 80, // 加速滚动步长  加速时间
						upMax: 40, // 滚动速度上限 越大速度越快
						downStep: 80, // 减速滚动步长时间 越大转动一次速度越长
						downMax: 200, // 减速上限
						waiting: 200, // 匀速转动时长
						beforeRoll: function() { // 重写滚动前事件：beforeRoll
							// console.log(this);
							//return;

						}
					});
					lottery.beforeRoll();
				} else if(data.code == 500) {
					receiveObj.receive(0);
				}
			},
			error: function(er) {
				console.log(er);
			}
		});
	}
}
window.onload = function() {
	rqstParamsObj = getTheRequestParams(); //加载页面参数
	addChannelVisitRecord(); //添加渠道访问记录  
	receiveObj.juneData();

	//$(".td_5").attr("onclick", "receiveObj.rechData()");
	//receiveObj.receive(0);
	changeBackground();
	//获奖记录
	$(".RechCardRecord").click(receiveObj.octCardPrize);
	$(".FortuneBut").on("click", function() {
		receiveObj.closeObtain();
	});

}

function beforeRollStop() {
	setTimeout(function() {
		//$(".lottery-unit").css("background", "rgba(255,252,250, 1)");
		receiveObj.receive(alertNum);
	}, 1000);
}

function FireBright() {
	opacityFire++;
	$(".conetntHead div").animate({
			opacity: "0." + opacityFire
		}, 200,
		function() {
			if(opacityFire == 9) {
				FireDarkt();
			} else {
				FireBright();
				//				setTimeout(FireBright, 100);
			}
		})
}

function FireDarkt() {
	opacityFire--;
	$(".conetntHead div").animate({
			opacity: "0." + opacityFire
		}, 200,
		function() {
			if(opacityFire == 1) {
				FireBright();
			} else {
				FireDarkt();
				//				setTimeout(FireDarkt, 100);
			}

		})
}
var bgCounter = 0;
var backgrounds = [
	"http://qiniuapp.hailangkeji.com/octDstjNationalFirstBg.png",
	"http://qiniuapp.hailangkeji.com/octDstjNationalFirstBgRun.png"
];  
function changeBackground()   {    
	bgCounter = (bgCounter + 1) % backgrounds.length;
	$('#lottery').css('background-image', 'url(' + backgrounds[bgCounter] + ')');    
	setTimeout(changeBackground, 1000);
}  
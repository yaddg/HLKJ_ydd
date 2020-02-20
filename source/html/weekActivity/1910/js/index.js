var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var tops = 0;
var txtdatas;

//获取当前时间  
var octoberDate = new Date();
var octoberNow = octoberDate.getTime();

var octDstjStaNo = "http://qiniuapp.hailangkeji.com/octDstjNationalStart01.png";
var octDstjStaIng = "http://qiniuapp.hailangkeji.com/octDstjNationalStart02.png";
var octDstjStaEnd = "http://qiniuapp.hailangkeji.com/octDstjNationalStart03.png";

var receiveObj = {
	isopen: false,

	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	rechData: function() {
		if(memberId == 'undefined' || memberId == null || memberId == 'null' || memberId.length < 1) {

			//			$(".indexBut").text("请先登录");
			//			$(".indexBut").attr("onclick", "");
			$("#indexButT,#indexButTh,#indexButF,#indexButFi").attr("onclick", "receiveObj.indexBut(0)");
			return;
		}
		$.ajax({
			url: hltjDomainUrl + "/activity/squareLoad",
			//url: "http://192.168.8.21:8866/hltj-api/activity/farmingLoad",
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
				var data = data.data;
				//status  活动状态   1 活动未开始  2 活动已结束  3 已领取资格  4 未领取资格 5 进行中
				receiveObj.comIndexActO = data.zhuanpan; //每日一转
				receiveObj.comIndexActT = data.yingli; //盈利挑战赛
				receiveObj.comIndexActTh = data.shouxufei; //手续费
				receiveObj.comIndexActF = data.wabao; //挖宝

				receiveObj.comtimeO = receiveObj.comIndexActO.leavingTime; //活动剩余时间
				receiveObj.comtimeOstart = receiveObj.comIndexActO.beginTime; // 活动开始时间
				receiveObj.comtimeOend = receiveObj.comIndexActO.endTime; // 活动结束时间

				receiveObj.comtimeT = receiveObj.comIndexActT.leavingTime;
				receiveObj.comtimeTstart = receiveObj.comIndexActT.beginTime;
				receiveObj.comtimeTend = receiveObj.comIndexActT.endTime;

				receiveObj.comtimeTh = receiveObj.comIndexActTh.leavingTime;
				receiveObj.comtimeThstart = receiveObj.comIndexActTh.beginTime;
				receiveObj.comtimeThend = receiveObj.comIndexActTh.endTime;

				receiveObj.comtimeF = receiveObj.comIndexActF.leavingTime;
				receiveObj.comtimeFstart = receiveObj.comIndexActF.beginTime;
				receiveObj.comtimeFend = receiveObj.comIndexActF.endTime;

				//活动1
				switch(receiveObj.comIndexActO.status) {
					case 2:
						//$("#indexButT").text("活动已结束");
						$("#indexButT img").attr("src", octDstjStaEnd);
						break;
					case 1:
						//$("#indexButT").text("活动未开始");
						$("#indexButT img").attr("src", octDstjStaNo);
						if(receiveObj.comtimeO <= 86400000) {
							$("#RechTimeT").css("display", "block");
							//$("#RechTimeO").css("background-image", "url(images/octoberPink.png)");
							countTime1(1);
						}
						break;

					case "":
						if(receiveObj.comtimeO <= 86400000) {
							$("#RechTimeT").css("display", "block");
							//$("#RechTimeO").css("background-image", "url(images/octoberTang.png)");
							countTime1(2);
						}
						//$("#indexButO").text("进入活动");
						$("#indexButT img").attr("src", octDstjStaIng);

						$("#indexButT").attr("onclick", "receiveObj.indexBut(1)");
						break;
				};
				//活动2
				switch(receiveObj.comIndexActT.status) {
					case "":
						if(receiveObj.comtimeT <= 86400000) {
							$("#RechTimeTh").css("display", "block");
							countTime2(2);
						}
						//$("#indexButT").text("进入活动");
						$("#indexButTh img").attr("src", octDstjStaIng);
						$("#indexButTh").attr("onclick", "receiveObj.indexBut(2)");
						break;
					case 1:
						//$("#indexButTh").text("活动未开始");

						$("#indexButTh img").attr("src", octDstjStaNo);
						if(receiveObj.comtimeT <= 86400000) {
							$("#RechTimeTh").css("display", "block");
							countTime2(1);
						}
						break;
					case 2:
						//$("#indexButT").text("活动已结束");
						$("#indexButTh img").attr("src", octDstjStaEnd);
						break;
				};
				//活动3
				switch(receiveObj.comIndexActTh.status) {
					case "":
						if(receiveObj.comtimeTh <= 86400000) {
							$("#RechTimeF").css("display", "block");
							countTime3(2);
						}
						//$("#indexButTh").text("点击进入");
						$("#indexButF img").attr("src", octDstjStaIng);
						$("#indexButF").attr("onclick", "receiveObj.indexBut(3)");
						break;
					case 1:
						if(receiveObj.comtimeTh <= 86400000) {
							$("#RechTimeF").css("display", "block");
							countTime3(1);
						}
						//$("#indexButTh").text("活动未开始");
						$("#indexButF img").attr("src", octDstjStaNo);
						break;
					case 2:
						//$("#indexButTh").text("活动已结束");
						$("#indexButF img").attr("src", octDstjStaEnd);
						break;

				};
				//活动4
				switch(receiveObj.comIndexActF.status) {
					case 1:
						//$("#indexButFi").text("活动未开始");
						$("#indexButFi img").attr("src", octDstjStaNo);
						if(receiveObj.comtimeF <= 86400000) {
							$("#RechTimeFi").css("display", "block");
							countTime4(1);
						}
						break;
					case 2:
						//$("#indexButF").text("活动已结束");
						$("#indexButFi img").attr("src", octDstjStaEnd);
						break;
					case "":
						if(receiveObj.comtimeF <= 86400000) {
							$("#RechTimeFi").css("display", "block");
							countTime4(2);
						}
						//$("#indexButF").text("进入活动"); 
						$("#indexButFi img").attr("src", octDstjStaIng);
						$("#indexButFi").attr("onclick", "receiveObj.indexBut(4)");
						break;
				};

			},
			error: function(er) {
				console.log(er);
			}
		});
	},
	rechBut: function() {
		$.ajax({
			url: hltjDomainUrl + "/activity/enterActivity",
			//url: "http://192.168.8.21:8866/hltj-api/activity/joinFarmingActivity",
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
				//status  活动状态    1未开始2已结束3未登录4老用户5新用户已领取6新用户未领取
				location.reload();
			},
			error: function(er) {
				console.log(er);
				//				alert("获取文章评论出错" + er);
			}
		});
	},
	indexBut: function(num) {
		console.log(num)
			//return;
		if(num == 1) {
			window.location.href = 'octDstjNationalFirst.html?memberId=' + memberId;
		} else if(num == 2) {
			window.location.href = 'octDstjNationalSecond.html?memberId=' + memberId;
		} else if(num == 3) {
			window.location.href = 'octDstjNationalThird.html?memberId=' + memberId;
		} else if(num == 4) {
			window.location.href = 'octDstjNationalFourth.html?memberId=' + memberId;
		} else if(num == 5) {
			//window.location.href = 'springFestivalFifth.html?memberId=' + memberId;
		} else if(num == 6) {
			//window.location.href = 'springFestivalSixth.html?memberId=' + memberId;
		} else if(num == 0) {
			window.location.href = 'dasheng://www.dasheng.com/loginDialog';
		} else {

		}
	}

}
window.onload = function() {
	rqstParamsObj = getTheRequestParams(); //加载页面参数
	addChannelVisitRecord(); //添加渠道访问记录  
	receiveObj.rechData();
	//receiveObj.comtimeT = 1574481200;
	//countTime2(1);

}

function countTime1(num) {
	//获取当前时间  
	//	var octoberDate = new Date();
	//	var octoberNow = octoberDate.getTime();
	receiveObj.comtimeO = receiveObj.comtimeO - 1000;
	var octoberNow = receiveObj.comtimeO;
	//console.log(octoberNow)
	//设置截止时间  
	var str;
	var strTxt;
	if(num == 1) {
		str = receiveObj.comtimeOstart;
		strTxt = "开始倒计时";
	} else if(num == 2) {
		str = receiveObj.comtimeOend;
		strTxt = "结束倒计时";
	}
	var endDate = new Date(str);
	var end = endDate.getTime();
	//时间差  
	var leftTime = octoberNow;
	//定义变量 d,h,m,s保存倒计时的时间  
	var d, h, m, s;
	if(leftTime >= 0) {
		d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
		h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
		m = Math.floor(leftTime / 1000 / 60 % 60);
		s = Math.floor(leftTime / 1000 % 60);
	}
	if(h < 10) {
		h = "0" + h;
	}
	if(m < 10) {
		m = "0" + m;
	}
	if(s < 10) {
		s = "0" + s;
	}
	if(h == undefined || m == undefined && s == undefined) {
		h = "00";
		m = "00";
		s = "00";
		setTimeout(function() {
			location.reload();
		}, 2000);
		//return;
	}
	var datatime = "<p>" + strTxt + "：<span>" + h + "</span>&nbsp;:&nbsp;<span>" + m + "</span>&nbsp;:&nbsp;<span>" + s + "</span></p>";
	//将倒计时赋值到div中  
	$("#RechTimeT").html(datatime);
	//递归每秒调用countTime方法，显示动态时间效果  
	setTimeout(function() {
		countTime1(num);
	}, 1000);

}

function countTime2(num) {
	//获取当前时间  
	//	var octoberDate = new Date();
	//	var octoberNow = octoberDate.getTime();
	receiveObj.comtimeT = receiveObj.comtimeT - 1000;
	var octoberNow = receiveObj.comtimeT;
	//设置截止时间  
	var str;
	var strTxt;
	if(num == 1) {
		str = receiveObj.comtimeTstart;
		strTxt = "开始倒计时";
	} else if(num == 2) {
		str = receiveObj.comtimeTend;
		strTxt = "结束倒计时";
	}
	var endDate = new Date(str);
	var end = endDate.getTime();
	//时间差  
	var leftTime = octoberNow;
	//定义变量 d,h,m,s保存倒计时的时间  
	var d, h, m, s;
	if(leftTime >= 0) {
		d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
		h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
		m = Math.floor(leftTime / 1000 / 60 % 60);
		s = Math.floor(leftTime / 1000 % 60);
	}
	if(h < 10) {
		h = "0" + h;
	}
	if(m < 10) {
		m = "0" + m;
	}
	if(s < 10) {
		s = "0" + s;
	}
	if(h == undefined || m == undefined && s == undefined) {
		h = "00";
		m = "00";
		s = "00";
		setTimeout(function() {
			location.reload();
		}, 2000);
		//return;
	}
	var datatime = "<p>" + strTxt + "：<span>" + h + "</span>&nbsp;:&nbsp;<span>" + m + "</span>&nbsp;:&nbsp;<span>" + s + "</span></p>";
	//将倒计时赋值到div中  
	$("#RechTimeTh").html(datatime);
	//递归每秒调用countTime方法，显示动态时间效果  
	setTimeout(function() {
		countTime2(num);
	}, 1000);
}

function countTime3(num) {
	//获取当前时间  
	//	var octoberDate = new Date();
	//	var octoberNow = octoberDate.getTime();
	receiveObj.comtimeTh = receiveObj.comtimeTh - 1000;
	var octoberNow = receiveObj.comtimeTh;

	//设置截止时间  
	var str;
	var strTxt;
	if(num == 1) {
		str = receiveObj.comtimeThstart;
		strTxt = "开始倒计时";
	} else if(num == 2) {
		str = receiveObj.comtimeThend;
		strTxt = "结束倒计时";
	}
	var endDate = new Date(str);
	var end = endDate.getTime();
	//时间差  
	var leftTime = octoberNow;
	//定义变量 d,h,m,s保存倒计时的时间  
	var d, h, m, s;
	if(leftTime >= 0) {
		d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
		h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
		m = Math.floor(leftTime / 1000 / 60 % 60);
		s = Math.floor(leftTime / 1000 % 60);
	}
	if(h < 10) {
		h = "0" + h;
	}
	if(m < 10) {
		m = "0" + m;
	}
	if(s < 10) {
		s = "0" + s;
	}
	if(h == undefined || m == undefined && s == undefined) {
		h = "00";
		m = "00";
		s = "00";
		setTimeout(function() {
			location.reload();
		}, 2000);
		//return;
	}
	var datatime = "<p>" + strTxt + "：<span>" + h + "</span>&nbsp;:&nbsp;<span>" + m + "</span>&nbsp;:&nbsp;<span>" + s + "</span></p>";
	//将倒计时赋值到div中  
	$("#RechTimeF").html(datatime);
	//递归每秒调用countTime方法，显示动态时间效果  
	setTimeout(function() {
		countTime3(num);
	}, 1000);

}

function countTime4(num) {
	//获取当前时间  
	//	var octoberDate = new Date();
	//	var octoberNow = octoberDate.getTime();
	receiveObj.comtimeF = receiveObj.comtimeF - 1000;
	var octoberNow = receiveObj.comtimeF;
	//设置截止时间  
	var str;
	var strTxt;
	if(num == 1) {
		str = receiveObj.comtimeFstart;
		strTxt = "开始倒计时";
	} else if(num == 2) {
		str = receiveObj.comtimeFend;
		strTxt = "结束倒计时";
	}
	var endDate = new Date(str);
	var end = endDate.getTime();
	//时间差  
	var leftTime = octoberNow;
	//定义变量 d,h,m,s保存倒计时的时间  
	var d, h, m, s;
	if(leftTime >= 0) {
		d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
		h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
		m = Math.floor(leftTime / 1000 / 60 % 60);
		s = Math.floor(leftTime / 1000 % 60);
	}
	if(h < 10) {
		h = "0" + h;
	}
	if(m < 10) {
		m = "0" + m;
	}
	if(s < 10) {
		s = "0" + s;
	}
	if(h == undefined || m == undefined && s == undefined) {
		h = "00";
		m = "00";
		s = "00";
		setTimeout(function() { 
			location.reload();
		}, 2000);
		//return;
	}
	var datatime = "<p>" + strTxt + "：<span>" + h + "</span>&nbsp;:&nbsp;<span>" + m + "</span>&nbsp;:&nbsp;<span>" + s + "</span></p>";
	//将倒计时赋值到div中  
	$("#RechTimeFi").html(datatime);
	//递归每秒调用countTime方法，显示动态时间效果  
	setTimeout(function() {
		countTime4(num);
	}, 1000);
}
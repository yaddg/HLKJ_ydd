var rqstObj = null; //参数
var channel = null; //参数 渠道
var memberId = rqstParamsObj.memberId;
var receiveObj = {
	isopen: false,
	receive: function() {
		var receiveBox = $("#receiveBox").css("display");
		if(receiveBox == "block") {
			$("#receiveBox").css("display", "none");
		} else {
			$("#receiveBox").css("display", "block");

		}

	}, //预加载
	novWelfareLoad: function() {
		//console.log(hltjDomainUrl + "/activity/queryParticipation ")
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/totalVouchers",
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
					//var code = data.code; 
					$(".getNum").text(data);
					receiveObj.novAwardRecord();
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
	//滚动播出
	novAwardRecord: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/vouchersBroadcast",
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
					var mon;
					var registerDate;
					var time;
					var ss = 1000;
					var mi = ss * 60;
					var hh = mi * 60;
					var dd = hh * 24;

					var toDay = new Date();
					var oldDay = new Date("2019-07-30 10:52:28");
					$.each(data, function(i, item) {
						//老王爱吃肉 获得200元代金券
						nickName = item.nickName; //昵称
						registerDate = item.registerDate; //注册时间
						mon = item.vouchers; //金额
//
//						oldDay = new Date(time);
//						sta = toDay - oldDay;
//						sta = Math.floor(sta / dd);
//						sta++;
						
						str1 += '<li>' + nickName + '&nbsp;注册第' + registerDate + '天获得<span>' + mon + '</span>元</li>';
						$("#ul1").html(str1)
					});
					$('#ul1').liMarquee({
						direction: 'up',
						scrollamount: 40,
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
	}
}

window.onload = function() {
	rqstParamsObj = getTheRequestParams(); //加载页面参数

	//addChannelVisitRecord();  //添加渠道访问记录
	addChannelVisitRecordChannel(0);
	receiveObj.novWelfareLoad();
//	$(".noviceWelfareDstjBg02 div").text("");
	//var ddd = Date.parse(new Date());
	//var date = new Date();
	//	var date = new Date("2013/03/08 17:20:05");
	//	var tim = date.getTime()
	//	console.log(tim);
	//	console.log(new Date().getTime()); 

	//	$(".noviceWelfareDstjBut").on("click", function() {
	//		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
	//			window.location.href = hltjAppObj.appRechargeUrl;
	//		} else {
	//			window.location.href = hltjAppObj.appLoginUrl;
	//		}
	//	});
	//	$(".mySupernatantIonic,.noviceWelfareDstjTip").on("click", function() {
	//		receiveObj.receive();
	//	});

	$(".goTransaction").on("click", function() {
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
			window.location.href = hltjAppObj.appHomeUrl + "1";
		} else {
			window.location.href = hltjAppObj.appLoginUrl;
		}

	});
}
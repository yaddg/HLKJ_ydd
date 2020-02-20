var rqstObj = null; //参数
var channel = null; //参数 渠道

var receiveObj = {
	isopen: false,
	receive: function() {
		var receiveBox = $("#receiveBox").css("display");
		if(receiveBox == "block") {
			$("#receiveBox").css("display", "none");
		} else {
			$("#receiveBox").css("display", "block");

		}

	},
	//滚动播出
	novAwardRecord: function() {
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/randomBroadcast",
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
					var prizeDesc;
					var sta;
					var time;
					$.each(data, function(i, item) {
						//老王爱吃肉 获得200元代金券
						nickName = item.nickName;
						prizeDesc = item.amount;
						sta = item.status;
						time = item.time / 1000;
						if(sta == "1") {
							sta = "盈利";
						} else {
							sta = "充值";
						}
						if(time < 60) {
							time = "刚刚";
						} else if(time > 59 && time < 3600) {
							time = Math.floor(time / 60) + "分钟前";
						} else if(time > 3599 && time < 3600 * 24) {
							time = Math.floor(time / 3600) + "小时前";
						} else if(time >= 3600 * 24) {
							var day = 3600 * 24;
							time = Math.floor(time / day) + "天前";
						} else {
							time = "刚刚";
						}
						str1 += '<li>' + nickName + '&nbsp;' + sta + '<span>' + prizeDesc + '</span>元&nbsp;&nbsp;' + time + '</li>';
						$("#ul1").html(str1)
					});
					$('#ul1').liMarquee({
						direction: 'up',
						scrollamount: 80,
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
	receiveObj.novAwardRecord();

	//var ddd = Date.parse(new Date());
	//var date = new Date();
	//	var date = new Date("2013/03/08 17:20:05");
	//	var tim = date.getTime()
	//	console.log(tim);
	//	console.log(new Date().getTime()); 

	$(".noviceWelfareDstjBut").on("click", function() {
		var memberId = rqstParamsObj.memberId;
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
			window.location.href = hltjAppObj.appRechargeUrl;
		} else {
			window.location.href = hltjAppObj.appLoginUrl;
		}
		
	});
	$(".nwDstjImg").on("click", function() {

		window.location.href = hltjAppObj.appHomeUrl+"1";
	});
	$(".mySupernatantIonic,.noviceWelfareDstjTip").on("click", function() {
		receiveObj.receive();
	});
	$(".noviceWelfareDstjIp").on("click", function() {
		window.location.href = "dasheng://www.dasheng.com/service";
	});
}
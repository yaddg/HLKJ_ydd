var rqstObj = null; //参数
var channel = null; //参数 渠道
var copyTextState = 0;
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
	share: function() {
		var memberId = rqstParamsObj.memberId;
		var isLogin = commonObj.isLogin();
		if(!isLogin) {
			return false;
		}
		//var _url = "http://h.mqkji.cn" + "/hltjmobile/source/html/july/julyInviteFriend.html?memberId=" + memberId;
		var urlStr = "http://" + window.location.host + "/dstjmobile/source/html/activity/inviteFriendPeo.html?memberId=" + memberId;
		urlStr = hltjAppObj.appShare + "?title=您的好友，送您998元体验券，点击领取&content=用券投资，盈利可提现，亏损平台担！&share_url=" + urlStr;
		window.location.href = urlStr;
	},
	coupoRecord: function() {
		console.log(rqstParamsObj.memberId)
		$.ajax({
			url: hltjDomainUrl + "/activity/invite",
			//url: "http://47.110.14.113:8866/dstj-activity" + "/activity/invite",
			data: {
				memberId: rqstParamsObj.memberId
			},
			type: "POST",
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.code == 0) {
					
					//"nickName": "指尖淘", 昵称
					//"inviteNum": 2, 邀请人数
					//"amount": 188        获得奖励
					var data = data.data.memberInviteNotifyVo;
					var inviteNum;
					var amount;
					if(data == undefined || data == null || data == "") {
						inviteNum = "0";
						amount = "0";
					} else {
						inviteNum = data.inviteNum;
						amount = data.amount;
						if(inviteNum == undefined || inviteNum == null || inviteNum == "") {
							inviteNum = "0";
						}

						if(amount == undefined || amount == null || amount == "") {
							amount = "0";
						}
					}

					$(".inviteNum").text(inviteNum + "名好友");
					$(".inviteAmont").text(amount + "元");
					receiveObj.novAwardRecord();
				} else if(data.code == 500) {
					alert(data.desc);
				}
			},
			error: function(er) {
				alert("获取信息出错" + er);
			}
		});
	},
	shortLinks: function() {
		var ajax = new XMLHttpRequest();
		var token = '8f1b913e03cb80746b541e2d6fe5af68';
		var memberId16 = Number(rqstParamsObj.memberId);
		var detailUrl = "/dstjmobile/source/html/activity/inviteFriendPeo.html";
		var longUrl = 'http://h.pjlzkj.com/dstjmobile/source/html/activity/inviteFriendPeo.html?memberId=' + memberId16.toString(16);
		//var longUrl = 'http://h.pjlzkj.com/dstjmobile/source/html/coupon/couponDstj0820.html?channel=uc15';
		var termOfValidity = '1-year'; //短网址有效期，支持：(1)"long-term"：永久，默认值；(2)"1-year"：1年
		ajax.open('post', 'https://dwz.cn/admin/v2/create', 'true');

		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.setRequestHeader("Token", token);

		// 发送请求
		ajax.send(JSON.stringify({
			Url: longUrl,
			TermOfValidity: termOfValidity
		}));

		ajax.onreadystatechange = function() {
				//receiveObj.coupoRecord();
				if(ajax.readyState === 4 && ajax.status === 200) {
					// 获取缩短后的网址

					var shortDate = JSON.parse(ajax.responseText);
					console.log(shortDate);
					//console.log(JSON.parse(shortDate));

					var shortLink = shortDate.ShortUrl;
					console.log(shortLink);
					$("#input").html(shortLink);

				}
			}
			//		$.ajax({
			//			url: "https://dwz.cn/admin/v2/create",
			//			data: {
			//				Url: longUrl,
			//				TermOfValidity: termOfValidity
			//			},
			//			type: "POST", 
			//			dataType: 'json',
			//			success: function(data) {
			//				if(data.code == 0) {
			//					console.log(data);
			//					//"nickName": "指尖淘", 昵称
			//					//"inviteNum": 2, 邀请人数
			//					//"amount": 188        获得奖励 
			//					alert("哈哈")
			//				} else if(data.code == 500) {
			//					alert(data.desc);
			//				}
			//			},
			//			beforeSend: function(xhr) {
			//				//token = token;
			//				
			//				xhr.setRequestHeader("async", "true");
			//				xhr.setRequestHeader("Content-Type", "application/json");
			//				xhr.setRequestHeader("token", token);
			//			},
			//			error: function(er) {
			//				alert("获取信息出错" + er);
			//			}
			//		});
	},
	//滚动播出
	novAwardRecord: function() {
		$.ajax({
			url: hltjDomainUrl + "/activity/inviteNotify",
			//url: "http://47.110.14.113:8866/dstj-activity" + "/activity/inviteNotify",
			data: {},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				receiveObj.shortLinks();
				console.log(data);
				//receiveObj.novAwardRecord(tidings);
				if(data.code == 0) {
					var data = data.data.memberInviteNotifies;
					var str1 = '';
					var str2 = '';
					var nickName;
					var amount;
					var inviteNum;
					var time;
					$.each(data, function(i, item) {
						//老王爱吃肉 获得200元代金券
						nickName = item.nickName;
						inviteNum = item.inviteNum;
						amount = item.amount;
						if(nickName == undefined || nickName == null || nickName == "") {
							nickName = "0";
						}
						if(inviteNum == undefined || inviteNum == null || inviteNum == "") {
							inviteNum = "0";
						}
						if(amount == undefined || amount == null || amount == "") {
							amount = "0";
						}
						str1 += '<li>' + nickName + '邀请<span>' + inviteNum + '个好友</span>，获得<span>' + amount + '元代金券</span></li>';
						$("#ul1").html(str1)
					});
					$('#ul1').liMarquee({
						direction: 'up',
						scrollamount: 20,
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
				receiveObj.shortLinks();
				alert("系统错误" + er);
			}
		});
	}
}

window.onload = function() {
	rqstParamsObj = getTheRequestParams(); //加载页面参数
	//addChannelVisitRecord();  //添加渠道访问记录
	addChannelVisitRecordChannel(0);
	receiveObj.coupoRecord();
	//receiveObj.shortLinks();
	//var ddd = Date.parse(new Date());
	//var date = new Date();
	//	var date = new Date("2013/03/08 17:20:05");
	//	var tim = date.getTime()
	//	console.log(tim);
	//	console.log(new Date().getTime()); 

	$(".dstjCardBut").on("click", function() {
		var memberId = rqstParamsObj.memberId;
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
			receiveObj.shortLinks();
			if(copyTextState == 0) {
				$(".dstjCardBut").css("background", "rgba(255,230,155,1)");
				$(".dstjCardInvitation").css("display", "block");
				//复制信息
				var Url2 = document.getElementById("input"); //要复制文字的节点
				Url2.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				var uyi = document.execCommand("Copy"); // 执行浏览器复制命令
				//alert(uyi)
					//var input = document.getElementById("input");
					//input.value = text; // 修改文本框的内容

				//$("#input").select(); // 选中文本
				//alert($("#input").text());
				//document.execCommand("copy"); // 执行浏览器复制命令
				//alert("复制成功");
			}
			copyTextState++;
		} else {
			window.location.href = hltjAppObj.appLoginUrl;
		}

	});
	$(".nwDstjImg").on("click", function() {

		window.location.href = hltjAppObj.openUrl;
	});
	$(".mySupernatantIonic,.noviceWelfareDstjTip").on("click", function() {
		receiveObj.receive();
	});
	$(".noviceWelfareDstjIp").on("click", function() {
		window.location.href = "dasheng://www.dasheng.com/service";
	});
}

//function copyText() {
//	receiveObj.shortLinks();
//	if(copyTextState == 0) {
//		$(".dstjCardBut").css("background", "rgba(255,230,155,1)");
//		$(".dstjCardInvitation").css("display", "block");
//	}
//	copyTextState++;
//var text = document.getElementById("text").innerText;
//var input = document.getElementById("input");
//input.value = text; // 修改文本框的内容
//input.select(); // 选中文本
//document.execCommand("copy"); // 执行浏览器复制命令
//alert("复制成功");
//}

function openWeixin() {
	var inputText = $("#input").text();
	console.log(inputText)
	if(inputText == "请重新复制邀请链接") {
		receiveObj.shortLinks();
	} else {
		window.location.href = 'weixin://';
	}
}

function openQQ() {
	var inputText = $("#input").text();
	console.log(inputText)
	if(inputText == "请重新复制邀请链接") {
		receiveObj.shortLinks();
	} else {
		//window.location.href="mqqwpa://im/chat?chat_type=wpa&uin=undefind&version=1&src_type=web&web_src=oicqzone.com";
		window.location.href = 'mqqwpa://im/chat?chat_type=wpa&uin=000000&version=1&src_type=web&web_src=oicqzone.com';
	}
}
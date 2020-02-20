var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var tops = 0;
var addNum8;
var addNum80;
var addNum100;
var txtdatas;
var receiveObj = {
	isopen: false,
	pageInit: function() {
		//		var receiveleft = (htmlWidth - 172) / 2;
		//		//			$("#receiveButImg").css("left",receiveleft+"px");
		//		var heioptionBg = $("#optionBg").position().width;
		//		console.log(heioptionBg)
		//			var optionBgTop = (htmlHeight - 140)/2;
		var headimg = $(".backimg").offsetHeight;
		console.log(headimg)
		var optionBgLeft = (htmlWidth - 320) / 2;
		//			$("#optionBg").css("left",optionBgTop+"px");
		$("#optionBg").css("left", optionBgLeft / 100 + "rem");
		$("#optionBgO").css("left", optionBgLeft / 100 + "rem");
	},
	receive: function(data) {
		//回到页面顶部 
		//tops = $("body").scrollTop(); 
		tops = document.body.scrollTop;
		$('body').css("position", "fixed")
		$("#optionBgO").css("display", "none");
		$("#receiveBox").css("display", "block");
		$("#optionBg").css("display", "block");
		if(data == 1) {
			//未开始
			$(".activityStatus").text("活动未开始");
			$(".activityDate").text("开始时间：7月9日06:00");
			$(".optionBut").text("我知道了");
		} else if(data == 2) {
			//已结束
			$(".activityStatus").text("活动已结束");
			$(".activityDate").text("结束时间：7月14日04:00");
			$(".optionBut").text("我知道了");
		} else if(data == 3) {
			//成功
			$(".activityStatus").text("恭喜您，兑换成功！");
			//$(".activityDateNum").text("您已成功抢夺8元代金券");
			$(".activityDate").html("<span class='moneyData'>" + txtdatas + "</span>" + "<br/>将在活动结束后三个工作日内发放至<br/>您的账户");
			$(".optionBut").text("朕已阅");
			$(".activityStatus").css("font-size", "0.22rem")
			$(".activityStatus").css("font-weight", "bold")
			$(".optionBut").css("margin-top", "0.1rem")
			$(".optionBg").css("line-height", "0.3rem")
				//			$(".optionBg").css("background-image", "url(images/radpackSuc.png)")
		} else if(data == 4) {
			//已结束  
			$(".activityStatus").text("很遗憾");
			$(".activityDate").html("您当前投资金额不足，无法进行兑换<br/>请去投资获得");
			$(".optionBut").text("投资去咯");
			$(".activityStatus").css("font-size", "0.18rem")
			$(".activityStatus").css("font-weight", "bold")
			$(".optionBut").css("margin-top", "0.2rem");
			$(".activityDate").css("font-size", "0.14rem");
			//$(".optionBg").css("padding-top", "1.5rem")
			$(".optionBg").css("line-height", "0.25rem")
			$(".optionBut").attr("onclick", "receiveObj.AppKnow();");
			$(".optionBg").css("background-image", "url(images/SumStormloss.png)")

		} else if(data == 6) { 
			//上限
			$(".activityStatus").text("大神好");
			$(".activityDate").html("您已成功抢夺2000元本金福利，已达<br/>活动奖励上限，给其他小白留点吧~");
			$(".optionBut").text("朕准了");
			$(".activityStatus").css("font-size", "0.22rem")
			$(".activityStatus").css("font-weight", "bold")
			$(".optionBut").css("margin-top", "0.2rem");
			$(".activityDate").css("font-size", "0.14rem");
			//$(".optionBg").css("padding-top", "1.5rem")
			$(".optionBg").css("line-height", "0.25rem")
				//$(".optionBg").css("background-image", "url(images/radpackSuc.png)")

		} else if(data == 10) {
			//历史记录
			var str1 = '';
			var str2 = '';
			var monall = receiveObj.comList.convertReward;
			$.each(receiveObj.comList.list, function(i, item) {

				console.log(item.id);

				str1 += '<li>' + receiveObj.comList.list[i].convertNum + '</li>';

				$("#optionBgLi").html(str1)
			});
			$("#optionBg").css("display", "none");
			$("#optionBgO").css("display", "block");
			$(".activityStatust").text("我的兑换(共" + monall + "元)");
			$(".activityStatust").css("font-size", "0.18rem")
			$(".activityStatust").css("font-weight", "bold")

		}else{
			//500
			$(".activityStatus").text("很遗憾");
			$(".activityDate").text(data);
			$(".optionBut").text("朕已阅");
			$(".activityStatus").css("font-size", "0.18rem")
			$(".activityStatus").css("font-weight", "bold")
			$(".optionBut").css("margin-top", "0.2rem");
			$(".activityDate").css("font-size", "0.14rem");
			//$(".optionBg").css("padding-top", "1.5rem")
			$(".optionBg").css("line-height", "0.25rem")
			//$(".optionBut").attr("onclick", "receiveObj.AppKnow();");
			$(".optionBg").css("background-image", "url(images/SumStormloss.png)")
		}
	},
	downloadKnow: function() {
		//回到页面顶部 
		$("body").css("position", "static");
		$("#receiveBox").css("display", "none");
		document.body.scrollTop = tops;
	},
	AppKnow: function(ture) {
		//行情   
		$("body").css("position", "static");
		$("#receiveBox").css("display", "none");

		document.body.scrollTop = tops;

		window.location.href = 'hailang://www.hailang.com/native?name=home&index=1';

	},
	openApp: function() {
		if(receiveObj.isWeiXin()) { //如果是微信直接跳转到应用市场
			window.location.href = hltjAppObj.downloadUrl;
		} else {
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.src = hltjAppObj.openUrl;
			document.body.appendChild(iframe);
			var u = navigator.userAgent;
			var last = Date.now();
			var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
			setTimeout(function() {
				if(Date.now() - last < 2000) {
					window.location.href = hltjAppObj.downloadUrl;
				}
			}, 1000);
		}
	},
	txtRoll: function(data) {
		var str1 = '';
		var str2 = '';
		$.each(data.convertList, function(i, item) {

			str1 += '<li>恭喜' + data.convertList[i].mobile + "成功兑换本金福利&nbsp;" + data.convertList[i].convertReward + '元</li>';

			$("#ul1").html(str1)
		});
	},
	txtAdd: function(data) {
		//次数 
		var count8 = receiveObj.commentList.numOne;
		var count80 = receiveObj.commentList.numTwo;
		var count100 = receiveObj.commentList.numThree;
		var status = receiveObj.commentList.status;
		//已抢
		var convertReward = receiveObj.commentList.convertReward;
		if(status != 3){
			return;
		}
		if(convertReward == 2000) {
			receiveObj.receive(6)
		}else{
			if(data == 1) {
				addNum8 = Number($("#digitNum8").text())
				addNum8++
				if(addNum8 > count8) {
					addNum8--
					receiveObj.receive(4)
				} else {
					addNum80 = 0;
					addNum100 = 0
					$("#digitNum8").text(addNum8)
					$("#digitNum80").text(0)
					$("#digitNum100").text(0)
				}

			} else if(data == 2) {
				addNum80 = Number($("#digitNum80").text());
				addNum80++
				if(addNum80 > count80) {
					addNum80--
					receiveObj.receive(4)
				} else {
					addNum8 = 0;
					addNum100 = 0;
					$("#digitNum8").text(0)
					$("#digitNum80").text(addNum80)
					$("#digitNum100").text(0)
				}

			} else if(data == 3) {
				addNum100 = Number($("#digitNum100").text());
				addNum100++

				if(addNum100 > count100) {
					addNum100--
					receiveObj.receive(4)
				} else {
					addNum8 = 0
					addNum80 = 0
					$("#digitNum8").text(0)
					$("#digitNum80").text(0)
					$("#digitNum100").text(addNum100)
				}
			}
		}

	},
	txtMin: function(data) {
		var status = receiveObj.commentList.status; 
		if(status != 3){
			return;
		}
		if(data == 1) {
			addNum8 = $("#digitNum8").text();
			if(addNum8 != 0) {
				addNum8--
				$("#digitNum8").text(addNum8)
			}
		} else if(data == 2) {
			addNum80 = $("#digitNum80").text();
			if(addNum80 != 0) {
				addNum80--
				$("#digitNum80").text(addNum80)
			}
		} else if(data == 3) {
			addNum100 = $("#digitNum100").text();
			if(addNum100 != 0) {
				addNum100--
				$("#digitNum100").text(addNum100)
			}
		}
	},
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	scrambleData: function() {
		$.ajax({
			url: hltjDomainUrl + "/activity/convertLoad",
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
				//				status  活动状态    1未开始2已结束3进行中 
				if(data.code == 0) {
					receiveObj.commentList = data.data;
					//未开始
					var status = receiveObj.commentList.status;
					if(status == 1) {
						$("#conetntTxtP1").text("活动未开始!");
						$("#conetntTxtP2").text("");
						return
					} else if(status == 2) {
						$("#conetntTxtP1").text("活动已结束!");
						$("#conetntTxtP2").text("");
						return
					}
					receiveObj.txtRoll(receiveObj.commentList)
					if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
						//当前现金投资额
						var digitAmount = receiveObj.commentList.amount;
						if(digitAmount == "") {
							digitAmount = 0;
						}
						//$("#digitAmount").text(digitAmount + "元");

						//剩余可兑换
						var thorAmount = receiveObj.commentList.leavings;
						if(thorAmount == "") {
							thorAmount = 0;
						}
						//$("#thorAmount").text(thorAmount + "元");

						$("#conetntTxtP1").html("您当前现金累投金额金额为<span class='digitAmount'>" + digitAmount + "元</span>");
						$("#conetntTxtP2").html("剩余可兑换额为<span class='digitAmount'>" + thorAmount + "元</span>");
					} else {
						$(".surplusTh").text("请先登录！");
					}
				} else if(data.code == 500) {
					console.log(data)
				} else {
					console.log(data)
					alert("内部错误！");
				}
			},
			error: function(er) {
				console.log(er);
				//				alert("获取文章评论出错" + er);
			}
		});
	},
	//兑换列表
	scrambleList: function() {
		$.ajax({
			url: hltjDomainUrl + "/activity/myConvert",
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
				//				status  活动状态    1未开始2已结束3进行中 
				if(data.code == 0) {
					receiveObj.comList = data.data;
					console.log(receiveObj.comList);
					receiveObj.receive(10)

				} else if(data.code == 500) {
					console.log(data)
				} else {
					console.log(data)
					alert("内部错误！");
				}
			},
			error: function(er) {
				console.log(er);
				//				alert("获取文章评论出错" + er);
			}
		});
	},
	scrambleBut: function(data) {
		var upper;
		var dataNum;
		var num;
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
			//			var addNum8;8元券
			//			var addNum80;80元券
			//			var addNum100;100元券
			if(data == 1) {
				if(addNum8 == 0 || addNum8 == undefined) {
					return
				}
				upper = {
					memberId: memberId,
					type: data,
					num: addNum8
				}
				dataNum = "8元";
				num = addNum8;
			} else if(data == 2) {
				if(addNum80 == 0 || addNum8 == undefined) {
					return
				}
				upper = {
					memberId: memberId,
					type: data,
					num: addNum80
				}
				dataNum = "80元";
				num = addNum80;
			} else if(data == 3) {
				if(addNum100 == 0 || addNum8 == undefined) {
					return
				}
				upper = {
					memberId: memberId,
					type: data,
					num: addNum100
				}
				num = addNum100;
				dataNum = "100元";
			}
			console.log(upper)
				//			状态
			var status = receiveObj.commentList.status;
			//金额
			var activityCouponAmount = receiveObj.commentList.activityCouponAmount;
			//已抢
			var convertReward = receiveObj.commentList.convertReward;

			if(status == 1) {
				receiveObj.receive(1)
			} else if(status == 2) {
				receiveObj.receive(2)
			} else if(status == 3) {
				//				if(activityCouponAmount == 0){ 
				//					receiveObj.receive(5)
				//				} else{ 
				if(convertReward == 2000) {
					receiveObj.receive(6)
				} else {
					//if(count>0){ 
					$.ajax({
						url: hltjDomainUrl + "/activity/convert",
						data: upper,
						type: "post",
						dataType: 'json',
						beforeSend: function() {
							//等待延迟的函数
						},
						success: function(data, status, xhr) {
							console.log(data);
							if(data.code == 0) {
								txtdatas = dataNum + "&nbsp;X&nbsp;" + num + "张";
								receiveObj.scrambleData();
								receiveObj.receive(3)

							} else if(data.code == 500) {
								console.log(data.desc)
								receiveObj.receive(data.desc)
							} else {
								console.log(data)
									//alert("获取bbs评论出错");
							}
						},
						error: function(er) {
							console.log(er);
							alert("内部错误");
						}
					});
					//						} else { 
					//							receiveObj.receive(4)
					//						}

				}

			}
		} else {
			console.log(hltjAppObj.appLoginUrl)
			window.location.href = hltjAppObj.appLoginUrl;
		}

	}
}
window.onload = function() {

	rqstParamsObj = getTheRequestParams(); //加载页面参数
	addChannelVisitRecord(); //添加渠道访问记录
	receiveObj.pageInit();
	receiveObj.scrambleData();
	//receiveObj.txtRoll();
	receiveObj.receive(4)

}
var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
//var memberId = "213673";
//var urls = "http://192.168.8.21:8800";
//var urls = "http://47.96.153.118:8866/hltj-api/"; 
var tops = 0;
var receiveObj = {
	isopen: false,
	pageInit: function(){
		//		var receiveleft = (htmlWidth - 172) / 2;
		//		//			$("#receiveButImg").css("left",receiveleft+"px");
		//		var heioptionBg = $("#optionBg").position().width;
		//		console.log(heioptionBg)
		//			var optionBgTop = (htmlHeight - 140)/2;
		var headimg = $(".backimg").offsetHeight;
		console.log(headimg)
		var optionBgLeft = (htmlWidth - 310) / 2;
		//			$("#optionBg").css("left",optionBgTop+"px");
		$("#optionBg").css("left", optionBgLeft / 100 + "rem");
	},
	receive: function(data){
		//回到页面顶部 
		//tops = $("body").scrollTop(); 
		tops = document.body.scrollTop; 
        $('body').css("position","fixed") 
		$("#receiveBox").css("display","block"); 
		if(data == 1){
			//未开始
			//				activityStatus
			//				activityDate
			//				optionBut 
			$(".activityStatus").text("活动未开始");
			$(".activityDate").text("开始时间：7月2日06:00");
			$(".optionBut").text("我知道了");
		}else if(data == 2){
			//已结束
			$(".activityStatus").text("活动已结束");
			$(".activityDate").text("结束时间：7月7日04:00");
			$(".optionBut").text("我知道了");
		}else if(data == 3){
			//已结束  
			$(".activityStatus").text("太棒了！");
			$(".activityDate").text("您已成功抢夺8元代金券");
			$(".optionBut").text("继续抢夺");
			$(".activityStatus").css("font-size", "0.22rem")
			$(".activityStatus").css("font-weight", "bold")
			$(".optionBg").css("padding-top", "1.6rem")
			$(".optionBg").css("line-height", "0.3rem")
			$(".optionBg").css("background-image", "url(images/radpackSuc.png)")
		}else if(data == 4){ 
			//已结束  
			$(".activityStatus").text("很遗憾");
			$(".activityDate").html("您当前抢夺次数不足<br/>请去投资获得吧");
			$(".optionBut").text("投资去咯");
			$(".activityDate").css("text-align", "center");

			$(".activityStatus").css("font-size", "0.16rem");
			$(".activityDate").css("font-size", "0.18rem");
			$(".optionBg").css("padding-top", "1.1rem")
			$(".optionBut").css("margin-top", "0.3rem");
			$(".optionBut").attr("onclick", "receiveObj.AppKnow();");

		}else if(data == 5){
			//已结束  
			$(".activityStatus").text("呜呜呜...");
			$(".activityDate").html("本金福利已被抢光");
			$(".optionBut").text("下次继续");
			$(".optionBg").css("padding-top", "1.5rem")
			$(".activityStatus").css("font-size", "0.17rem");
			$(".activityDate").css("font-size", "0.18rem");
			$(".optionBg").css("line-height", "0.3rem")
			$(".optionBg").css("background-image", "url(images/radpack.png)")

		}else if(data == 6){
			//已结束  
			$(".activityStatus").text("大神您好");
			$(".activityDate").html("您已成功抢夺2000元，已达<br/>活动奖励上限，给其他<br/>小白留点吧~");
			$(".optionBut").text("朕准了");
			$(".activityStatus").css("font-size", "0.22rem")
			$(".activityStatus").css("font-weight", "bold")
			$(".optionBut").css("margin-top", "0.2rem");
			$(".optionBg").css("padding-top", "1.5rem")
			$(".optionBg").css("line-height", "0.25rem")
			$(".optionBg").css("background-image", "url(images/radpackSuc.png)")

		}

//				var heibot = $(".proIntroduceTop").position().top;
//				var heiWhole = htmlHeight - 44;
//				$("#receiveBox").css("height", heiWhole + "px");
//				$(".boxbg").css("height", htmlHeight + "px");

	},
	AppKnow: function(ture){
		//行情   
		$("body").css("position", "static");
		$("#receiveBox").css("display", "none");
		
		document.body.scrollTop = tops;
		
		window.location.href = 'hailang://www.hailang.com/native?name=home&index=1';

	},
	openApp: function(){
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
	downloadApp: function(){
		commonObj.downloadApK();
	},
	isWeiXin: function(){
		var ua = window.navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	scrambleData: function(){
		$.ajax({
			url: hltjDomainUrl + "/activity/catchCouponLoad",
			data: {
				memberId: memberId
			},
			type: "post",
			dataType: 'json',
			beforeSend: function(){
				//等待延迟的函数
			},
			success: function(data, status, xhr){
				console.log(data);
				//				status  活动状态    1未开始2已结束3进行中
				//				activityCouponAmount  活动本金剩余  
				//				amount  用户投资金额 
				//				count 可抢券次数 
				//				sumCouponAmount 可抢券金额
				//				catchCouponAmount 已抢券金额	
				if(data.code == 0){
					receiveObj.commentList = data.data;
					console.log(receiveObj.commentList);
					//当前剩余
					var monTxt = receiveObj.commentList.activityCouponAmount;
					if(monTxt == "") {
						monTxt = 0;
					}
					$(".scrambleMon").text(monTxt + "元");
					//未开始
					var status = receiveObj.commentList.status;
					if(status == 1) {
						receiveObj.receive(1)
					} else if(status == 2) {
						receiveObj.receive(2)
					}

					if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {

						//我的当前投资额为
						var monTxts = receiveObj.commentList.amount;
						if(monTxts == "") {
							monTxts = 0;
						}
						$(".surplusMons").text(monTxts);
						//可抢
						var monTxtsh = receiveObj.commentList.sumCouponAmount;
						if(monTxtsh == "") {
							monTxtsh = 0;
						}
						$(".surplusMonsh").text(monTxtsh);
						//已抢
						var monTxtsht = receiveObj.commentList.catchCouponAmount;
						if(monTxtsht == "") {
							monTxtsht = 0;
						}
						$(".surplusMonsht").text(monTxtsht);
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
	scrambleBut: function(){ 
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0){ 
			//次数 
			var count = receiveObj.commentList.count;
			var status = receiveObj.commentList.status;
			//金额
			var activityCouponAmount = receiveObj.commentList.activityCouponAmount;
			//已抢
			var catchCouponAmount = receiveObj.commentList.catchCouponAmount;

			if(status == 1){ 
				receiveObj.receive(1)
			} else if(status == 2){ 
				receiveObj.receive(2)
			} else if(status == 3){ 
				if(activityCouponAmount == 0){ 
					receiveObj.receive(5)
				} else{ 
					if(catchCouponAmount == 2000){ 
						receiveObj.receive(6)
					} else{ 
						if(count>0){ 
							$.ajax({
								url: hltjDomainUrl + "/activity/catchCoupon",
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
										receiveObj.scrambleData();
										receiveObj.receive(3)

									} else if(data.code == 500) {
										console.log(data)
									} else {
										console.log(data)
											//alert("获取bbs评论出错");
									}
								},
								error: function(er){
									console.log(er);
									alert("内部错误");
								}
							});
						} else { 
							receiveObj.receive(4)
						}

					}

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

}
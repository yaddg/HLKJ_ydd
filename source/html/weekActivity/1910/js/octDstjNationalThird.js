var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;
var tops = 0;
var txtdatas;
var receiveObj = {
	isopen: false,
	//是否已领取资格
	octData: function() {
		$.ajax({
			url: hltjDomainUrl + "/activity/feeDiscount",
			data: {
				memberId: memberId
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				
				//receiveObj.octWheData();
				if(data.code == 0){
					var data = data.data;
					//$("#agrproMon").html(data+"元");
					if(data.status == 1){ 
						$("#RechButFull").html("活动未开始");
						$("#RechButFull").removeClass("RechButFull");
						$("#RechButFull").addClass("RechButAlFull");
						return;
					}else if(data.status == 2){ 
						$("#RechButFull").html("活动已结束");
						$("#RechButFull").removeClass("RechButFull");
						$("#RechButFull").addClass("RechButAlFull");
						return;
					}else if(data.status == 4){
//						$("#RechButFull").removeClass("RechButAlFull");
//						$("#RechButFull").addClass("RechButFull");
						$("#RechButFull").html("领取资格");
						$("#RechButFull").attr("onclick", "receiveObj.octWheData();");
						return;
					}else if(data.status == 5 || data.status == 3){

						$("#RechButFull").html("已领取资格");
						$("#RechButFull").removeClass("RechButFull");
						$("#RechButFull").addClass("RechButAlFull");
						var times = data.joinTime;
						$(".RechButTip").html("参与时间："+times);
						//fee  手续费   coupon  获券
						var sumFee = data.sumFee;//总手续费
						var sumIntegral = data.sumIntegral;//预计获得积分
						$(".octoberPoMon span").html(sumFee+"元"); 
						$(".octoberPot span").html(sumIntegral+"积分"); 
						
						return;
					}
				}
			},
			error: function(er) {
				console.log(er);
				alert("系统错误" + er);
			}
		});
	},
	//领取
	octWheData: function() {
//		alert("00")
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/joinActivity",
			data: {
				memberId: memberId
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
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

}
window.onload = function() {

	rqstParamsObj = getTheRequestParams(); //加载页面参数
	receiveObj.octData();
	$("#RechButFull").addClass("RechButFull");
//	addChannelVisitRecord(); //添加渠道访问记录 
	//receiveObj.receive(4)

}
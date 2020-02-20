var rqstObj = null; //参数
var channel = null; //参数 渠道 
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
				if(data.code == 0) {
					var data = data.data;
					//$("#agrproMon").html(data+"元");
					if(data.status == 1) {
						$("#RechButFull").html("活动未开始");
						$("#RechButFull").removeClass("RechButFull");
						$("#RechButFull").addClass("RechButAlFull");
						return;
					} else if(data.status == 2) {
						$("#RechButFull").html("活动已结束");
						$("#RechButFull").removeClass("RechButFull");
						$("#RechButFull").addClass("RechButAlFull");
						return;
					} else if(data.status == 4) {
						//						$("#RechButFull").removeClass("RechButAlFull");
						//						$("#RechButFull").addClass("RechButFull");
						$("#RechButFull").html("领取资格");
						$("#RechButFull").attr("onclick", "receiveObj.octWheData();");
						return;
					} else if(data.status == 5 || data.status == 3) {

						$("#RechButFull").html("已领取资格");
						$("#RechButFull").removeClass("RechButFull");
						$("#RechButFull").addClass("RechButAlFull");
						//var times = data.joinTime;
						$(".RechButTip").css("display", "none");
						//fee  手续费   coupon  获券
						var sumFee = data.sumFee; //总手续费
						var sumIntegral = data.sumIntegral; //预计获得积分
						$(".octoberPoMon span").html(sumFee + "元");
						$(".octoberPot span").html(sumIntegral + "元");

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
	//receiveObj.octData();
	var empBgNum = 1;
	$("#RechButO").addClass("RechButAlFull");
	$("#RechButO").on("click", function() {
		empBgNum = 1;
		$("#RechButO").addClass("RechButAlFull");
		$("#RechButT").removeClass("RechButAlFull");
		$("#RechButTh").removeClass("RechButAlFull");
		$(".RechButLine").css("left","67%")
		
		$(".conetntHead img").attr("src", "http://qiniuapp.hailangkeji.com/dstjToExamine0923Page01.jpg");

	})
	$("#RechButT").on("click", function() {
		empBgNum = 2;
		$("#RechButO").removeClass("RechButAlFull");
		$("#RechButT").addClass("RechButAlFull");
		$("#RechButTh").removeClass("RechButAlFull");
		$(".conetntHead img").attr("src", "http://qiniuapp.hailangkeji.com/dstjToExamine0923Page02.png");
	})
	$("#RechButTh").on("click", function() {
		empBgNum = 3;
		$("#RechButO").removeClass("RechButAlFull");
		$("#RechButT").removeClass("RechButAlFull");
		$("#RechButTh").addClass("RechButAlFull");
		$(".RechButLine").css("left","34%")
		$(".conetntHead img").attr("src", "http://qiniuapp.hailangkeji.com/dstjToExamine0923Page03.jpg");
	})
	
	$(".RechButEmpBg").on("click", function() {
		if(empBgNum<3){
			window.location.href = 'couponIframeAd0919Page.html?empBgNum=' + empBgNum;
		}
	})
}
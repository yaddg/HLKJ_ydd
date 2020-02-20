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

	},
	//预加载
	novAwardRecord: function() {
		console.log(hltjDomainUrl + "/activity/queryParticipation ")
		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/queryParticipation",
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
					var code = data.code;
					if(code == 1) {
						$("#rechConBut").removeClass("rechConBut").addClass("rechConAlBut");
						$("#rechConBut").text("已参与");
					} else {
						$("#rechConBut").on("click", function() {
							receiveObj.actRechBut();
						});
					}
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
	//立即参与
	actRechBut: function() {
		$("#rechConBut").off("click");

		$.ajax({
			//url: hltjDomainUrl + "/activity/convertLoad",
			url: hltjDomainUrl + "/activity/insertParticipation",
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
					location.reload();
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

	$("#rechConBut").addClass("rechConBut");
	//var ddd = Date.parse(new Date());
	//var date = new Date();
	//	var date = new Date("2013/03/08 17:20:05");
	//	var tim = date.getTime()
	//	console.log(tim);
	//	console.log(new Date().getTime()); 

	if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0) {
		receiveObj.novAwardRecord();
	} else {
		$("#rechConBut").on("click", function() {
			window.location.href = hltjAppObj.appLoginUrl;
		});
	};
	$(".noviceWelfareDstjBut").on("click", function() {
		window.location.href = hltjAppObj.appRechargeUrl;
	});

}
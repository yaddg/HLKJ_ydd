var rqstObj = null; //参数
var channel = null; //参数 渠道 
var memberId = getTheRequestParams().memberId;

var activity = {
	listUrl: hltjbaseObj.activityListUrl,
	detailUrl: "/dstjmobile/source/html/activity/detail.html",
	page: 1,
	endPage: 1,
	pageSize: 10,
	loadList: function() {
		$.ajax({
			url: hltjDomainUrl + "/activity/grdaelist",
			data: {
				memberId: memberId
			},
			type: "GET",
			dataType: 'json',
			crossDomain: true,
			success: function(data) {
				console.log(data)
				if(data.code == 0) {
					activity.page += 1;
					var list = data.data[0];
					var actUrl;
					var actUrlIndex;
					var activityObj;
					var str;
					console.log(list)
					for(var i = 0; i < list.length; i++) {
						activityObj = list[i];
						//console.log(activityObj)
						actUrl = activityObj.url;
						//console.log(actUrl)
						if(actUrl != undefined && actUrl != ""){
							actUrlIndex = actUrl.indexOf("c")+2;
							//console.log(actUrlIndex)
							//actUrl = actUrl.substring(actUrlIndex);
							//actUrl = '\''+actUrl.substring(actUrlIndex)+'\'';
							actUrl = '\''+actUrl+'\'';
							//console.log(actUrl)
						}
						str = '<div class="activityItem" onclick="checkedDetailLogin(' + actUrl + ')">';
						str += '	<img src="' + activityObj.images + '" />';
						str += '</div>';
						$("#activityList").before(str);
						
					}

				} else if(data.code == 500) {
					//alert("暂无更多数据");
				}
			},
			error: function(er) {
				//alert("获取列表出错" + er);
			}
		});
	},
	loadEndList: function() {
		$.ajax({
			url: activity.listUrl,
			data: {
				row: activity.endPage,
				pageSize: activity.pageSize,
				status: 1
			},
			type: "GET",
			dataType: 'json',
			success: function(data) {
				if(data.code == 0) {
					activity.endPage += 1;
					var list = data.data;
					for(var i = 0; i < list.length; i++) {
						var activityObj = list[i];
						var str = '<div class="activityItem" >';
						str += '	<img src="' + activityObj.banners + '" onclick="activity.checkeDetail(' + activityObj.id + ')" />';
						str += '</div>';
						$("#activityEndList").append(str);
					}
				} else if(data.code == 500) {
					alert("暂无更多数据");
				}
			},
			error: function(er) {
				alert("获取活动结束列表出错" + er);
			}
		});
	},
//	switchEndOrConductStatus: 0, //0-进行中，1-已结束
//	switchEndOrConduct: function() {
//		activity.page = 1;
//		activity.endPage = 1;
//		$("#activityEndList").empty();
//		$("#activityList").empty();
//		if(activity.switchEndOrConductStatus == 0) {
//
//			activity.switchEndOrConductStatus = 1;
//			$("#endFont").text("进行中");
//			activity.loadEndList();
//		} else {
//			activity.switchEndOrConductStatus = 0;
//			$("#endFont").text("已结束");
//			activity.loadList();
//		}
//	},
	checkeNovices: function() {
		var novicesImg = '../july/images/banner.png';
		var novicesLoad = '\'/hltjmobile/source/html/july/julyNovices.html\'';
		var str = '<div class="activityItem" onclick="activity.checkedDetailLogin(' + novicesLoad + ')">';
		str += '	<img src="' + novicesImg + '" />';
		str += '</div>';
		$("#activityList").append(str);
	}
}

window.onload = function() {
//	rqstParamsObj = getTheRequestParams();
	var hongbaoBgDiv = document.getElementById('endActivity');
	if(hongbaoBgDiv) {
		var hongbaoBgDiv = document.getElementById('endActivity');
		var hongbaoBgDivHeight = hongbaoBgDiv.offsetHeight;
		$("#endFont").css("line-height", hongbaoBgDivHeight + "px");
	}
	
	//activity.loadList();
}

function checkedDetailLogin(detailUrl) {
	//var url = location.search;

	if(memberId == 'undefined' || memberId == null || memberId == 'null' || memberId.length <= 0) {
		//alert("请先登陆！");
		window.location.href = hltjAppObj.appLoginUrl;
	} else {
		var _url = "http://" + window.location.host + detailUrl + "?memberId=" + memberId;
		console.log(_url)
		window.location.href = _url;
	}
}
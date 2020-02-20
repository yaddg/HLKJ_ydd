//测试环境 邀请码：58923   生产环境 邀请码：68042 41378 69332

//var hltjDomainUrl = "http://47.110.14.113:8866/dstj-activity"; //生产环境
var hltjDomainUrl = "http://47.98.216.230:8866/dstj-activity"; //测试环境
//var hltjDomainUrl = "http://47.98.206.208:8866/dstj-activity"; //预生产环境

//var hltjDomainUrl = "http://d.hailangtaojin.cn/hltj-api";//生产环境
//var hltjDomainUrl = "http://47.98.36.21:8866/hltj-api";//生产环境

var hltjbaseObj = {
	sign: 'hltjapixcxvbn',
	articleDetailUrl: hltjDomainUrl + "/api/article/detail", //文章详情
	articleCommentListUrl: hltjDomainUrl + "/api/articleComment/list", //文章评论列表
	bbsDetailUrl: hltjDomainUrl + "/api/bbs/detail", //帖子详情
	bbsCommentListUrl: hltjDomainUrl + "/api/bbs/comment/list", //帖子评论列表
	addVisitRecordUrl: hltjDomainUrl + "/api/aitaoec/addVisitRecord", //添加访问记录地址
	mobileRegisterUrl: hltjDomainUrl + "/api/member/hltjApi/mobileRegister", //手机号注册
	sendSmscodeH5Url: hltjDomainUrl + "/api/member/h5api/sendSmscode", //发送短信验证码
	registerH5Url: hltjDomainUrl + "/api/member/h5api/register", //注册
	addFullGiveMemberInfo: hltjDomainUrl + "/activity/joinActivity", //参加投资每满活动 
	findFullGiveMemberInfo: hltjDomainUrl + "/activity/memberActivityInfo", //获取投资每满活动用户奖励信息
	lotteryDrawInfo: hltjDomainUrl + "/activity/lotteryDrawCount", //抽奖次数
	queryMemberPrizeList: hltjDomainUrl + "/activity/queryMemberPrizeList", //奖品记录
	memberLotteryDraw: hltjDomainUrl + "/activity/memberLotteryDraw", //抽奖
	welfareUrl: hltjDomainUrl + "/api/record/welfare", //新手福利
	inviteRecordUrl: hltjDomainUrl + "/api/record/invite", //邀请好友活动获得代金券
	activityListUrl: hltjDomainUrl + "/activity/list", //活动列表
	memberNickUrl: hltjDomainUrl + "/api/record/nick", //获取用户昵称
	addFullIndemnity: hltjDomainUrl + "/activity/addFullIndemnity", //参加亏多少补多少活动
	findFullIndemnity: hltjDomainUrl + "/activity/findFullIndemnity", //
	bigCouponInfo: hltjDomainUrl + "/activity/transactionDaysActInfo", //获取用户活动信息
	joinDayActivity: hltjDomainUrl + "/activity/joinDayActivity" //| 超级代金券
}

var hltjAppObj = {
	openUrl: 'dasheng://www.dasheng.com/native?name=home&index=0',//首页
	downloadUrl: '',
	appTobuy: 'dasheng://www.dasheng.com/native?name=tobuy',
	appShare: 'dasheng://www.dasheng.com/share',
	appLoginUrl: 'dasheng://www.dasheng.com/loginDialog',//登录
	appRegisterUrl: 'dasheng://www.dasheng.com/registerDialog',//注册
	appRechargeUrl: 'dasheng://www.dasheng.com/native?name=recharge',//充值
	appHomeUrl: 'dasheng://www.dasheng.com/native?name=home&index=',
	downloadApk:'http://qiniuapp.maoqiankeji.cn/1.0.0/dstj_'
		
}
  		
	//获取宽高
var htmlWidth = document.documentElement.clientWidth;
var htmlHeight = document.documentElement.clientHeight; //浏览器可见高度
//var cilentHeight = document.body.scrollHeight;			//body高度

var rqstParamsObj = getTheRequestParams(); //参数对象
var commonObj = {
	openApp: function() {
		if(commonObj.isWeiXin()) { //如果是微信直接跳转到应用市场
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
	downloadApp: function() {
		window.location.href = hltjAppObj.downloadUrl;
	},
	downloadApK: function() {
		var urls = getTheRequestParams().channel;
		var urlPath = hltjAppObj.downloadApk + urls + "_aligned_signed.apk"
		console.log(urlPath)
		if(urls == "" || urls == undefined) {
			window.location.href = hltjAppObj.downloadUrl;
		} else {
			console.log(localStorage.urlCode)
			if(localStorage.urlCode == "0") {
				localStorage.urlCode = "";
				//window.location.href = hltjAppObj.downloadUrl;
				window.location.href = urlPath;
			} else {
				window.location.href = urlPath;
			}

		}
	},
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		//alert(ua);
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	isLogin: function() {
		var memberId = rqstParamsObj.memberId;
		if(memberId == 'undefined' || memberId == null || memberId == 'null' || memberId.length <= 0) {
			window.location.href = hltjAppObj.appLoginUrl;
			return false;
		}
		return true;
	}
}
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

function isHasImg() {
	var urls = getTheRequestParams().channel;
	var urlPath = hltjAppObj.downloadApk + urls + ".apk";
	console.log(urlPath)
	$.ajax({
		url: urlPath,
		type: 'HEAD',
		error: function() {
			localStorage.urlCode = "0";
		},
		success: function() {
			localStorage.urlCode = "1";
		}
	});

}
//获取地址后面参数
function getTheRequestParams() {
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
//var parmd5 = { "ary":"001", "ara":"002", "arc":"003" };
//
////MD5加密
//function getTheRequestParamsMD5(arys){
//	        var extra_str='&"sign"="1234567890"'; 
//
//          objKeySort(arys); //函数执行
//          
//          var jsonstr=JSON.stringify(objKeySort(arys));
//          console.log(jsonstr);
//          //new RegExp(':','g') 参数‘g’表示替换字符串中所有的匹配模式串，如果不写此参数，只替换找到的第一个模式串
//          var str1=jsonstr.replace(new RegExp(':','g'),'=');
//          console.log('str1=='+str1);
//          var str2=str1.replace(new RegExp(',','g'),'&');
//          console.log('str2=='+str2);
//          var str3=str2.substring(1,str2.length-1);
//          console.log('str3=='+str3);
//          var newstr=str3+extra_str;
//          console.log('new_string=='+newstr);
//          var sign = md5(newstr);
//          console.log(sign);
//          arys.sign = sign;
//          console.log(arys);
//          //排序的函数
//          function objKeySort(arys) { 
//              //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
//              var newkey = Object.keys(arys).sort();　　 
//              //console.log('newkey='+newkey);
//              var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
//              for(var i = 0; i < newkey.length; i++) {
//                  //遍历newkey数组
//                  newObj[newkey[i]] = arys[newkey[i]]; 
//                  //向新创建的对象中按照排好的顺序依次增加键值对
//
//              }
//              //返回排好序的新对象
//              return newObj; 
//          }
//}

function addChannelVisitRecord() {
	if(rqstParamsObj.channel) {
		$.ajax({
			url: hltjbaseObj.addVisitRecordUrl,
			data: {
				channel: rqstParamsObj.channel
			},
			type: "GET",
			dataType: 'json',
			success: function(data, status, xhr) {

			},
			error: function(er) {

			}
		});
	}
}

function addChannelVisitRecordChannel(num) {
	if(rqstParamsObj.channel) {
		$.ajax({
			url: hltjbaseObj.addVisitRecordUrl,
			data: {
				channel: rqstParamsObj.channel,
				type: num
			},
			type: "get",
			dataType: 'json',
			beforeSend: function() {
				//等待延迟的函数
			},
			success: function(data, status, xhr) {
				console.log(data);

			},
			error: function(er) {
				console.log(er);
				//alert("内部错误");
			}
		});
	}
	//isHasImg();
}
//getTheRequestParamsMD5(parmd5);

(function(w, d, t, s, q, m, n) {
	if(w.utq) return;
	q = w.utq = function() {
		q.process ? q.process(arguments) : q.queue.push(arguments);
	};
	q.queue = [];
	m = d.getElementsByTagName(t)[0];
	n = d.createElement(t);
	n.src = s;
	n.async = true;
	m.parentNode.insertBefore(n, m);
})(window, document, 'script', 'https://image.uc.cn/s/uae/g/0s/ad/utracking.js');
utq('set', 'convertMode', true);
utq('set', 'trackurl', 'huichuan.sm.cn/lp');
/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时28分钟15秒
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
function timeToDate(time) 
{
    // 获取当前时间戳
    var currentTime = parseInt(new Date().getTime()/1000);
    var diffTime     = currentTime-time;
    var second         = 0;
    var minute         = 0;
    var hour         = 0;
    if (null != diffTime && "" != diffTime) {
        if (diffTime > 60 && diffTime < 60 * 60) {
            diffTime = parseInt(diffTime / 60.0) + "分钟" + parseInt((parseFloat(diffTime / 60.0) - parseInt(diffTime / 60.0)) * 60) + "秒";
        }
        else if (diffTime >= 60 * 60 && diffTime < 60 * 60 * 24) {
            diffTime = parseInt(diffTime / 3600.0) + "小时" + parseInt((parseFloat(diffTime / 3600.0) -
                parseInt(diffTime / 3600.0)) * 60) + "分钟" +
                parseInt((parseFloat((parseFloat(diffTime / 3600.0) - parseInt(diffTime / 3600.0)) * 60) -
                parseInt((parseFloat(diffTime / 3600.0) - parseInt(diffTime / 3600.0)) * 60)) * 60) + "秒";
        }
        else {
            //超过1天
            var date = new Date(parseInt(time) * 1000);
            diffTime = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            //diffTime = parseInt(diffTime) + "秒";
        }
    }
    return diffTime;
}

/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时前
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
function dateStr(date){
    //获取js 时间戳
    var time=new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time=parseInt((time-date*1000)/1000);

    //存储转换值 
    var s;
    if(time<60*10){//十分钟内
        return '刚刚';
    }else if((time<60*60)&&(time>=60*10)){
        //超过十分钟少于1小时
        s = Math.floor(time/60);
        return  s+"分钟前";
    }else if((time<60*60*24)&&(time>=60*60)){ 
        //超过1小时少于24小时
        s = Math.floor(time/60/60);
        return  s+"小时前";
    }else if((time<60*60*24*3)&&(time>=60*60*24)){ 
        //超过1天少于3天内
        s = Math.floor(time/60/60/24);
        return s+"天前";
    }else{ 
        //超过3天
        var date= new Date(parseInt(date) * 1000);
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    }
}
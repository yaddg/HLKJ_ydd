
//测试环境 邀请码：58923   生产环境 邀请码：68042 41378 69332

//var hltjDomainUrl = "http://47.110.14.113:8866/dstj-activity"; //生产环境
var hltjDomainUrl = "http://47.98.216.230:8866/dstj-activity"; //测试环境
//var hltjDomainUrl = "http://d.hailangtaojin.cn/hltj-api";//生产环境
//var hltjDomainUrl = "http://47.98.36.21:8866/hltj-api";//生产环境


var hltjbaseObj = {
	sign:'hltjapixcxvbn',
	articleDetailUrl : hltjDomainUrl + "/api/article/detail",   //文章详情
	articleCommentListUrl : hltjDomainUrl + "/api/articleComment/list", //文章评论列表
	bbsDetailUrl : hltjDomainUrl + "/api/bbs/detail", //帖子详情
	bbsCommentListUrl : hltjDomainUrl + "/api/bbs/comment/list", //帖子评论列表
	addVisitRecordUrl : hltjDomainUrl + "/api/aitaoec/addVisitRecord", //添加访问记录地址
	mobileRegisterUrl : hltjDomainUrl + "/api/member/hltjApi/mobileRegister", //手机号注册
	sendSmscodeH5Url : hltjDomainUrl + "/api/member/h5api/sendSmscode", //发送短信验证码
	registerH5Url : hltjDomainUrl + "/api/member/h5api/register",  //注册
	addFullGiveMemberInfo : hltjDomainUrl + "/activity/joinActivity",  			//参加投资每满活动
	findFullGiveMemberInfo : hltjDomainUrl + "/activity/memberActivityInfo",      //获取投资每满活动用户奖励信息
	lotteryDrawInfo :  hltjDomainUrl + "/activity/lotteryDrawCount",   //抽奖次数
	queryMemberPrizeList : hltjDomainUrl + "/activity/queryMemberPrizeList",   //奖品记录
	memberLotteryDraw : hltjDomainUrl + "/activity/memberLotteryDraw",  //抽奖
	welfareUrl: hltjDomainUrl + "/api/record/welfare",  //新手福利
	inviteRecordUrl: hltjDomainUrl + "/api/record/invite",   //邀请好友活动获得代金券
	activityListUrl: hltjDomainUrl + "/activity/list",     //活动列表
	memberNickUrl: hltjDomainUrl + "/api/record/nick",     //获取用户昵称
	addFullIndemnity : hltjDomainUrl + "/activity/addFullIndemnity",     //参加亏多少补多少活动
	findFullIndemnity : hltjDomainUrl + "/activity/findFullIndemnity",   //
	bigCouponInfo : hltjDomainUrl + "/activity/transactionDaysActInfo",   //获取用户活动信息
	joinDayActivity : hltjDomainUrl + "/activity/joinDayActivity",   //| 超级代金券
	addAuthMember : hltjDomainUrl + "/api/authentic/addAuthMember"   //| 实名认证

}

var hltjAppObj = {
	openUrl: 'dasheng://www.dasheng.com/native?name=home&index=0',//首页
	downloadUrl: 'http://qr32.cn/Eeg4Yl',
	appShare: 'dasheng://www.dasheng.com/share',
	appLoginUrl: 'dasheng://www.dasheng.com/loginDialog',//登录
	appRegisterUrl: 'dasheng://www.dasheng.com/registerDialog',//注册
	appRechargeUrl: 'dasheng://www.dasheng.com/native?name=recharge',//充值
	appHomeUrl: 'dasheng://www.dasheng.com/native?name=home&index=',
	downloadApk:'http://hailangtaojin.com/hltjmobile/source/resource/2.2/hltj_2.2_'
}
//获取宽高
var htmlWidth = document.documentElement.clientWidth;
var htmlHeight = document.documentElement.clientHeight; //浏览器可见高度
//var cilentHeight = document.body.scrollHeight;			//body高度


var rqstParamsObj = null;   //参数对象
var commonObj = {
		openApp:function(){
		  if(commonObj.isWeiXin()){//如果是微信直接跳转到应用市场
			window.location.href = hltjAppObj.downloadUrl;
		  }else{
				var iframe = document.createElement('iframe');
					iframe.style.display = 'none';
					iframe.src = hltjAppObj.openUrl;
					document.body.appendChild(iframe);
				var u = navigator.userAgent;
				var last = Date.now();
				var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
				setTimeout(function() {
					if (Date.now() - last < 2000) {
						window.location.href = hltjAppObj.downloadUrl;
					}
				}, 1000);
		  }
		},
		downloadApp:function(){
			window.location.href = hltjAppObj.downloadUrl;
		},
		downloadApK:function(){
			var urls = getTheRequestParams().channel;
//			console.log(urls)
			if(urls == "" ||urls == undefined){
				window.location.href = hltjAppObj.downloadUrl;
			}else{
				var urlPath = hltjAppObj.downloadApk + urls + ".apk"
				window.location.href = urlPath;
			}
		},
		isWeiXin:function(){
            var ua = window.navigator.userAgent.toLowerCase();
			//alert(ua);
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
		},
		isLogin:function(){
			var memberId = rqstParamsObj.memberId;
			if(memberId == 'undefined' || memberId == null || memberId == 'null' || memberId.length <= 0){
				window.location.href = hltjAppObj.appLoginUrl;
				return false;
			}
			return true;
		}
}
String.prototype.replaceAll = function(s1,s2){
return this.replace(new RegExp(s1,"gm"),s2);
}


//获取地址后面参数
function getTheRequestParams(){
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) {
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
}
//获取地址后面参数
function getTheRequestParam(name){
		 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return  decodeURI(r[2]); return "";
}
//数组位置交换
function getArrParams(arr,key){
	//console.log(arr)
	//arr.splice(0,1)
	var str = arr.splice(key,1);
	arr.unshift(str[0]);
	//console.log(arr)
}
//获取随机数
function RndNum(n){
		var rnd="";
		for(var i=0;i<n;i++)
		rnd+=Math.floor(Math.random()*10);
			return rnd;
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

function addChannelVisitRecord(){
	if(rqstParamsObj.channel){
		$.ajax({
			url: hltjbaseObj.addVisitRecordUrl,
			data:{channel:rqstParamsObj.channel},
			type: "GET",
			dataType:'json',
			success:function(data,status, xhr){

			},
			error:function(er){

			}
		});
	}
}
//返回
$(".ion-ios-arrow-left").click(function(){
	history.go(-1)
})
//去投资
$(".voucherBottom div:eq(1)").click(function(){
	console.log(hltjAppObj.appHomeUrl + '1')
	window.location.href = hltjAppObj.appHomeUrl + '1';
})

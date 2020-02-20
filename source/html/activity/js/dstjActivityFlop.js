	var rqstObj = null; //参数
	var channel = null; //参数 渠道 
	var memberId = getTheRequestParams().memberId;
	var tops = 0;
	var txtdatas;
	var isflag;
	var turn;
	var verticalOpts;
	var timeOut;
	var tranId;
	var tabIndex;
	var jackpot;
	var myCars = ["#vertical0", "#vertical1", "#vertical2", "#vertical3", "#vertical4", "#vertical5"];

	var receiveObj = {
		isopen: false,
		receive: function(data) {
			var octVou;
			var sepVou;
			//回到页面顶部  
			if(data == 0) {
				//10
				sepVou = "恭喜您获得<span>10</span>积分";
				//$(".FortuneBut").text("去投资喽")
				//isflag = true;

				var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBg10.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			} else if(data == 1) {
				//50
				sepVou = "恭喜您获得<span>50</span>积分";
				var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBg50.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			} else if(data == 2) {
				//200
				sepVou = "恭喜您获得<span>200</span>积分";
				var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBg200.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			} else if(data == 3) {
				//800
				sepVou = "恭喜您获得<span>800</span>积分";
				var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBg800.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			} else if(data == 4) {
				//1600
				sepVou = "恭喜您获得<span>1600</span>积分";
				var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBg1600.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			} else if(data == 5) {
				//2400
				sepVou = "恭喜您获得<span>2400</span>积分";
				var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBg2400.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			} else if(data == 6) {
				//手速慢
				sepVou = "很遗憾，您的手速过慢， 下次早点来哦~";
				$(".FortuneBut").css("margin-top", "0.24rem");
				var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBgEmpty.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			} else if(data == 7) {
				//双倍
				sepVou = "恭喜您获得 <br/><label>" + 100 + "×2</label>积分";
				$(".FortuneHint").addClass("FortuneHintOth");
				$(".FortuneBut").addClass("FortuneButOth");
				var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBgDouble.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			} else if(data == 8) {
				///锦鲤
				sepVou = "抱歉，您的翻牌次数不足 ";
				$(".FortuneBut").text("朕知道了")
					//isflag = true;
				$(".FortuneBut").css("margin-top", "0.48rem");
				$(".FortuneBut").attr("onclick", "receiveObj.closeObtain()");
				$("#heci").css("margin-top", "0.32rem");
				var bgImg = "url(http://qiniuapp.mqkji.cn/octoberFlopCardAlertBg00.png)";
				$(".myObtainImg").css("background-image", bgImg);
				receiveObj.myObtain(sepVou, "");
			}

		},
		myObtain: function(desc, heci) {
			$("#drawDesc").html(heci);
			$("#heci").html(desc);
			$("#myObtainImg").css("display", "block");
			$("#myObtain").css("display", "block");
			$(".FortuneBut").attr("onclick", "receiveObj.closeObtain()");
		},
		closeObtain: function() {
			//				$("#myObtain").css("display", "none");
			//				$(".robShadow").css("display", "block");
			if(isflag == true) {
				isflag == false
				window.location.href = 'hailang://www.hailang.com/native?name=home&index=1';

			} else {

				location.reload();
			}
		},
		goInvestment: function() {
			window.location.href = 'dasheng://www.dasheng.com/native?name=home&index=1';
			//$("#mySupernatant").css("display", "none");
		},
		//活动规则
		octTips: function() {
			//奖品展示
			$("#myPrize").css("display", "none");
			//活动规则
			$("#myTip").css("display", "block");
			//获奖记录
			$("#myRecord").css("display", "none");
			$("#mySupernatant").css("display", "block");
		},
		//奖品展示
		octCardPrize: function() {
			//奖品展示 
			$("#myPrize").css("display", "block");
		},
		//奖品展示关闭
		octCardPrizeClose: function() {
			//奖品展示关闭 
			$("#myPrize").css("display", "none");
		},

		AppKnow: function() {

			window.location.href = hltjAppObj.appLoginUrl;
		},
		rechData: function() {
			if(memberId == 'undefined' || memberId == null || memberId == 'null' || memberId.length < 1) {
				$(".dstjMask").click(receiveObj.AppKnow);
				$(".dstjAcFlopTip img").click(receiveObj.AppKnow);
				return;
			}
			$(".dstjAcFlopTip img").click(receiveObj.octScratch);
			$.ajax({
				url: hltjDomainUrl + "/activity/packetLoad",
				//url: "http://192.168.8.21:8866/hltj-api/activity/farmingLoad",
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
						var data = data.data;
						//"tabIndex": 1,		坐标   12345
						// "status": 2,		状态    1. 未开始 2.进行中 3.已结束
						// "jackpot": 50000,		奖池    
						// "timeOut": 2993497,	距离开始/结束
						// "packetChance": 0		机会	0.无 1.有 2.用光
						tabIndex = data.tabIndex;

						var status = data.status;
						jackpot = data.jackpot;
						timeOut = data.timeOut;
						var packetChance = data.packetChance;
						//奖池金额
						$(".conetntCardHead span").html(jackpot);
						//时间段
						var flopType = 0;
						for(var i = 1; i < 6; i++) {
							if(i == tabIndex) {
								if(status == 1) {
									$(".conetimeBg0" + i + " p:last-child").html("即将开始");
								} else {
									$(".conetimeBg0" + i + " p:last-child").html("进行中");
								}
								$(".conetimeBg0" + i).css("background-color", "#FD5730");
								$(".conetimeBg0" + i + " p").css("color", "#FBE741");
								$(".conetimeBg0" + i + " p").css("font-weight", "bold");
								flopType = 1;
							} else {
								if(flopType == 0) {
									$(".conetimeBg0" + i + " p:last-child").html("已结束");
								} else {
									$(".conetimeBg0" + i + " p:last-child").html("即将开始");
								}
							}
						}
						//翻牌机会
						if(packetChance == 0) {
							$(".conetntCardTxt p:last-child").html("暂无翻牌机会");

						} else if(packetChance == 1) {
							$(".conetntCardTxt p:last-child").html("您已获得翻牌机会");
						}
						//						else {
						//							$(".conetntCardTxt p:last-child").html("您已获得本次奖励，下个整点等你哦");
						//							$(".dstjMask").html('<img src="http://qiniuapp.hailangkeji.com/dstjAcFlopLmmInv.png" />');
						//						}

						//活动状态
						if(status == 1) {

							//$(".dstjMask").css("display","block");
							if(packetChance == 0) {
								$(".dstjMask").html('<img src="http://qiniuapp.hailangkeji.com/dstjAcFlopLmmInv.png" />');
								$(".dstjMask img").click(receiveObj.goInvestment);
							} else {
								$(".dstjMask").html("<p>活动未开始</p>");
							}
							$(".conetntCardTxt label").html("距离开始");
							countTime();
						} else if(status == 2) {
							if(packetChance == 0) {
								$(".dstjMask").html('<img src="http://qiniuapp.hailangkeji.com/dstjAcFlopLmmInv.png" />');
								$(".dstjMask img").click(receiveObj.goInvestment);
							} else if(packetChance == 2) {
								var integral = data.integral;

								if(tabIndex == 4) {
									var integralS = integral / 2;
									//integral = integral+"x2";
									$(".dstjMaskAl02 p").html(integralS);
									$(".dstjMaskAl03 span").html(integralS + "x2");
								} else {
									$(".dstjMaskAl02 p").html(integral);
									$(".dstjMaskAl03 span").html(integral);
								}

								$(".dstjMask").css("display", "none");
								$(".dstjMaskAl").css("display", "block");
							} else {
								//奖池金额
								if(jackpot < 10) {
									//奖池金额
									$("#conetntCardHead").html("0");
									$(".conetntCardTxt p:last-child").html("活动已结束，下个整点等你哦");
									$(".dstjMask").html("<p>活动已结束</p>");
								} else {
									if(packetChance == 1) {
										$(".dstjMask").css("display", "none");
									}

									$(".conetntCards div").each(function() {
										console.log($(this).attr("id"))
										$(this).click(function() {
											tranId = $(this).attr("id");
											receiveObj.rechBut(tranId, 100, verticalOpts);
										})
									})
								}

							}
							$(".conetntCardTxt label").html("距离结束");

							countTime();
						} else if(status == 3) {
							$(".conetntCardTxt label").html("距离结束");
							$(".dstjMask").html("<p>活动已结束</p>");
							countTime();
						}
					}
				},
				error: function(er) {
					console.log(er);
				}
			});
		},
		rechBut: function(target, time, opts) {
			if(jackpot < 10) {
				setTimeout(function() {
					receiveObj.receive(6);
				}, 500);
			}
			$.ajax({
				url: hltjDomainUrl + "/activity/packet",
				//url: "http://192.168.8.21:8866/hltj-api/activity/joinFarmingActivity",
				data: {
					memberId: memberId,
					tabIndex: tabIndex
				},
				type: "post",
				dataType: 'json',
				beforeSend: function() {
					//等待延迟的函数
				},
				success: function(data, status, xhr) {
					console.log(data);
					if(data.code == 0) {
						var data = data.data;
						var dataId = data.prize;
						var dataImg;
						if(tabIndex == 4) {
							//双倍
							sepVou = "恭喜您获得 <br/><label>" + dataId + "×2</label>积分";
							$(".FortuneHint").addClass("FortuneHintOth");
							$(".FortuneBut").addClass("FortuneButOth");
							var bgImg = "url(http://qiniuapp.hailangkeji.com/dstjAcFlopAlertBgDouble.png)";
							$(".myObtainImg").css("background-image", bgImg);
							receiveObj.myObtain(sepVou, "");

						} else {

							if(dataId == 10) {
								setTimeout(function() {
									receiveObj.receive(0)
								}, 1200);
								//dataImg = "http://qiniuapp.mqkji.cn/octoberFlopCardBg01.png";
							} else if(dataId == 50) {
								setTimeout(function() {
									receiveObj.receive(1)
								}, 1200);
								//dataImg = "http://qiniuapp.mqkji.cn/octoberFlopCardBg02.png";
							} else if(dataId == 200) {
								setTimeout(function() {
									receiveObj.receive(2)
								}, 1200);
								//dataImg = "http://qiniuapp.mqkji.cn/octoberFlopCardBg03.png";
							} else if(dataId == 800) {
								setTimeout(function() {
									receiveObj.receive(3)
								}, 1200);
								//dataImg = "http://qiniuapp.mqkji.cn/octoberFlopCardBg04.png";
							} else if(dataId == 1600) {
								setTimeout(function() {
									receiveObj.receive(4)
								}, 1200);
								//dataImg = "http://qiniuapp.mqkji.cn/octoberFlopCardBg04.png";
							} else if(dataId == 2400) {
								setTimeout(function() {
									receiveObj.receive(5)
								}, 1200);
								//dataImg = "http://qiniuapp.mqkji.cn/octoberFlopCardBg04.png";
							}
						}
						var targetId = target;
						console.log(targetId)
						infoNum = targetId.substr(8, 1);
						//删除备选元素
						myCars.splice(infoNum, 1);

						if(infoNum == "") {
							infoNum = 0;
						}

						//生成剩下要翻转的牌的ID
						var cardStr = myCars.join();
						console.log(cardStr);
						//					++infoNum
						//					console.log(infoNum)
						//					var infoId = "#info0" + infoNum;
						//					console.log(infoId)
						//					$(infoId).attr("src", dataImg);
						//status  活动状态    1未开始2已结束3未登录4老用户5新用户已领取6新用户未领取
						//翻开点击的卡牌
						$("#" + target).find('img').stop().animate(opts[0], time, function() {
							$(this).hide().next().show();
							$(this).next().animate(opts[1], time);
							//info
						});

						console.log(cardStr);
						//翻开剩余所有卡牌
						//					setTimeout(function() {
						//						$(cardStr).find('img').stop().animate(opts[0], time, function() {
						//							$(this).hide().next().show();
						//							$(this).next().animate(opts[1], time);
						//							//info
						//						});
						//					}, 1500);
						setTimeout(function() {
							turnData(target);
						}, 200);
						//随机分发牌面
						otherCard(infoNum, dataId);
						$(".conetntCardTxt").css("display", "none");
						$(".conetntCardHead").css("display", "none");
						$(".flopSuc").css("display", "block");
						if(tabIndex == 4) {
							dataId = dataId + "x2";
						}
						$(".flopSuc span").html(dataId);
						//					setTimeout(function() {
						//						turnDataN();
						//					}, 1700);
						//location.reload();
					} else {

						receiveObj.receive(6);
					}

				},
				error: function(er) {
					console.log(er);
				}
			});
		},
		//获奖记录
		octScratch: function() {
			$.ajax({
				url: hltjDomainUrl + "/activity/myPacketList",
				data: {
					memberId: memberId,
					page: 1,
					pageSize: 100
				},
				type: "POST",
				dataType: 'json',
				crossDomain: true,
				success: function(data, status, xhr) {
					console.log(data);
					if(data.code == 0) {
						var data = data.data;
						//历史记录
						var str1 = '';
						var str2 = '';
						var dataReward;
						$.each(data, function(i, item) {
							str1 += '<li><div class="option01">';
							str1 += '<div>翻牌奖励</div>';
							str1 += '<div>' + item.createTime + '</div>';
							str1 += '</div>';
							str1 += '<div class="option03">+' + item.integral + '积分</div></li>';

							$("#optionBgLi").html(str1)
						});
						$("#myTip").css("display", "none");
						$("#myRecord").css("display", "block");
						$("#mySupernatant").css("display", "block");
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
		}
	}
	window.onload = function() {

		rqstParamsObj = getTheRequestParams(); //加载页面参数
		addChannelVisitRecord(); //添加渠道访问记录  
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var recHeight = cilentHeight * 0.88;
		$(".mySupernatantTxt").css("height", recHeight);
		//receiveObj.init();
		
		//console.log(myCars);
		//		$(".conetntCards div").each(function() {
		//			console.log($(this).attr("id"))
		//			$(this).click(function() {
		//				tranId = $(this).attr("id");
		//				console.log(tranId)
		//				receiveObj.rechBut(tranId, 100, verticalOpts);
		//			})
		//		});
		verticalOpts = [{
			'width': 0
		}, {
			'width': '100%'
		}];
		receiveObj.rechData();
	}

	function turnData(data) {
		if(data == "vertical0") {
			$("#info01").css("display", "block");
			$("#info01").css("width", "100%");
		} else if(data == "vertical1") {
			$("#info02").css("display", "block");
			$("#info02").css("width", "100%");
		} else if(data == "vertical2") {
			$("#info03").css("display", "block");
			$("#info03").css("width", "100%");
		} else if(data == "vertical3") {
			$("#info04").css("display", "block");
			$("#info04").css("width", "100%");
		} else if(data == "vertical4") {
			$("#info05").css("display", "block");
			$("#info05").css("width", "100%");
		} else if(data == "vertical5") {
			$("#info06").css("display", "block");
			$("#info06").css("width", "100%");
		}
	}

	function turnDataN() {
		$("#info01").css("display", "block");
		$("#info01").css("width", "100%");

		$("#info02").css("display", "block");
		$("#info02").css("width", "100%");

		$("#info03").css("display", "block");
		$("#info03").css("width", "100%");

		$("#info04").css("display", "block");
		$("#info04").css("width", "100%");

		$("#info05").css("display", "block");
		$("#info05").css("width", "100%");

		$("#info06").css("display", "block");
		$("#info06").css("width", "100%");

	}
	//	循环取值
	function otherCard(num, del) {
		var myCarsNum = ["10", "50", "200", "800", "1600", "2400"];
		var myCarsIndex = findall(myCarsNum, del);
		//删除备选元素
		myCarsNum.splice(myCarsIndex, 1);
		console.log(myCarsNum);

		myCarsNum.sort(randomsort);
		console.log(myCarsNum);
		var infoId;
		var infoIdOth;
		//http://qiniuapp.hailangkeji.com/dstjAcFlopCardImg1600s.png
		var dataImg = "http://qiniuapp.hailangkeji.com/dstjAcFlopCardImg";
		var dataImgNum;
		//$(infoId).attr("src", dataImg);
		var cardIndex;
		var j = 0;
		for(var i = 0, len = 6; i < len; i++) {
			cardIndex = i + 1;
			console.log(cardIndex);
			infoId = "#info0" + cardIndex;

			if(i == num) {
				dataImgNum = dataImg + del + "s.png";
				$(infoId).attr("src", dataImgNum);
			} else {
				console.log(myCars)
				infoIdOth = myCars[j] + " img";
				console.log(myCarsNum)
				console.log(myCarsNum[i])
				dataImgNum = dataImg + myCarsNum[j] + ".png";
				j++;
				console.log(dataImgNum);
				$(infoIdOth).attr("src", dataImgNum);
			}
		}
	}
	//在数组中查找所有出现的x，并返回一个包含匹配索引的数组
	function findall(a, x) {
		var results = [],
			len = a.length,
			pos = 0;
		while(pos < len) {
			pos = a.indexOf(x, pos);
			if(pos === -1) { //未找到就退出循环完成搜索
				break;
			}
			results.push(pos); //找到就存储索引
			pos += 1; //并从下个位置开始搜索
		}
		return results;
	}
	//数组元素随机排序
	function randomsort(a, b) {
		return Math.random() > .5 ? -1 : 1;
	}
	//	var arr = [1, 2, 3, 4, 5];
	//	arr.sort(randomsort);
	//	console.log(arr);
	function countTime() {

		//获取当前时间  
		var octoberDate = new Date();
		var octoberNow = octoberDate.getTime();
		//设置截止时间  
		//var str = "2019/5/20 11:11:00";
		var str = timeOut;
		var endDate = new Date(str);
		var end = endDate.getTime();
		//时间差  
		var leftTime = end - octoberNow;
		leftTime = Math.abs(leftTime);
		//var leftTime = timeOut;
		//定义变量 d,h,m,s保存倒计时的时间  
		var d, h, m, s;
		if(leftTime >= 0) {
			d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
			h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
			m = Math.floor(leftTime / 1000 / 60 % 60);
			s = Math.floor(leftTime / 1000 % 60);
		}
		//console.log(h+"-"+m+"-"+s)
		if(h == 0 && m == 0 && s == 0) {
			setTimeout(function() {
				location.reload();
			}, 1000);
			return;
		}
		//var datatime = "<p>开始倒计时：<span>" + h + "</span>&nbsp;:&nbsp;<span>" + m + "</span>&nbsp;:&nbsp;<span>" + s + "</span></p>";
		//将倒计时赋值到div中  
		if(h < 10) {
			h = "0" + h;
		}
		if(m < 10) {
			m = "0" + m;
		}
		if(s < 10) {
			s = "0" + s;
		}
		$(".flopH").html(h);
		$(".flopM").html(m);
		$(".flopS").html(s);
		//timeOut = timeOut - 1000;
		//console.log(timeOut)
		//递归每秒调用countTime方法，显示动态时间效果  
		setTimeout(countTime, 1000);
	}
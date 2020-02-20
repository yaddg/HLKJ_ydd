//无缝滚动
    var area=document.getElementById("receiveButImg");
    var ul1=document.getElementById("ul1");
    var ul2=document.getElementById("ul2");
    ul2.innerHTML=ul1.innerHTML;
    function scrollUp(){
    	//console.log("33")
        if(area.scrollTop>ul1.offsetHeight){
            area.scrollTop=0;
        }else{
            area.scrollTop++;
        }
    }
    var speed=20;
    var myScroll=setInterval('scrollUp()',speed);
    area.onmouseover= function () {
    	//console.log("00")
        clearInterval(myScroll);
    };
    area.onmouseout= function () {
    	//console.log("00")
        myScroll=setInterval('scrollUp()',speed);
    };
//  //间歇滚动
//  var area1=document.getElementById("scrollBox1");
//  var ul11=document.getElementById("ul11");
//  var ul22=document.getElementById("ul22");
//  ul22.innerHTML=ul11.innerHTML;
//  var iHeight=30;
//  var speed1=50;
//  var delay=2000;
//  area1.scrollTop=0;
//  var time;
//  function startMove()
//  {
//      area1.scrollTop++;
//      time=setInterval("scrollUp1()",speed1);
//  }
//  function scrollUp1(){
//      area1.scrollTop++;
//      if(area1.scrollTop%iHeight==0){
//          clearInterval(time);
//          setTimeout("startMove()",delay);
//      }else{
//          area1.scrollTop++;
//          if(area1.scrollTop>=area1.scrollHeight/2){
//              area1.scrollTop=0;
//          }
//      }
//  }
//  setTimeout("startMove()",delay);
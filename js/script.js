window.onload = function(){
	var dologin = document.querySelector('#dologin');
	var register = document.querySelector('#register');
	var close = document.querySelector('#close');
	dologin.onclick =function (){
		register.style.display = "block";
		startMove(register,{opacity:100});
	}
	close.onclick = function(){
		register.style.display = "none";
		startMove(register,{opacity:0});
	}
	var banner = document.querySelector('#banner');
	var Li = banner.querySelectorAll('li');
	var btn = document.querySelector('#btn');
	var now = 0,timer = null;
	btn.onclick = function (){/*左*/
			tab(-1);
		}
		function tab(sped){
			now+=sped;
			if( now<0 ){
				now = Li.length-1;
			}
			if( now>=Li.length ){
				now = 0;
			}
			for( var j = 0; j < Li.length; j++ ){
				startMove(Li[j],{opacity:0});
				
			}
			
			startMove(Li[now],{opacity:100});
		}
	//自动轮播
	timer = setInterval(btn.onclick,1000);



// ---------模块8自动轮播----------
	var list6_box = document.querySelector('#list6-box');
	var tempWrap = document.querySelector('#tempWrap');
	var div = tempWrap.getElementsByTagName('li');
	var time = null,time2 = null;
	list6_box.innerHTML += list6_box.innerHTML;
    list6_box.style.width=list6_box.offsetWidth*2+"px";
    var max= -list6_box.offsetWidth/2;
	Move();
	function Move(){
		clearInterval(time);
		clearTimeout(time2);
		time = setInterval(function(){
			if ( list6_box.offsetLeft <= max ){
				list6_box.style.left = 0;
			}else{
			list6_box.style.left = list6_box.offsetLeft - 1 + "px";
			}
		},20)
	}
	tempWrap.onmouseover = function(){
		clearInterval(time);
		clearTimeout(time2);
	}
	tempWrap.onmouseout = function(){
		time = setInterval(Move,10)
	}
// --------------------右侧导航栏--------------
	var link = document.querySelectorAll('.link');//图片
	var part_a = document.querySelectorAll('.part_a');//图片切换模块
	var part = document.querySelectorAll('.part');//模块
	var Float = document.querySelector('#float')
	var li = Float.querySelectorAll('li');//右侧点击
	var back_top = Float.querySelectorAll('.back-top')[0];//返回顶部
	for( var i =0;i<link.length;i++){
		link[i].index = i;
		link[i].onclick = function(ev){
			var Event = ev || window.event;
			console.log(Event.type);
			for( var j = 0;j <part_a.length;j++){
					li[j].className = '';
					Float.style.display = "none";
				}
			li[this.index].className = 'on';
			Float.style.display = "block";
			scrollMove(part_a[this.index].offsetTop);
		}
	}

	window.onscroll = function(){
		var scrollT = document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset;
		if(scrollT>400){
			Float.style.display = "block";
			startMove(Float,{opacity:100})
		}else{
			Float.style.display = "none";
			startMove(Float,{opacity:0})
		}
		for( var i =0;i<part.length;i++){
			var offsetT = part[i].offsetTop;
			if(scrollT>=offsetT){
				for( var j = 0;j <part.length;j++){
					li[j].className = '';
				}
				li[i].className = 'on';
			}	
		 }
	}
	var timer = null;
	back_top.onclick = function(){
		scrollMove(0);
	}
	// 点击导航切换模块
	for( var i =0;i<li.length;i++){
		li[i].index = i;
		li[i].onclick = function(){
			for( var j = 0;j <part.length;j++){
					li[j].className = '';
				}
				this.className = 'on';
				scrollMove(part[this.index].offsetTop)
		}
	}

	// -----------------反馈-----------------
	var ams = document.querySelectorAll('.ams-feedback-floatbtn')[0];//反馈
	var ams_frame = document.querySelectorAll('.ams-feedback-frame')[0];//反馈框
	var ams_cha = document.querySelector('#ams-cha');//关闭按钮
	var ams_active = document.querySelector('#ams_active');
	var ams_li1 = ams_active.querySelectorAll('li');//获取点击
	var ams_act = document.querySelector('#ams_act');
	var ams_li2 = ams_act.querySelectorAll('li');//切换
	ams.onclick = function(){
		ams_cha.style.color = "#000"
		ams_frame.style.display = "block";
	}
	ams_cha.onclick =function(){
		ams_cha.style.color = "red"
		ams_frame.style.display = "none";
	}
	for( var i = 0;i <ams_li1.length;i++){
		ams_li1[i].index = i;
		ams_li1[i].onclick = function (){
			for( var j = 0;j <ams_li1.length;j++){
				ams_li2[j].style.display = 'none';
			}

			ams_li2[this.index].style.display = 'block';
		}
			
	}




	function scrollMove(iTarget){
		var scrollT = parseInt(document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset);
		clearInterval(timer);
		timer = setInterval(function (){
			var local_s = parseInt(document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset);
			var speed = (iTarget-local_s)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			
			scrollT += speed;
			if( scrollT==iTarget ){
				clearInterval(timer);
			}else{
				window.scrollTo(0,scrollT);
			}
			// console.log(scrollT)
		},10)
	}

// --------------------------------------------
	
function startMove(obj,json,fnEnd){   //完美运动框架
    clearInterval(obj.time);
    obj.time = setInterval( function (){
      var speed = 0,style = 0,stop = true; //style当前样式的值stop假设不到终点的值了
      for( attr in json ){
        if( attr=='opacity' ){
          style = Math.round(parseFloat(getStyle(obj,attr))*100);
          speed = ( json[attr] - style )/10;
        }else{
          style = parseInt(getStyle(obj,attr));
          speed = ( json[attr] - style )/10;
        }
        speed = speed>0?Math.ceil(speed):Math.floor(speed);   //取整
        if( style!=json[attr] ){
          stop = false; //如果有 没有到终点的样式 stop设为false
        }
        if( attr=='opacity'){
          obj.style.opacity = (style+speed)/100;
          obj.style.filter = "alpha(opacity="+(style+speed)+")";
        }else{
          obj.style[attr] = style + speed + "px";//obj.style.attr:程序里会把attr当成obj身上style属性里面的一个属性值
        }
      }
      if(stop){
        clearInterval(obj.time);
        if(fnEnd) fnEnd();//运动结束之后调用
      }
    },10)
  }
	function getStyle(obj,cur){
		if( obj.currentStyle ){
			return obj.currentStyle[cur];
		}else{
			return getComputedStyle(obj,false)[cur];
		}
	}
}

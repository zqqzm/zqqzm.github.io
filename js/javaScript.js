// oDiv.onmouseover = function(){
// 			starMove(this,{width:400,height:400,fontSize:30})
// 		}
// 		oDiv.onmouseout = function(){
// 			starMove(this,{width:200,height:200,fontSize:16})
// 		}
		//obj代表对象 json[attr]代表目标 attr代表css样式 speed运动速度 fnEnd结束函数
	function starMove(obj,json,fnEnd){//多物体运动框架
		clearInterval(obj.time);
		obj.time = setInterval(function(){
  			var speed = 0,style = 0;//style当前样式的值
  			for ( attr in json ){
	  			if( attr=='opacity'){
	  				style = Math.round(parseFloat(getStyle(obj,attr))*100);
	  				speed = (json[attr] -style )/10;
	  			}else{
	  				style = parseInt(getStyle(obj,attr))
	  				speed = (json[attr] - style)/10;
	  			}
	  			speed = speed>0?Math.ceil(speed):Math.floor(speed);
	  			if( style==json[attr] ){
	  				clearInterval(obj.time);
	  				if(fnEnd) fnEnd();//运动结束之后调用
	  			}else{
	  				if( attr=='opacity'){
	  					obj.style.opacity = (style+speed)/100;
	  					obj.style.filter = 'alpha(opacity='+(style+speed)+")"
	  				}else{
	  					//obj.style.attr:程序里会把attr当成obj身上style属性里面的一个属性值
	  					obj.style[attr] = parseInt(getStyle(obj,attr)) + speed + "px";
	  				}
	  			}
  			}
		}, 20);
	}
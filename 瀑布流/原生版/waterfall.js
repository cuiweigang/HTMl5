window.onload=function(){
 waterfall("boxs","pin");
};

function screenOrientationEvent(){
	location.reload();
};

window.addEventListener("resize",screenOrientationEvent,false);

window.onscroll=function(){


	if(!checkLoadData())
	{
		return;
	}

	var data=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg"];

	for(var i in data)
	{
		// 动态添加元素到页面
		var div=document.createElement("div");
		div.className="pin";
		var box=document.createElement("div");
		box.className="box";
		div.appendChild(box);
		var img=document.createElement("img");
		img.src="imgs/"+data[i];
		box.appendChild(img);
		document.getElementById("boxs").appendChild(div);
	}

	waterfall("boxs","pin");
};

function waterfall(parent,className)
{
	var parentNode=document.getElementById(parent);
	var childNodes=getChildNode(parentNode,className);

	var lineArr=[];

	// 计算每行的存放个数
	var parentWidth=parentNode.offsetWidth; //外部容器的宽度
	var elementWidth=childNodes[0].offsetWidth;
	var num=Math.floor(parentWidth/elementWidth); //每行个数

	//循环遍历所有的元素
	for(var i=0;i<childNodes.length;i++)
	{
		if(num>i)
		{
			lineArr.push(childNodes[i].offsetHeight);
		}
		else{
			var minHeight=Math.min.apply(null,lineArr);
			var minIndex=getMinIndex(lineArr,minHeight);

			var node=childNodes[i];
			node.style.position="absolute";
			node.style.top=(minHeight+5)+"px";
			node.style.left=(childNodes[minIndex].offsetLeft-5)+"px";
			lineArr[minIndex]+=node.offsetHeight+5;
		}
	}
}

/*
* 获取满足条件的所有元素
*/
function getChildNode(parent,className)
{
	var childNodes= parent.getElementsByClassName(className);
	return childNodes;
}

/*
* 获取最小的高度对应的索引
*/
function getMinIndex(arr,minHeight)
{
	for(var i in arr)
	{
		if(arr[i]==minHeight)
		{
			return i;
		}
	}
}

function checkLoadData()
{
	/*滚动条的高度加上屏幕的高度大于最底层元素的高度时,则加载数据*/
	var parent=document.getElementById("boxs");
	var childNodes=getChildNode(parent,"pin");
	var maxHeight=childNodes[childNodes.length-1].offsetTop;//+(childNodes[childNodes.length-1].offsetHeight/2);
	var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	var screenHeight=document.documentElement.clientHeight;
	return (maxHeight<(scrollTop+screenHeight))?true:false;
}


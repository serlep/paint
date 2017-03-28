var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.lineWidth = 2;
context.lineCap = "round";
var down = false;
var color = "rgb(0,0,0)";
var xPos, yPos;
var origin = null;
var selectedTool = 'pencil';
var test;

if($('#default').is(":checked")){
	canvas.addEventListener('mousemove', draw);
	canvas.addEventListener('mousedown', function()
	{ 
		if(selectedTool === 'pencil')
		{
			down = true;
			draw();
			context.strokeStyle = color;
		}

		if(selectedTool === 'line')
		{
			context.beginPath();
			line();
			context.strokeStyle = color;
		}

		if(selectedTool === 'rect')
		{
			rect();
			context.strokeStyle = color;
		}
		if(selectedTool === 'circle')
		{
			circle();
			context.strokeStyle = color;
		}
		if(selectedTool === 'fillrect')
		{
			fillrect();
			context.fillStyle = color;
		}
		if(selectedTool === 'fillcircle')
		{
			fillcircle();
			context.fillStyle = color;
		}
		if(selectedTool === 'eraser')
		{ 	
			context.beginPath();
			context.moveTo(xPos, yPos);
			eraser();
			context.strokeStyle = "rgb(255,255,255)";
			context.lineCap = 'round';
		}
	});

	canvas.addEventListener('mouseup', function(){
		down = false;
	})

	function change(e){
		color = this.value;
	}

	document.getElementById("color").onchange = change;


	$("#largesize").click(function (){
		context.lineWidth = context.lineWidth + 1;
	});

	$("#smallsize").click(function(){
		context.lineWidth = context.lineWidth - 1;
	});

	$('#line').click(function setToolLine() {
		selectedTool = 'line';
	});

	$('#pencil').click(function pencil(e)
	{
		selectedTool = 'pencil';
	});

	$('#rect').click(function rectangular(event){
		selectedTool = 'rect';
	});

	$('#circle').click(function circle(e){
		selectedTool = 'circle';
	});

	$('#fillrect').click(function fillcircle(e){
		selectedTool = 'fillrect';
	});

	$('#fillcircle').click(function fillcircle(e){
		selectedTool = 'fillcircle';
	});

	$('#eraser').click(function eraser(){
		selectedTool = 'eraser';
	});

	function draw(e)
	{
		context.beginPath();
		context.moveTo(xPos, yPos);
		xPos = event.clientX - canvas.offsetLeft;
		yPos = event.clientY - canvas.offsetTop;

		if(down == true)
		{
			context.lineTo(xPos, yPos);
			context.stroke();

			if($('#symetrie').is(':checked')){
				
				function hr(yPos) {
					return canvas.height - yPos;
				}
				
				context.beginPath();
				context.moveTo(test.x, hr(test.y));	
				context.lineTo(test.x, hr(test.y));
				context.stroke();
				test = {x: xPos, y: yPos};
			
			}
			if($('#symetrie1').is(':checked')){

				function vt(xPos) {
					return canvas.width - xPos;
				}

				test = {x: xPos, y: yPos};
				context.beginPath();
				context.moveTo(vt(test.x), test.y);
				context.lineTo(vt(test.x), test.y);
				context.stroke();
			}
		}
	}
	function line(e)
	{	
		if(!origin)
		{
			origin = {x: xPos, y: yPos};

		}else{
			context.beginPath();
			context.moveTo(origin.x, origin.y);
			context.lineTo(xPos,yPos);
			context.stroke();	

			if($('#symetrie').is(':checked')){
				
				function hr(yPos) {
					return canvas.height - yPos;
				}
				test = {x: xPos, y: yPos};
				context.beginPath();
				context.moveTo(origin.x, hr(origin.y));	
				context.lineTo(xPos,hr(yPos));
				context.stroke();
				origin = null;
			}

			if($('#symetrie1').is(':checked')){
				
				function vt(xPos) {
					return canvas.width - xPos;
				}

				test = {x: xPos, y: yPos};
				context.beginPath();
				context.moveTo(vt(origin.x), origin.y);	
				context.lineTo(vt(xPos),yPos);
				context.stroke();
				origin = null;
			}
		}
	}

	function rect(e)
	{ 	
		if(!origin)
		{
			origin = {x: xPos, y: yPos};
		}else{
			endX = origin.x;
			endY = origin.y;

			width = xPos - endX;
			height = yPos - endY;

			context.beginPath();
			context.rect(origin.x, origin.y, width, height);
			context.stroke();
			
			if($('#symetrie').is(':checked')){
				
				function hr(yPos) {
					return canvas.height - yPos;
				}

				test = {x: xPos, y: yPos};
				context.beginPath();
				context.rect(origin.x, hr(origin.y), width, height);
				context.stroke();
				origin = 0;
				width = 0;
				height = 0;
			}
			if($('#symetrie1').is(':checked')){
				
				function vt(xPos) {
					return canvas.width - xPos;
				}

				test = {x: xPos, y: yPos};
				context.beginPath();
				context.rect(vt(origin.x), origin.y, width, height);
				context.stroke();
				origin = null;
			}
		}
	};

	function fillrect(e)
	{

		if(!origin)
		{
			origin = {x: xPos, y: yPos};
		}else{
			endX = origin.x;
			endY = origin.y;

			width = xPos - endX;
			height = yPos - endY;

			context.beginPath();
			context.rect(origin.x, origin.y, width, height);
			context.fill();
			context.stroke();

			if($('#symetrie').is(':checked')){
				
				function hr(yPos) {
					return canvas.height - yPos;
				}

				test = {x: xPos, y: yPos};
				context.beginPath();
				context.rect(origin.x, hr(origin.y), width, height);
				context.fill();
				origin = 0;
				width = 0;
				height = 0;
			}
			if($('#symetrie1').is(':checked')){
				
				function vt(xPos) {
					return canvas.width - xPos;
				}
				test = {x: xPos, y: yPos};
				context.beginPath();
				context.rect(vt(origin.x), origin.y, width, height);
				context.fill();
				origin = 0;
				width = 0;
				height = 0;
			}
		}

	}
	function circle(e) 
	{
		if(!origin)
		{
			origin = {x: xPos, y: yPos};
		}else{
			radius = Math.sqrt((origin.x - xPos)*(origin.x - xPos) + (origin.y-yPos)*(origin.y-yPos));
			context.beginPath();
			context.arc(origin.x, origin.y, radius,0, 2*Math.PI, false);
			context.stroke();
			

			if($('#symetrie').is(':checked')){
				
				function hr(yPos) {
					return canvas.height - yPos;
				}

				test = {x: xPos, y: yPos};
				radius = Math.sqrt((origin.x - xPos)*(origin.x - xPos) + (origin.y-yPos)*(origin.y-yPos));
				context.beginPath();
				context.arc(origin.x, hr(origin.y), radius,0, 2*Math.PI, false);
				context.stroke();
				radius = null;
				origin = null;
			}
			if($('#symetrie1').is(':checked')){
				
				function vt(xPos) {
					return canvas.width - xPos;
				}
				test = {x: xPos, y: yPos};
				radius = Math.sqrt((origin.x - xPos)*(origin.x - xPos) + (origin.y-yPos)*(origin.y-yPos));
				context.beginPath();
				context.arc(vt(origin.x), origin.y, radius,0, 2*Math.PI, false);
				context.stroke();
				radius = null;
				origin = null;
			}
		}

	}

	function fillcircle(e)
	{
		if(!origin)
		{
			origin = {x: xPos, y: yPos};
		}else{
			radius = Math.sqrt((origin.x - xPos)*(origin.x - xPos) + (origin.y-yPos)*(origin.y-yPos));
			context.beginPath();
			context.arc(origin.x, origin.y, radius,0, 2*Math.PI, false);
			context.fill();

			if($('#symetrie').is(':checked')){
				
				function hr(yPos) {
					return canvas.height - yPos;
				}

				test = {x: xPos, y: yPos};
				radius = Math.sqrt((origin.x - xPos)*(origin.x - xPos) + (origin.y-yPos)*(origin.y-yPos));
				context.beginPath();
				context.arc(origin.x, hr(origin.y), radius,0, 2*Math.PI, false);
				context.fill();
				radius = null;
				origin = null;
			}
			if($('#symetrie1').is(':checked')){
				
				function vt(xPos) {
					return canvas.width - xPos;
				}
				test = {x: xPos, y: yPos};
				radius = Math.sqrt((origin.x - xPos)*(origin.x - xPos) + (origin.y-yPos)*(origin.y-yPos));
				context.beginPath();
				context.arc(vt(origin.x), origin.y, radius,0, 2*Math.PI, false);
				context.fill();
				radius = null;
				origin = null;
			}
		}
	}

	function eraser(e)
	{	
		xPos = event.clientX - canvas.offsetLeft;
		yPos = event.clientY - canvas.offsetTop;
		down = true;
		if(down == true)
		{
			
			context.lineTo(xPos, yPos);
			context.globalCompositeOperation = "destination-out";
			context.stroke();
		}
	}

};

$('#openfile').click(function (){
	$('#file').click().on('change', function(e){
		var temp = URL.createObjectURL(e.target.files[0]);
		var image = new Image();
		image.src = temp;
		image.addEventListener('load', function()
		{
			context.drawImage(image, 0,0);
		});
	});
});

var button = document.getElementById('saveimg');
button.addEventListener('click', function (e) {
	var dataURL = canvas.toDataURL('image/png');
	button.href = dataURL;
});



$('#clearcanvas').click(function clearCanvas()
{
	context.clearRect(0,0, canvas.width, canvas.height);
});


import './realtime.html';
var currentX=0;
var currentY=0;
window.addEventListener("load", doFirst, false);


/* -------- funtions ----------- */
function doFirst(){
	drawRealtimeMap();
	drawRealtimeRobot();
}

/* realtime canvas functions */
function drawRealtimeMap(){
	var canvasRealtime = document.getElementById('realtimeMapCanvas');
	canvasRealtimeContext = canvasRealtime.getContext('2d');
	var mymap = new Image();
	mymap.src = "/images/floorlayout.jpg";
	mymap.addEventListener("load", function(){canvasRealtimeContext.drawImage(mymap,0,0)}, false);
	var canvasRealtimeRobot = document.getElementById('realtimeRobotCanvas');
	canvasRealtimeRobotContext = canvasRealtimeRobot.getContext('2d');
}

function drawRealtimeRobot(){
	robotImage.src = "/images/tinyRobot.png";
  	robotImage.addEventListener("load", function(){canvasRealtimeRobotContext.drawImage(robotImage,currentX -robotImage.width/2,currentY-robotImage.height/2)}, false);
}

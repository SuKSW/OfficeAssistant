var currentX=100;
var currentY=100;

Template.realtimePage.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      console.log('Template onLoad');
	  doFirst();
    }
}


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
	var robotImage = new Image();
	robotImage.src = "/images/tinyRobot.png";
  	robotImage.addEventListener("load", function(){canvasRealtimeRobotContext.drawImage(robotImage,currentX -robotImage.width/2,currentY-robotImage.height/2)}, false);
}
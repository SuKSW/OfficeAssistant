import { Template } from 'meteor/templating';

var currentX=100;
var currentY=100;

Template.pathPage.rendered = function() {
    if(!this._rendered) {
      	this._rendered = true;
      	console.log('Template onLoad');
	  	drawPathMap();
		makeRobotCanvasReady();
		drawPathRobot();	  
    }
}

Template.pathRobotCanvasTemplate.rendered = function() {
    if(!this._rendered) {
      	this._rendered = true;
	  	allTheDrawing(); 
    }
}


/* -------- funtions ----------- */

/* realtime canvas functions */
function drawPathMap(){
	var canvasPathMap = document.getElementById('pathMapCanvas');
	canvasPathMapContext = canvasPathMap.getContext('2d');
	var mymap = new Image();
	mymap.src = "/images/floorlayout.jpg";
	mymap.addEventListener("load", function(){canvasPathMapContext.drawImage(mymap,0,0)}, false);
	
}

function makeRobotCanvasReady(){
	canvasPathRobot = document.getElementById('pathRobotCanvas');
	canvasPathRobotContext = canvasPathRobot.getContext('2d');
	canvasPathRobot.addEventListener("mousedown", startThePath,false);
	canvasPathRobot.addEventListener("mouseup", finishThePath,false);
}

function drawPathRobot(){
	var robotImage = new Image();
	robotImage.src = "/images/tinyRobot.png";
  	robotImage.addEventListener("load", function(){canvasPathRobotContext.drawImage(robotImage,currentX -robotImage.width/2,currentY-robotImage.height/2)}, false);
}

var paper = require('./paper-full.js');

var textItem;
var textItem2;


function allTheDrawing(){
	canvasPathInfo = document.getElementById('pathInfoCanvas');
	canvasPathRobot = document.getElementById('pathRobotCanvas');
	paper.setup(canvasPathInfo);
	
	textItem = new paper.PointText({
    	content: 'Click and drag to draw a line.',
    	point: new paper.Point(20, 30),
    	fillColor: 'black',
	});

	textItem2 = new paper.PointText({
	    content: 'locations',
	    point: new paper.Point(20, 70),
	    fillColor: 'black',
	});	
}
var path;
function startThePath(event){
	canvasPathRobot = document.getElementById('pathRobotCanvas');
	paper.setup(canvasPathRobot);
	if (path) {
		    path.selected = false;
	}
	canvasPathRobot.addEventListener("mousemove", drawPath,false);
	// Create a new path and set its stroke color to black:
	path = new paper.Path({
	    segments: [getMousePos(canvasPathRobot, event)],
	    strokeColor: 'blue',
	    strokeWidth: 10,
	    strokeCap: 'round',
	    // Select the path, so we can see its segment points:
	    fullySelected: true
	});
}


function drawPath(event){
	path.add(getMousePos(canvasPathRobot, event));
    // Update the content of the text item to show how many
    // segments it has:
    textItem.content = 'Segment count: ' + path.segments.length;
}

function finishThePath(){
	canvasPathRobot = document.getElementById('pathRobotCanvas');
	canvasPathRobot.removeEventListener("mousemove",drawPath);
		var segmentCount = path.segments.length;
		
	    // When the mouse is released, simplify it:
	    path.simplify(10);

	    // Select the path, so we can see its segments:
	    path.fullySelected = true;

	    var newSegmentCount = path.segments.length;
      	console.log(newSegmentCount);
	    var difference = segmentCount - newSegmentCount;
	    var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	    textItem.content = difference + ' of the ' + segmentCount + ' segments were removed.\nSaving ' + percentage + '% of space';
		
		for (var i = 0; i < newSegmentCount; i++) {
			var x = path.segments[i].point.x;
			var y = path.segments[i].point.y;
			textItem2.content = 'Last segment point\nx: ' + x +'\ny: '+y;
		}
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
import { Path1 } from '/api/collections.js';
import { Robots } from '/api/collections.js';
import { Template } from 'meteor/templating';

var currentX =100;
var currentY =100;

Template.pathPage.rendered = function() {
    if(!this._rendered) {
      	this._rendered = true;
      	console.log('Template onLoad');
	  	drawPathMap();
		makeRobotCanvasReady();
		//drawPathRobot();	  
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
  	canvasPathRobotContext.clearRect(0, 0, canvasPathRobot.width, canvasPathRobot.height);
  	robotImage.addEventListener("load", function(){canvasPathRobotContext.drawImage(robotImage,currentX -robotImage.width/2,currentY-robotImage.height/2)}, false);
}

var paper = require('./paper-full.js');

var textItem;
var textItem1;
var textItem2;


function allTheDrawing(){
	canvasPathInfo = document.getElementById('pathInfoCanvas');
	canvasPathRobot = document.getElementById('pathRobotCanvas');
	paper.setup(canvasPathInfo);
	
	textItem = new paper.PointText({
    	content: 'Select a robot and click and drag to draw a line.',
    	point: new paper.Point(20, 50),
    	fillColor: 'black',
    	fontFamily: 'Arial',
	});

	textItem1 = new paper.PointText({
    	content: 'Selected robot : none' ,
    	point: new paper.Point(20, 30),
    	fillColor: 'Blue',
	});

	textItem2 = new paper.PointText({
	    content: 'locations',
	    point: new paper.Point(20, 80),
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
	    segments: [new paper.Point(currentX, currentY)],
	    strokeColor: 'blue',
	    strokeWidth: 10,
	    strokeCap: 'round',
	    // Select the path, so we can see its segment points:
	    fullySelected: true
	});
	textItem2.content ='';
	//path.add(new paper.Point(currentX, currentY));
}


function drawPath(event){
	path.add(getMousePos(canvasPathRobot, event));
    // Update the content of the text item to show how many
    // segments it has:
    textItem.content = 'Segment count: ' + path.segments.length;
}
var newSegmentCount;
function finishThePath(){
	canvasPathRobot = document.getElementById('pathRobotCanvas');
	canvasPathRobot.removeEventListener("mousemove",drawPath);
		var segmentCount = path.segments.length;
		
	    // When the mouse is released, simplify it:
	    path.simplify(3);

	    // Select the path, so we can see its segments:
	    path.fullySelected = true;

	    newSegmentCount = path.segments.length;
      	console.log(newSegmentCount);
	    var difference = segmentCount - newSegmentCount;
	    var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	    textItem.content = difference + ' of the ' + segmentCount + ' segments were removed.\nSaving ' + percentage + '% of space';
		textItem2.content ='';
		for (var i = 0; i < newSegmentCount; i++) {
		var x = path.segments[i].point.x;
		var y = path.segments[i].point.y;
		textItem2.content =textItem2.content + '\nx: ' + x +'  y: '+y;		
	}
		
}

addPathToDBButton = function(){
	var vector;
	var DBpoint;
	var preDBpoint;
	var angle = 0;
	var distance = 0;
	var x;
	var y
	for (var i = 0; i < newSegmentCount; i++) {
		DBpoint = path.segments[i].point;
		x = DBpoint.x;
		y = DBpoint.y;
		if (i>0){
			preDBpoint = path.segments[i-1].point;
			vector = new paper.Point(DBpoint.x-preDBpoint.x, DBpoint.y-preDBpoint.y);
			
			angle = vector.angle;
			distance = vector.length;
		}
		Path1.insert({
			i,
	      	x,
	      	y,
	      	angle,
	      	distance
	    });

	}
}

pathToRobotButton = function(){
	HTTP.call('get', 'http://192.168.43.101', {
	  data: { some: 'json', stuff: 1 }
	}, (error, result) => {
	  if (!error) {
	    Session.set('twizzled', true);
	  }
	});
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - rect.left),
    y: Math.round(evt.clientY - rect.top)
  };

}
//-------------------- coordinates list -------------------------------
delPathFromDBButton = function(){
	Meteor.call('removePath1');
}

Template.pathPage.helpers({
  getcordinates(){
  	return Path1.find({});
  },
});



selectRobot=function(event){
	var robot_nameTarget =document.getElementById("selectRobot");
    var robot_name = robot_nameTarget.value;
    robot_nameTarget.value = '';
    alert("Selecting robot "+ robot_name);
    //Console.log();
    

	var selRobot = Robots.find({"robot_name":robot_name}, {limit: 1});
	var selRobotF = selRobot.fetch();
	//console.log(selRobotF[0].init_X);
	//console.log(selRobotF[0].init_Y);
	
	
	if(selRobot.count()>0){
		
		
		textItem1.content= 'Selected Robot: '+robot_name ;
		currentX = selRobotF[0].init_X;
		currentY = selRobotF[0].init_Y;
	}
	drawPathRobot();
}
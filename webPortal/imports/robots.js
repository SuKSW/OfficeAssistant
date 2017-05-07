import { Template } from 'meteor/templating';
import { Robots } from '/api/collections.js';

var currentX=0;
var currentY=0;
 

Template.robot.events({

  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Robots.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },

  'click .delete'() {
    Robots.remove(this._id);
  },
});

Template.robotsPage.helpers({
  robots(){
  	return Robots.find({}, { sort: { createdAt: -1 } });
  },
});

Template.robotsPage.events({
  'submit #new-robot'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const robot_name = target.rname.value;
    const robot_number = target.rnum.value;
    const robot_ipaddress = target.ipAddress.value;

    // Insert a task into the collection
    Robots.insert({
      robot_name,
      robot_number,
      robot_ipaddress,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.rname.value = '';
    target.rnum.value = '';
    target.ipAddress.value = '';
  },

});

changeLocationOfRobotButton = function (){
  document.getElementById('position_window_background').style.display='block';
  drawLocateMap();
  canvasLocateRobot = document.getElementById('locateRobotCanvas');
  canvasLocateRobotContext = canvasLocateRobot.getContext('2d');
  canvasLocateRobot.addEventListener("mousemove", locateRobot,false);
  canvasLocateRobot.addEventListener('mousemove', positionDisplay, false);
  canvasLocateRobot.addEventListener("click", positionRobot,false);
  document.getElementById('locateRefreshButton').addEventListener("click",locateRefreshButton,false);
}

function drawLocateMap(){
  canvasLocateMapContext = document.getElementById('locateMapCanvas').getContext('2d');
  var floorlayoutimage = new Image();
  floorlayoutimage.src = "/images/floorlayout.jpg";
  floorlayoutimage.addEventListener("load", function(){canvasLocateMapContext.drawImage(floorlayoutimage,0,0)}, false);
}

function locateRobot(evt){
  var mousePos= getMousePos(canvasLocateRobot, evt);
  /*canvasLocateRobot.clearRect(0,0,500,500);*/
  robotImage = new Image();
  robotImage.src = "/images/tinyRobot.png";
  robotImage.addEventListener("load", function(){canvasLocateRobotContext.drawImage(robotImage,mousePos.x -robotImage.width/2,mousePos.y-robotImage.height/2)}, false);
  /*canvasLocateRobotContext.drawImage(robotImage,mousePos.x,mousePos.y);
*/
}
function positionRobot(evt){
  var mousePos= getMousePos(canvasLocateRobot,evt);
  canvasLocateRobot.removeEventListener("mousemove",locateRobot);
  canvasLocateRobot.removeEventListener("mousemove",positionDisplay);
  robotImage.src = "/images/tinyRobot.png";
  robotImage.addEventListener("load", function(){canvasLocateRobotContext.drawImage(robotImage,mousePos.x -robotImage.width/2,mousePos.y-robotImage.height/2)}, false);
  currentX=mousePos.x;
  currentY=mousePos.y;
  
}
function locateRefreshButton(){
  canvasLocateRobot.addEventListener("mousemove", locateRobot,false);
  canvasLocateRobot.addEventListener('mousemove', positionDisplay, false);
}
function locateFinishButton(){
  Robots.update(this._id, {
      $set: { initX: currentX },
      $set: { initY: currentY },
    });
  document.getElementById('position_window_background').style.display='none';
}

function positionDisplay(evt){
  var mousePos = getMousePos(canvasLocateRobot, evt);
  var message = 'Robot position: X=' + Math.round(mousePos.x) + ' Y=' + Math.round(mousePos.y);
  writeMessage(canvasLocateRobot, message);
}

function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


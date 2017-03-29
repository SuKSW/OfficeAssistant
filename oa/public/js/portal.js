window.addEventListener("load", doFirst, false);
var currentX=0;
var currentY=0;


/* -------- funtions ----------- */
function doFirst(){
    drawRealtimeMap();

}

/* realtime canvas functions */
function drawRealtimeMap(){
    var canvasRealtime = document.getElementById('realtimeMapCanvas');
    canvasRealtimeContext = canvasRealtime.getContext('2d');
    var mymap = new Image();
    mymap.src = 'img/floorlayout.jpg';
    mymap.addEventListener("load", function(){canvasRealtimeContext.drawImage(mymap,0,0)}, false);
    var canvasRealtimeRobot = document.getElementById('realtimeRobotCanvas');
    canvasRealtimeRobotContext = canvasRealtimeRobot.getContext('2d');
}


function changeLocationOfRobotButton(){
    document.getElementById('locateWindow').style.display='block';
    drawLocateMap();
    canvasLocateRobot = document.getElementById('locateRobotCanvas');
    canvasLocateRobotContext = canvasLocateRobot.getContext('2d');
    canvasLocateRobot.addEventListener("mousemove", locateRobot,false);
    canvasLocateRobot.addEventListener('mousemove', positionDisplay, false);
    canvasLocateRobot.addEventListener("click", positionRobot,false);
    document.getElementById('locateRefreshButton').addEventListener("click",locateRefreshButton,false);
}

function navAddUserButton(){
    document.getElementById('addUserWindow').style.display='block';
}

function drawLocateMap(){
    canvasLocateMapContext = document.getElementById('locateMapCanvas').getContext('2d');
    var floorlayoutimage = new Image();
    floorlayoutimage.src = 'img/floorlayout.jpg';
    floorlayoutimage.addEventListener("load", function(){canvasLocateMapContext.drawImage(floorlayoutimage,0,0)}, false);
}

function locateRobot(evt){
    var mousePos= getMousePos(canvasLocateRobot, evt);
    /*canvasLocateRobot.clearRect(0,0,500,500);*/
    robotImage = new Image();
    robotImage.src = 'img/tinyRobot.png';
    robotImage.addEventListener("load", function(){canvasLocateRobotContext.drawImage(robotImage,mousePos.x -robotImage.width/2,mousePos.y-robotImage.height/2)}, false);
    /*canvasLocateRobotContext.drawImage(robotImage,mousePos.x,mousePos.y);
     */
}
function positionRobot(evt){
    var mousePos= getMousePos(canvasLocateRobot,evt);
    canvasLocateRobot.removeEventListener("mousemove",locateRobot);
    canvasLocateRobot.removeEventListener("mousemove",positionDisplay);
    robotImage.src = 'img/tinyRobot.png';
    robotImage.addEventListener("load", function(){canvasLocateRobotContext.drawImage(robotImage,mousePos.x -robotImage.width/2,mousePos.y-robotImage.height/2)}, false);
    currentX=Math.round(mousePos.x);
    currentY=Math.round(mousePos.y);
    document.getElementById("x").value = currentX;
    document.getElementById("y").value = currentY;
}
function locateRefreshButton(){
    canvasLocateRobot.addEventListener("mousemove", locateRobot,false);
    canvasLocateRobot.addEventListener('mousemove', positionDisplay, false);
}
function locateFinishButton(){
    robotImage.src = 'img/tinyRobot.png';
    robotImage.addEventListener("load", function(){canvasRealtimeRobotContext.drawImage(robotImage,currentX -robotImage.width/2,currentY-robotImage.height/2)}, false);
    document.getElementById('locateWindow').style.display='none';
    /*window.location.href = "positionRobot?x=" + currentX +"&y=" +currentY;
    
    http://www.somedomainname.com/positionRobot?x=mousePos.x&y=mousePos.y
    */
    // 'input[name="var"]'.val(var);
    var xhttp = new XMLHttpRequest();
    var url = "localhost:8000/portal/positionRobot";
    xhttp.open("POST", url, true);
    var params = "x=" + currentX +"&y=" +currentY;
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhttp.setRequestHeader("Content-length", params.length);
    //xhttp.setRequestHeader('X-CSRF-TOKEN','{{csrf_token()}}');
    //xhttp.setRequestHeader("Connection", "close");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         //alert('On ready state change');
        }
    };
    xhttp.send(params);
    
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
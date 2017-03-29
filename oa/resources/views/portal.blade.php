
@extends('layouts.master')

@section('csslink')
    <link rel="stylesheet" href="{!! asset('css/portal.css') !!}">
@endsection
@section('body')
    <h1>Office Assistant Realtime Location</h1>
    <div class="addRobotForm">
        <button type="button" onclick="changeLocationOfRobotButton()()">Change Location of Robot</button>
        <button type="button" onclick="">Change map layout</button></br></br>
        <form id="addRobotForm"  action="/action_page.php">
            <h4>Add New Robot</h4>
            <div class="row">
                <label for="rnum">Robot number</label>
                <input type="text" id="rnum" name="rnum" placeholder="Registered number"></div></br>


            <div class="row">
                <label for="rname">Robot Name</label>
                <input type="text" id="rname" name="rname"></div></br>


            <div class="row">
                <label for="ipAddress">IP Address</label>
                <input type="text" id="ipAddress" name="ipAddress" placeholder="eg: 125.0.0.234"></div></br>


            <input type="submit" value="Submit">
        </form>
    </div>

    <div class="addUserForm">
        <form id="addUserForm"  action="{{ route('reg_user') }}" method="POST">
            <h4>Add New User</h4>
            <div class="row">
                <label for="idnum">ID number</label>
                <input type="text" id="idnum" name="idnumber" placeholder="National ID number"></div></br>


            <div class="row">
                <label for="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="User's first name"></div></br>


            <div class="row">
                <label for="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="User's last name"></div></br>


            <div class="row">
                <label for="robotName">Give access to robot</label>
                <input type="text" id="robotName" name="robotName" placeholder="Robot's name"></div></br>


            <div class="row">
                <label for="department">Department</label>
                <select id="department" name="department">
                    <option value="HR">HR</option>
                    <option value="RnD">RnD</option>
                    <option value="Development">Development</option>
                </select></div></br>

            <div class="row">
                <label for="fpassword">First password</label>
                <input type="password" id="fpassword" name="fpassword" placeholder="User's first password"></div></br></br>
                <input type="hidden" name="_token" value="{{ Session::token() }}">

            <input type="submit" value="Submit">
        </form>
    </div>

    <div class="mainSection">
        <label>
        path id: {{ $path->path_id }}
        initial x_coordinate: {{ $path->x_coordinate }}
        initial y_coordinate: {{ $path->y_coordinate }}
        initial positioned at: {{ $path->created_at }}</label>
        <input type="hidden" name="res_x" value="{{ $path->x_coordinate }}">>
        <input type="hidden" name="res_x" value="{{ $path->y_coordinate }}">>
        <canvas id="realtimeMapCanvas" width="500" height="500"></canvas>
        <canvas id="realtimeRobotCanvas" width="500" height="500"></canvas>
    </div>

    <div id="locateWindow" class="mini_window_background">
        <div class="mini_window">
            <span onclick="document.getElementById('locateWindow').style.display='none'" class="close" title="Close Modal">&times;</span>
            
            <div class="mini_window_canvas_section">
                <canvas id="locateMapCanvas" width="500" height="500">
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
                <canvas id="locateRobotCanvas" width="500" height="500">
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </div>
            
            <div class="mini_window_button_section">
                <h4>Locate the Robot</h4>
                <ul>
                    <li>Take the cursor to the map to place the robot.</li>
                    <li> Click finish to submit the location of the robot to the system.</li>
                    <li>Click refresh to recorrect the position the of the robot.</li></br></br></br>
                </ul>
                <form action="{{ route('position_robot') }}" method="POST">
                    <input id="x" type="hidden" name="x" value=""/>
                    <input id="y" type="hidden" name="y" value=""/>
                    <input type="hidden" name="_token" value="{{ Session::token() }}">
                    <button type="submit" onclick="locateFinishButton()">Finish</button>
                </form>
                <button type="button" id="locateRefreshButton" class="orangeBtn">Refresh</button>
                <button type="button" onclick="document.getElementById('locateWindow').style.display='none'" class="redBtn">Cancel</button>
            </div>
        </div>
    </div>


    <script type="text/javascript" src="{!! asset('js/portal.js') !!}"></script>
@endsection
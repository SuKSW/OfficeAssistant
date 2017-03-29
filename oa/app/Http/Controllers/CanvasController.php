<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Path;

class CanvasController extends Controller
{  
    public function postPositionRobot(Request $request){
        $path = new Path();
        $x = $request->x;
        $y = $request->y;
        $path->path_id = 1;
        $path->x_coordinate = $x;
        $path->y_coordinate = $y;
        $path->save();
        return view('portal')->with('path',$path);
    }
     /*
    }
    public function positionRobot(Request $request) {
    	echo "<script language='text/javascript'>function sayHiFromPHP() { alert('Just wanted to say x and y'); }</script>";
    	/*if (isset($_POST["x"]) && isset($_POST["y"])) {
    		$x = $_POST["x"];
    		$y = $_POST["y"];
    	}
    	//$input = Request::all();
    	$path = new Path();
    	$path->path_id = 1;
    	$path->x_coordinate = $request->x;
    	$path->y_coordinate = $request->y;
    	$path->save();
    	echo "<script language='text/javascript'>function sayHiFromPHP() { alert('Just wanted to say x=$x and y=$y!'); }</script>";
        return redirect()->back();
    }*/


}

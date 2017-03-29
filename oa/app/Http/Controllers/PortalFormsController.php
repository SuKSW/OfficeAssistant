<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

class PortalFormsController extends Controller
{
    public function postAddNewUser(Request $request) {
    	$user = new User();

    	$user->nat_id = $request->idnumber;
    	$user->first_name = $request->firstname;
    	$user->last_name = $request->lastname;
    	$user->robot_name = $request->robotName;
    	$user->department = $request->department;
    	$user->first_password = bcrypt($request->fpassword);

    	$user->save();
    	return redirect()->back();
    	//here idnumber,firstname,lastname,robotName,department,fpassword are values given as name in the form
    	//nat_id, first_name, last_name database column names
    }
}

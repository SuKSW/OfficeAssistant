<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('portal',[
	'uses' => 'LoginController@getPortal',
	'as' => 'portal' 
]);

Route::post('/login',[
	'uses' => 'LoginController@postLogin',
	'as' => 'login' 
]);

Route::post('/reg_user',[
	'uses' => 'PortalFormsController@postAddNewUser',
	'as' => 'reg_user' 
]);

Route::post('/position_robot',[
	'uses' => 'CanvasController@postPositionRobot',
	'as' => 'position_robot' 
]);

Route::post('/portal/positionRobot','CanvasController@positionRobot');

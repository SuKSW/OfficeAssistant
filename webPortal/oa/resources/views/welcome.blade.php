@extends('layouts.master')

@section('csslink')
    <link rel="stylesheet" href="{!! asset('css/welcome.css') !!}">
@endsection 
@section('body')

    <div class="center">
        <h1>Office Assistant</h1>
        <button type="button" onclick="document.getElementById('id01').style.display='block'" class="bigbtn">Click to log in as administrator</button>
    </div>

    <div id="id01" class="modal">

        <form action="{{ route('login') }}" method="POST" class="modal-content animate" >

            <div class="imgcontainer">
                <span onclick="document.getEementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
            </div>

            <div class="container">
                <label><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" required>

                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required>

                <button type="submit">Login</button>
                <input type="checkbox" > Remember me
            </div>
            <input type="hidden" name="_token" value="{{ Session::token() }}">
            <div class="container" style="background-color:#f1f1f1">
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
        </form>
    </div>
    <script type="text/javascript" src="{!! asset('js/welcome.js') !!}"></script>
@endsection

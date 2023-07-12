<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserAuthenticationController extends Controller
{
    //
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'username' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string',
            'age' => 'required|integer',
            'phonenumber' => 'required|string',
        ]);

        if($validator->fails()){
            return response(['error'=> $validator->errors()->all()],422);
        }

        $password_hash = Hash::make($request->password);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' =>$password_hash,
            'age' => $request->age,
            'phonenumber' => $request->phonenumber
        ]);

        $token = $user->createToken('LaravelTokenPassword')->accessToken;

        $response = ['token' => $token, 'message' => 'User Successfully created!'];

        return $response;

    }
}
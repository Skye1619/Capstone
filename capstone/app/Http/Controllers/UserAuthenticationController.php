<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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
            'email_verified_at' => now(),
            'password' =>$password_hash,
            'age' => $request->age,
            'phonenumber' => $request->phonenumber,
            'remember_token' => Str::random(10),
        ]);

        $token = $user->createToken('LaravelTokenPassword')->accessToken;

        $userDataResponse = [
            'username' => $request->username,
            'email' => $request->email,
            'age' => $request->age,
            'phonenumber' => $request->phonenumber,
        ];
        $response = ['token' => $token, 'message' => 'User Successfully created!', 'user' => $userDataResponse];

        return $response;

    }
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        if ($validator->fails()){
            return response(['error'=> $validator->errors()->all()[0]],422);
        }
        //check user in user table
        $user = User::where('email', $request->email)->first();

            //if exist
            if($user){
                //check hash password
                $check_password = Hash::check($request->password, $user->password);

                //if same
                if($check_password){
                    $token = $user->createToken('LaravelTokenPassword')->accessToken;
                    $response = ['token' => $token, 'message' => 'Successfully Logged in!', 'user' => $user];
                    return $response;
                }else {
                    return response(['error'=> 'Password is invalid'], 422);
                }
        }else {
            return response(['error' => 'User not Found!'], 422);
        }
    }
}

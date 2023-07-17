<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = User::all();
        $response = ['code' => 200, 'message' => 'Successfully retrieved users', UserResource::collection($user)];

        return $response;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'username' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'age' => 'required|integer',
            'phonenumber' => 'required|string',
        ]);

        $user = User::create($request->all());
        $response = ['code' => 200, 'message' => 'Account Successfu'];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

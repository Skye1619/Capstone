<?php

namespace App\Http\Controllers;

use App\Http\Resources\HotelResources;
use Illuminate\Http\Request;
use App\Models\Hotel;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $hotel = Hotel::all();
        $response = [
            'code' => 200,
            'message' => 'Successfully Retrieval of Hotels!',
            'hotels' => HotelResources::collection($hotel)
        ];
        return $response;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $input = $request->all();
        $hotel = HotelResources::create($input);
        $response = [
            'code' => 200,
            'message' => 'Services Successfully Created!',
            'hotels' => HotelResources::collection($hotel)
        ];

            return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $hotel = HotelResources::findOrFail($id);
        $response = [
            'code' => 200,
            'message' => 'Services Successfully Created!',
            'hotels' => HotelResources::collection($hotel)
        ];

            return $response;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $input = $request->all();
        $hotel = HotelResources::findOrFail($id);
        $hotel -> update($input);
        $response = [
            'code' => 200,
            'message' => 'Services Successfully Updated!',
            'hotels' => HotelResources::collection($hotel)
        ];

            return $response;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $hotel = HotelResources::findOrFail($id);
        $hotel -> delete();
        $response = [
            'code' => 200,
            'message' => 'Services Successfully Updated!',
            'hotels' => HotelResources::collection($hotel)
        ];

            return $response;
    }
}

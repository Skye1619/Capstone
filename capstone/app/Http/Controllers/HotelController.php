<?php

namespace App\Http\Controllers;

use App\Http\Resources\HotelResources;
use App\Models\Price;
use Illuminate\Support\Facades\Auth;
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
        $hotel = Hotel::paginate(20);
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

        $request->validate([
            'hotel_name' => 'required|string',
            'hotel_details' => 'required|string',
            'hotel_address' => 'required|string',
            'rating' => 'required|numeric',
            'image_url' => 'nullable|string',
            'price_id' => 'required|array',
            'price_id.short' => 'required|numeric',
            'price_id.long' => 'required|numeric',
            'price_id.overnight' => 'required|numeric',
            'price_id.whole_day' => 'required|numeric',
        ]);
    
        // Extract price data from the request
        $priceData = $request->input('price_id');
    
        // Create a new price record
        $price = Price::create([
            'short' => $priceData['short'],
            'long' => $priceData['long'],
            'overnight' => $priceData['overnight'],
            'whole_day' => $priceData['whole_day'],
        ]);

        $ownerId = Auth::id();
    
        // Create the new hotel record with the associated price_id
        $hotel = Hotel::create([
            'hotel_name' => $request->input('hotel_name'),
            'hotel_details' => $request->input('hotel_details'),
            'hotel_address' => $request->input('hotel_address'),
            'rating' => $request->input('rating'),
            'owner_id' => $ownerId,
            'image_url' => $request->input('image_url'),
            'price_id' => $price->id, // Use the created price's ID as the value for price_id
        ]);
    
        return new HotelResources($hotel);



        /* $input = $request->all();
        $hotel = Hotel::create($input);
        $response = [
            'code' => 200,
            'message' => 'Hotel Successfully Created!',
            'hotels' => HotelResources::collection($hotel)
        ];

            return $response; */
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $hotel = Hotel::findOrFail($id);
        $response = [
            'code' => 200,
            'message' => 'Hotel Successfully Retrieve!',
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
        $hotel = Hotel::findOrFail($id);
        $hotel->update($input);
        $response = [
            'code' => 200,
            'message' => 'Hotel Successfully Updated!',
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
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();
        $response = [
            'code' => 200,
            'message' => 'Hotel Successfully Deleted!',
            'hotels' => HotelResources::collection($hotel)
        ];

        return $response;
    }
}
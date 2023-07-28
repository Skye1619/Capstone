<?php

namespace App\Http\Controllers;

use App\Http\Resources\HistoryResource;
use App\Models\History;
use Illuminate\Http\Request;

class historyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'hotel_id' => 'required|integer',
            'user_id' => 'required|integer',
            'price_id' => 'required|integer',
            'booking_category' => 'required|string',
        ]);

        $hotelData = $request->input('hotel_id');
        $userData = $request->input('user_id');
        $priceData = $request->input('price_id');

        $history = History::create([
            'hotel_id' => $request->input('hotel_id'),
            'user_id' => $request->input('user_id'),
            'price_id' => $request->input('price_id'),
            'booking_category' => $request->input('booking_category'),
        ]);

        return new HistoryResource($history);

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

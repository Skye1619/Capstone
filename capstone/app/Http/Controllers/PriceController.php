<?php

namespace App\Http\Controllers;

use App\Http\Resources\PriceResource;
use Illuminate\Http\Request;
use App\Models\Price;

class PriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $price = Price::all();
        $response = [
            'code' => 200,
            'message' => 'Successfully Retrieval of Price!',
            'price' => PriceResource::collection($price)
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
        $price = Price::create($input);
        $response = [
            'code' => 200,
            'message' => 'Price set successfully',
            'price' => PriceResource::collection($price)
        ];

        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $price = PriceResource::findOrFail($id);
        $response = [
            'code' => 200,
            'message' => 'Price successfully retrieved',
            'price' => PriceResource::collection($price)
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
        $price = PriceResource::findOrFail($id);
        $price -> update($input);
        $response = [
            'code' => 200,
            'message' => 'Price successfully updated',
            'price' => PriceResource::collection($price)
        ];

        return $response;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $price = PriceResource::findOrFail($id);
        $price -> delete($id);
        $response = [
            'code' => 200,
            'message' => 'Price successfully deleted',
            'price' => PriceResource::collection($price)
        ];

        return $response;
    }
}

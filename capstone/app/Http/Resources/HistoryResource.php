<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class historyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'id' => $this->id,
          'hotel_id' => new HotelResources($this->hotel),
          'user_id' => new UserResource($this->user),
          'price_id' => new PriceResource($this->price),
          'booking_category' => $this->booking_category,
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Hotel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hotel>
 */
class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Hotel::class;
    public function definition(): array
    {
        return [
            //
            'hotel_name' => $this->faker->company()." Hotel",
            'hotel_details' => $this->faker->text(10),
            'hotel_address' => $this->faker->address(),
            'price_id' => $this->faker->numberBetween(1, 50),
            'rating' => $this->faker->numberBetween(3, 5),
            'image_url' => $this->faker->imageUrl($width = 400, $height = 600, 'hotel', true),
            'owner_id' => $this->faker->numberBetween(10, 3000),
        ];
    }
}

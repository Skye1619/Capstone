<?php

namespace Database\Factories;

use App\Models\Price;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Price>
 */
class PriceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Price::class;
    public function definition(): array
    {
        return [
            //
            'short' => $this->faker->numberBetween(300, 500),
            'long' => $this->faker->numberBetween(450, 800),
            'overnight' => $this->faker->numberBetween(1200, 1800),
            'whole_day' => $this->faker->numberBetween(2100, 3500)
        ];
    }
}

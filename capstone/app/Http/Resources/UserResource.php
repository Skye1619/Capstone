<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Hash;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'username' => $this->username,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'password' => $this->password,
            'age' => $this->age,
            'phonenumber' => $this->phonenumber,
            'remember_token' => $this->remember_token
        ];
    }
}

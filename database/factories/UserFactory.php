<?php

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(User::class, function (Faker $faker) {
    $random_age = $faker->optional()->numberBetween(1,6);
    if($random_age) { $random_age = 10 * $random_age; }
    return [
        'name' => $faker->userName,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => \Hash::make($faker->password),
        'remember_token' => Str::random(10),
        'age' => $random_age,
    ];
});

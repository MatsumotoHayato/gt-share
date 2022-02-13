<?php

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(User::class, function (Faker $faker) {
    $random_age = $faker->optional()->numberBetween(1,6);
    $occupation_list = array(null, 'ミュージシャン', '社会人', '社会人（音楽関係）', '学生', '学生（音楽系の部活・サークル所属）', '無職');
    
    if($random_age) { $random_age = 10 * $random_age; }
    return [
        'name' => $faker->userName,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => \Hash::make($faker->password),
        'remember_token' => Str::random(10),
        'age' => $random_age,
        'occupation' => $occupation_list[array_rand($occupation_list, 1)],
    ];
});
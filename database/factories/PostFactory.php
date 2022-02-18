<?php

use App\Post;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Post::class, function (Faker $faker) {
    $datetime = $faker->dateTimeBetween($startDate = '-6 month');
    $user_count = \App\User::count();
    $song_count = \App\Song::count();
    $instrument_count = \App\Instrument::count();
    return [
        'user_id' => $faker->numberBetween(2,$user_count),
        'song_id' => $faker->numberBetween(1,$song_count), 
        'instrument_id' => $faker->numberBetween(1,$instrument_count), 
        'experience' => $faker->optional()->numberBetween(0,20),
        'score_easy' => $faker->numberBetween(1,5), 
        'score_copy' => $faker->numberBetween(1,5), 
        'score_memorize' => $faker->numberBetween(1,5), 
        'score_cost' => $faker->numberBetween(1,5), 
        'score_enjoyment' => $faker->numberBetween(1,5), 
        'body' => $faker->optional(0.9)->text,
        'url' => $faker->optional(0.5)->url,
        'created_at' => $datetime,
        'updated_at' => $datetime,
    ];
});

<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Post;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Post::create([
        //     [
        //     'user_id' => 1,
        //     'song_id' =>, 
        //     'instrument_id' =>, 
        //     'experience' =>, 
        //     'score_easy' =>, 
        //     'score_copy' =>, 
        //     'score_memorize' =>, 
        //     'score_cost' =>, 
        //     'score_enjoyment' =>, 
        //     ],
        // ]);

        // foreach ($songsList as $songs) {
        //     foreach ($songs['name'] as $song) {
        //         Song::create(['name' => $song, 'artist_id' => $songs['artist_id']]);
        //     }
        // }
    }
}

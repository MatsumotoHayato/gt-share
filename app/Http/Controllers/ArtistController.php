<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index(Artist $artist)
    {
        return $artist::withCount(['songs', 'posts'])->orderBy('name')->get();
    }
    
    public function show(Artist $artist)
    {
        return [
            'artist'=> $artist, 
            'songs' => Song::where('artist_id', $artist->id)->with('artist')->withCount('posts')->orderBy('name')->get()
        ];
    }

    public function store(Request $request, Artist $artist)
    {
        // バリデーション
        $request->validate([
            'name' => 'required|string|max:50|unique:artists,name',
        ]);
        $input = ['name' => $request['name']];
        $artist->fill($input)->save();
    }
}
<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index(Artist $artist)
    {
        // return view('artists/index')->with(['artists' => $artist->getArtistsPaginateByLimit()]);  
        return $artist::withCount(['songs', 'posts'])->orderBy('name')->get();
    }
    
    public function show(Artist $artist)
    {
        // return view('songs/index')->with([
        //     'artist'=> $artist, 
        //     'songs' => $artist->getSongsByArtist(),
        // ]);
        return [
            'artist'=> $artist, 
            'songs' => Song::where('artist_id', $artist->id)->with('artist')->withCount('posts')->orderBy('name')->get()
        ];
    }

    public function create()
    {
        return view('artists/create');
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

    public function search(Request $request, Artist $artist)
    {
        // バリデーション
        $request->validate([
            'keyword' => 'required|string|max:50'
        ]);
        return view('artists/search')->with([
            'artists' => $artist->searchArtistsByKeyword($request['keyword']),
            'keyword' => $request['keyword'],
        ]);
    }
}
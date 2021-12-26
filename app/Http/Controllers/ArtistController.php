<?php

namespace App\Http\Controllers;

use App\Artist;
use App\Song;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index(Artist $artist)
    {
        return view('artists/index')->with(['artists' => $artist->getPaginateByLimit()]);  
    }

    public function create()
    {
        return view('artists/create');
    }

    public function store(Request $request, Artist $artist)
    {
        $input = $request['artist'];
        $artist->fill($input)->save();
        return redirect('/');
    }

    public function show(Artist $artist)
    {
        return view('artists/show')->with(['artist' => $artist, 'songs' => $artist->getSongsByTargetArtist($artist->id)]);
    }
}

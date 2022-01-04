<?php

namespace App\Http\Controllers;

use App\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index(Artist $artist)
    {
        return view('artists/index')->with(['artists' => $artist->getArtistsPaginateByLimit()]);  
    }

    public function create()
    {
        return view('artists/create');
    }

    public function store(Request $request, Artist $artist)
    {
        // バリデーション
        $request->validate([
            'artist.name' => 'required|string|max:50|unique:artists,name',
        ]);
        $input = $request['artist'];
        $artist->fill($input)->save();
        return redirect('/');
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
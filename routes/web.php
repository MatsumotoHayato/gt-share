<?php

Route::get('/artists', 'ArtistController@index');  // アーティスト一覧表示（トップ画面）
Route::post('/artists', 'ArtistController@store')->middleware('auth');  // 新規アーティスト追加

Route::get('/artists/{artist}', 'ArtistController@show');  // 特定アーティストの曲一覧表示
Route::get('/songs', 'SongController@index');  // 全曲一覧表示
Route::post('/artists/{artist}/songs', 'SongController@store')->middleware('auth');  // 新規曲追加

Route::get('/songs/{song}', 'PostController@index');  // レビュー一覧表示
Route::post('/songs/{song}/posts', 'PostController@store')->middleware('auth');  // 新規レビュー投稿
Route::put('/posts/{post}', 'PostController@update')->middleware('auth');     // レビュー編集の変更内容更新
Route::delete('/posts/{post}', 'PostController@delete')->middleware('auth');  // レビュー削除

Route::post('/posts/{post}/favorite', 'PostController@favorite')->middleware('auth');  // いいね機能
Route::post('/posts/{post}/unfavorite', 'PostController@unfavorite')->middleware('auth');  // いいね取り消し機能
Route::get('/myfavorite', 'PostController@myfavorite')->middleware('auth');  // いいねマイリスト
Route::get('/myposts', 'PostController@myposts')->middleware('auth');  // 自分の投稿
Route::get('/ranking', 'SongController@ranking');  // ランキング

Route::get('/users/get', 'UserController@get'); // 現在のユーザー情報取得
Route::put('/users/profile', 'UserController@update')->middleware('auth');     // プロフィール更新
Route::put('/users/password', 'UserController@changePassword')->middleware('auth');     // パスワード変更

Auth::routes();

Route::get('/{any}', function(){
    return view('layouts/app');
})->where('any', '.*');

// Route::get('/home', 'HomeController@index')->name('home');
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'ArtistController@index');  // アーティスト一覧表示（トップ画面）
Route::get('/artists/create', 'ArtistController@create');  // 新規アーティスト追加画面
Route::post('/artists', 'ArtistController@store');

Route::get('/artists/{artist}', 'SongController@index');  // 曲一覧表示
Route::get('/artists/{artist}/songs/create', 'SongController@create');
Route::post('/artists/{artist}/songs', 'SongController@store');
// Route::get('/artists/{artist}/songs/{song}', SongController@show);
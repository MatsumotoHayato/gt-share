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
Route::get('/artists/create', 'ArtistController@create')->middleware('auth');  // 新規アーティスト追加画面
Route::post('/artists', 'ArtistController@store')->middleware('auth');

Route::get('/artists/{artist}', 'SongController@index');  // 曲一覧表示
Route::get('/artists/{artist}/songs/create', 'SongController@create')->middleware('auth');
Route::post('/artists/{artist}/songs', 'SongController@store')->middleware('auth');

Route::get('/artists/{artist}/songs/{song}', 'PostController@index');  // レビュー一覧表示
Route::get('/artists/{artist}/songs/{song}/selected', 'PostController@index_selected_instrument');  // 楽器選択時のレビュー一覧表示
Route::get('/artists/{artist}/songs/{song}/posts/create', 'PostController@create')->middleware('auth');
Route::post('/artists/{artist}/songs/{song}/posts', 'PostController@store')->middleware('auth');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

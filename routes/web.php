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

Route::get('/artists/{artist}/songs/{song}/posts/instruments/{instrument}', 'PostController@index');  // レビュー一覧表示
Route::get('/artists/{artist}/songs/{song}/posts/instruments/{instrument}/create', 'PostController@create')->middleware('auth');  // レビュー投稿画面
Route::post('/artists/{artist}/songs/{song}/posts', 'PostController@store')->middleware('auth');
Route::get('/artists/{artist}/songs/{song}/posts/{post}/edit', 'PostController@edit')->middleware('auth');  // レビュー編集
Route::put('/artists/{artist}/songs/{song}/posts/{post}', 'PostController@update')->middleware('auth');     // レビュー編集の変更内容更新
Route::delete('/artists/{artist}/songs/{song}/posts/{post}', 'PostController@delete')->middleware('auth');  // レビュー削除

Route::get('/search/artists', 'ArtistController@search');  // アーティスト名検索結果画面
Route::get('/search/songs', 'SongController@search');      // 曲名検索結果画面
Route::get('/artists/{artist}/search/songs', 'SongController@search_by_artist');  // 特定アーティストの曲名検索結果画面

Route::get('/ranking/beginners/instruments/{instrument}', 'SongController@ranking');   // 初心者向け曲ランキング

Route::post('/artists/{artist}/songs/{song}/posts/{post}/favorite', 'PostController@favorite')->middleware('auth');  // 役に立った機能
Route::post('/artists/{artist}/songs/{song}/posts/{post}/unfavorite', 'PostController@unfavorite')->middleware('auth');  // 役に立った取り消し機能
Route::post('/mylist/{post}/unfavorite', 'PostController@unfavorite_mylist')->middleware('auth');  // マイリストで役に立った取り消し機能
Route::get('/mylist', 'PostController@mylist')->middleware('auth');  // 役に立ったマイリスト

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

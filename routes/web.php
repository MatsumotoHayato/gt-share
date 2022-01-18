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

Route::get('/artists', 'ArtistController@index');  // アーティスト一覧表示（トップ画面）
Route::post('/artists', 'ArtistController@store')->middleware('auth');  // 新規アーティスト追加

Route::get('/artists/{artist}', 'ArtistController@show');  // 特定アーティストの曲一覧表示
Route::get('/songs', 'SongController@index');  // 全曲一覧表示
Route::post('/artists/{artist}/songs', 'SongController@store')->middleware('auth');  // 新規曲追加

Route::get('/songs/{song}', 'PostController@index');  // レビュー一覧表示
Route::post('/songs/{song}/posts', 'PostController@store')->middleware('auth');  // 新規レビュー投稿
Route::get('/artists/{artist}/songs/{song}/posts/{post}/edit', 'PostController@edit')->middleware('auth');  // レビュー編集
Route::put('/artists/{artist}/songs/{song}/posts/{post}', 'PostController@update')->middleware('auth');     // レビュー編集の変更内容更新
Route::delete('/artists/{artist}/songs/{song}/posts/{post}', 'PostController@delete')->middleware('auth');  // レビュー削除

// Route::get('/search/artists', 'ArtistController@search');  // アーティスト名検索結果画面
// Route::get('/search/songs', 'SongController@search');      // 曲名検索結果画面
// Route::get('/artists/{artist}/search/songs', 'SongController@searchByArtist');  // 特定アーティストの曲名検索結果画面

Route::get('/ranking/beginners/instruments/{instrument}', 'SongController@ranking');   // 初心者向け曲ランキング

Route::post('/artists/{artist}/songs/{song}/posts/{post}/favorite', 'PostController@favorite')->middleware('auth');  // 役に立った機能
Route::post('/artists/{artist}/songs/{song}/posts/{post}/unfavorite', 'PostController@unfavorite')->middleware('auth');  // 役に立った取り消し機能
Route::post('/mylist/{post}/unfavorite', 'PostController@unfavoriteMylist')->middleware('auth');  // マイリストで役に立った取り消し機能
Route::get('/mylist', 'PostController@mylist')->middleware('auth');  // 役に立ったマイリスト

Route::get('/users/{user}', 'UserController@index');  // ユーザーページ
Route::get('/users/mypage/edit', 'UserController@edit')->middleware('auth');  // 自分のユーザー情報編集
Route::put('/users/mypage', 'UserController@update')->middleware('auth');     // 自分のユーザー情報更新

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/{any}', function(){
        return view('layouts/app');
    })->where('any', '.*');

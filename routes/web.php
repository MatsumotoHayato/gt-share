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

Route::get('/', 'ArtistController@index');
Route::get('/artists/create', 'ArtistController@create');
Route::post('/artists', 'ArtistController@store');
Route::get('/artists/{artist}', 'ArtistController@show');  // 曲名一覧表示に変える
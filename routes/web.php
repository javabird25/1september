<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::view("/", "quiz");

Route::group(['prefix' => '/photocompose', 'as' => 'composition.'], function () {
    Route::view("/upload", "composition.upload")->name("upload");
    Route::post("/upload", "CompositionController@uploadPhoto");
    Route::get("/setup", "CompositionController@getSetupForm")->name("setup");
});

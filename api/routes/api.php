<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1', 'middleware' => 'cors'], function () { 
	Route::resource('empleados','empleadosController');
	Route::resource('pagos','pagosController');
	Route::resource('cuentas','cuentaController');
	Route::get('delete-cuenta/{id}','cuentaController@destroy');
	
	Route::get('pendientes','pagosController@pendientes');
	Route::get('listos/{idEmpleado}','pagosController@listos');
	Route::get('porPerfil/{idEmpleado}','pagosController@porPerfil');
});



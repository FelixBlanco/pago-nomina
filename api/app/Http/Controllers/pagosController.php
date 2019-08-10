<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pago;

class pagosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pago::get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $p = new Pago($request->all());
        $p->startus = 0;
        $p->save();
        return response()->json(['data' => $p],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Pago::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $p = Pago::find($id);
        $p->fill($request->all());
        $p->save();
        return response()->json(['data' => $p],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $p = Pago::find($id);
        $p->delete();
        $p->save();
        return response()->json(['data' => $p],200);
    }

    public function pendientes(){
        $p = Pago::where('startus',0)->get();
        $p->each(function($p){
            $p->nombre_empleado = $p->empleado->empleado;
        });
        return response()->json(['data' => $p],200);
    }

    public function listos($idEmpleado){
        $p = Pago::where([['startus',1],['empleado_id',$idEmpleado]])->get();
        return response()->json(['data' => $p],200);
    } 
    public function porPerfil($idEmpleado){
        $p = Pago::where('empleado_id',$idEmpleado)->get();
        return response()->json(['data' => $p],200);
    }        
}

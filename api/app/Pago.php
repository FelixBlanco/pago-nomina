<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pago extends Model
{
	use SoftDeletes;
    protected $fillable = ['monto','concepto','startus','codigo_pago','empleado_id','cuenta_id'];

    public function empleado(){
    	return $this->belongsTo('App\Empleado','empleado_id');
    }

    public function cuenta(){
    	return $this->belongsTo('App\Cuenta','cuenta_id');
    }    
}

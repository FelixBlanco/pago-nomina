<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cuenta extends Model
{
	use SoftDeletes;
    
    protected $fillable = ['nro','titular','cedula','empleado_id'];

    public function pagos(){
    	return $this->hasMany('App\Pago','id');
    }
}

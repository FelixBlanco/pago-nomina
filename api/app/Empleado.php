<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Empleado extends Model
{
	use SoftDeletes;
    
    protected $fillable = ["empleado"];

    public function pagos(){
    	return $this->hasMany('App\Pago','id');
    }
}

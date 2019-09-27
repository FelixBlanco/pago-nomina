new Vue({
	el: '#app',
	created:function(){
		this.getEmpleado()
		this.getListaPagos()
	},
	data:{
		routeLink: 'http://localhost:8000/api/v1/',
		list_empleados: [], nro_empleado: 0,
		e:{empleado: null, id: null}, 
		p_empleado: [], newCuenta: true,

		p:{ id:null, monto: null, concepto: null, startus: 0, empleado_id: null, cuenta_id:null },
		list_pagos: [], list_pagos_listos: [], nro_pendientes: 0,
		listo_pagar: { id: null, startus: 1, empleado_id:null, codigo_pago:null  },
		spinnerIs:{empleado:false, pago:false},
		c: {nro:null, titular:null, cedula:null, empleado_id: null}, lista_cuentas : [],
		cuentas_empleado: [], info_cuenta: [],
		cuenta_p: {nro:null, titular:null, cedula:null, empleado_id: null},
	}, 
	methods:{
		getEmpleado:function(){
			this.spinnerIs.empleado = true
			axios.get(this.routeLink+"empleados").then( resp => {
				this.spinnerIs.empleado = false
				this.list_empleados = resp.data
				this.nro_empleado = resp.data.length					
			})
		},
		empleado:function(is){
			if(is == 'new'){
				axios.post(this.routeLink+"empleados",this.e).then( resp => {
					console.log(resp)
					this.getEmpleado()
					$('#newEmpleadoModal').modal('hide')
				}, error => {
					console.log(error)
				})
			}

			if(is == 'edit'){
				axios.put(this.routeLink+"empleados/"+this.e.id,this.e).then( resp => {
					console.log(resp)
					this.getEmpleado()
					$('#editEmpleadoModal').modal('hide')
				}, error => {
					console.log(error)
				})
			}

		},
		editEmpleado:function(empleado){
			this.e.id = empleado.id
			this.e.empleado = empleado.empleado
			$('#editEmpleadoModal').modal('show')
		},
		perfilEmpleado:function(idEmpleado){
			this.getListaPagosListos(idEmpleado)
			axios.get(this.routeLink+"empleados/"+idEmpleado).then( resp => {
				this.p_empleado = resp.data
			})					
			$('#PerfilEmpleadoModal').modal('show')
		},				

		getListaPagos:function(){
			this.spinnerIs.pago = true
			axios.get(this.routeLink+"pendientes").then( resp => {						
				this.spinnerIs.pago = false
				this.list_pagos = resp.data.data
				this.nro_pendientes = resp.data.data.length
			})
		},
		pagos:function(is){
			if(is == 'new'){
				axios.post(this.routeLink+"pagos",this.p).then( resp => {
					this.list_pagos = resp.data
					this.getListaPagos()
					$('#newPagoModal').modal('hide')
				})
			} 
		},
		pagarEmpleado:function(empleado){
			$('#PagarPagoModal').modal('show')
			this.listo_pagar.id = empleado.id
			this.listo_pagar.empleado_id = empleado.empleado_id								
		},
		pagarListo:function(){
			axios.put(this.routeLink+'pagos/'+this.listo_pagar.id, this.listo_pagar).then( resp => {
				$('#PagarPagoModal').modal('hide')
				this.getListaPagosListos(resp.data.empleado_id)
				this.getListaPagos()
			})
		},
		getListaPagosListos:function(idEmpleado){
			axios.get(this.routeLink+"listos/"+idEmpleado).then( resp => {						
				this.list_pagos_listos = resp.data.data
			})
		},

		getCuenta(empleado){
			axios.get(this.routeLink+'cuentas/'+empleado).then( resp => {
				this.lista_cuentas = resp.data
			});
		},
		cuentaEmpleado:function(data){
			this.infoEmpleado = data
			this.c.empleado_id = data.id
			$('#cuentaEmpleadoModal').modal('show')
			this.getCuenta(data.id)
		},
		addCuenta(is){
			if(is == 'pagos'){
				axios.post(this.routeLink+'cuentas', this.cuenta_p).then( resp => {
					this.getCuenta(resp.data.data.empleado_id)
					this.tieneCuenta(resp.data.data.empleado_id)
				})				
			}else{
				axios.post(this.routeLink+'cuentas', this.c).then( resp => {
					this.getCuenta(resp.data.data.empleado_id)
					this.tieneCuenta(resp.data.data.empleado_id)
				})				
			}
		},
		deleteCuenta:function(id){
			axios.get(this.routeLink+'delete-cuenta/'+id).then( resp => {
				this.getCuenta(id)
			})
		},

		nroCuentas:function(data){
			axios.get(this.routeLink+'cuentas/'+data.target.value).then( resp => {				
				
				this.cuentas_empleado = resp.data
				
				if(this.cuentas_empleado != ''){ 					
					this.newCuenta = false
				}else{
					this.newCuenta = true
					this.cuenta_p.empleado_id = data.target.value  
				}				
			});
		},
		tieneCuenta:function(idEmpleado){
			axios.get(this.routeLink+'cuentas/'+idEmpleado).then( resp => {				
				this.cuentas_empleado = resp.data
				if(this.cuentas_empleado != ''){ 					
					this.newCuenta = false
				}else{
					this.newCuenta = true
					this.cuenta_p.empleado_id = data.target.value  
				}				
			});			
		},
		infoCuenta:function(data){
			this.info_cuenta = data
			$('#cuentaInfoEmpleadoModal').modal('show')
		},						
	}
})	
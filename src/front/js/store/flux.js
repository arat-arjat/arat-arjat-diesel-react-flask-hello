const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false,
			user: {},
			vehiculos: [],
			usuarios: [],
			choferes: [], 
			tecnicos: [],
			reparaciones: [], 
			reparacion: {},
			reparacionesCliente: [],
			
		},
		actions: {
			// Use getActions to call a function within a fuction


			login: async (mail, password) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: mail,
							password: password
						})
					})
					const data = await resp.json()
					if (resp.status == 200) {

						localStorage.setItem("token", data.access_token)
						setStore({ auth: true, user: data.user })
						//console.log(data.user)
						// don't forget to return something, that is how the async resolves
						return true;
					} else {
						setStore({ auth: false })
						return false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			registro: async (mail, password, nombre, apellido, telefono, rol) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "usuarios", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: mail,
							password: password,
							nombre: nombre,
							apellido: apellido,
							telefono: telefono,
							rol: rol

						})
					})
					const data = await resp.json()
					if (resp.status == 201) {
						//console.log(data)
						// don't forget to return something, that is how the async resolves
						return true;
					} else {
						return false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			logOut: () => {
				localStorage.removeItem("token")
				setStore({ auth: false })
				return true
			},

			valid: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "validation", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					})
					const data = await resp.json()
					//console.log(data)
					return true
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			obtenerVehiculos: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "vehiculos", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					})
					const data = await resp.json()
					console.log(data)
					setStore({ vehiculos: data })
					return true
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},
			crearVehiculo: async (codigo_producto, kilometraje, matricula, oem, transporte) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "vehiculos", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							codigo_producto: codigo_producto,
							kilometraje: kilometraje,
							oem: oem,
							transporte: transporte,
							matricula: matricula,

						})
					})
					const data = await resp.json()
					if (resp.status == 201) {
						//console.log(data)
						// don't forget to return something, that is how the async resolves
						return true;
					} else {
						return false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			borrarVehiculos: async (id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "vehiculos/" + id, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					})
					const data = await resp.json()
					if (resp.status == 200) {
						getActions().obtenerVehiculos()
						//console.log(data)
						// don't forget to return something, that is how the async resolves
						return true;
					} else {
						return false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			obtenerUsuarios: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "usuarios", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					})
					const data = await resp.json()
					console.log(data)
					setStore({ usuarios: data })
					return true
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			borrarUsuarios: async (id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "usuarios/" + id, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					})
					const data = await resp.json()
					if (resp.status == 200) {
						getActions().obtenerUsuarios()
						//console.log(data)
						// don't forget to return something, that is how the async resolves
						return true;
					} else {
						return false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},
			
			obtenerTecnicos: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "usuarios_tecnico", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					})
					const data = await resp.json()
					console.log(data)
					setStore({ tecnicos: data })
					return true
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},
			obtenerChoferes: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "usuarios_choferes", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					})
					const data = await resp.json()
					console.log(data)
					setStore({ choferes: data })
					return true
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			guardarReparacion: async (chofer, vehiculo, falla, tecnico, ingreso) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "reparaciones", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							nombre_chofer_propietario: chofer,
							vehiculo_id: vehiculo,
							fallas: falla, 
							tecnico_id: tecnico,
							fecha_ingreso: ingreso
						})
					})
					const data = await resp.json()
					if (resp.status == 201) {
						//console.log(data)
						// don't forget to return something, that is how the async resolves
						return true;
					} else {
						return false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			modificarReparacion: async (chofer, vehiculo, falla, tecnico, ingreso, diagnostico, dtc, solucion, costoReparacion, fechaReparacion, porcentajeTecnico, montoTecnico, salida, check, reporte) => {
                try {
                   
                    const resp = await fetch(process.env.BACKEND_URL + "reparaciones", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            nombre_chofer_propietario: chofer,
                            vehiculo_id: vehiculo,
                            fallas: falla,
                            tecnico_id: tecnico,
                            fecha_ingreso: ingreso,
                            diagnostico: diagnostico,
                            DTC: dtc,
                            solucion: solucion,
                            costo_reparacion: costoReparacion,
                            fecha_reparacion: fechaReparacion,
                            porcentaje_ganancia_tecnico: porcentajeTecnico,
                            monto_cancelado_tecnico: montoTecnico,
                            fecha_salida: salida,
                            check_list_pago: check,
                            reporte: reporte
                        })
                    })
                    
                    if (resp.status == 200) {
                        
                        getActions().obtenerReparaciones()
                        return true;
                    } else {
                        return false
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                    return false
                }
            },

			obtenerReparaciones: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "reparaciones", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					})
					const data = await resp.json()
					console.log(data)
					setStore({ reparaciones: data })
					return true
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			obtenerReparacion: async (id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "reparaciones/" + id, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					})
					const data = await resp.json()
					console.log(data)
					setStore({ reparacion: data })
					return true
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			obtenerReparacionesClientes: async () => {
				try {
					// Fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "reparaciones_clientes", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token")
						},
					});
					const data = await resp.json();
					console.log(data);
					setStore({ reparacionesCliente: data }); // Guardamos en el estado solo las reparaciones del cliente actual
					return true;
				} catch (error) {
					console.log("Error loading repairs data from backend", error);
					return false;
				}
			},
			borrarReparacion: async (id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "reparaciones/" + id, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					})
					const data = await resp.json()
					if (resp.status == 200) {
						getActions().obtenerReparaciones()
						//console.log(data)
						// don't forget to return something, that is how the async resolves
						return true;
					} else {
						return false
					}
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},
		}
	};


};

export default getState;
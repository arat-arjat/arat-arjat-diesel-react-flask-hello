import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link,  useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Navbar = () => {
	const { actions, store } = useContext(Context)
	const navigate = useNavigate()

	const logOut  = async () => {

		let resp = await actions.logOut()
		if(resp) {
			Swal.fire({
				title: "Logout!",
				text: "La sesion del Usuario ha caducado.",
				icon: "error"
			});
			navigate("/")
		}
	}

	useEffect(()=>{
		if(!store.auth){
		logOut()	
		}
	},[store.auth]) 
	console.log(store.auth)
	return (
		<nav className="navbar navbar-light bg-body-tertiary ">
			<div className="container">
				<Link to="/"style={{textDecoration:"none", color:"silver"}}> 
<p className="text-warning-emphasis">ARAT DIESEL</p>				
				</Link>
				
				<div className="ml-auto">
					{!store.auth ?
						<div>


							<Link to="/Login">
								<button className="btn btn-outline-primary mx-2">Login</button>
							</Link>
							<Link to="/Registro">
								<button className="btn btn-outline-primary mx-2">Registrarse</button>
							</Link>
						</div>
						:
						<div>
							<Link to="/">
								<button className="btn btn-outline-primary mx-2" onClick={logOut}>Cerrar Sesion</button>
							</Link>
							
						</div>
					}
				</div>
			</div>
		</nav>
	);
};
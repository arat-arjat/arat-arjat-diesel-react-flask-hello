import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Navbar = () => {
	const { actions, store } = useContext(Context)
	const navigate = useNavigate()

	const logOut = async () => {

		let resp = await actions.logOut()
		if (resp) {
			Swal.fire({
				title: "Logout!",
				text: "La sesion del Usuario ha caducado.",
				icon: "error"
			});
			navigate("/")
		}
	}

	useEffect(() => {
		if (!store.auth) {
			logOut()
		}
	}, [store.auth])

	return (
		<nav className="navbar navbar-light bg-body-tertiary ">
			<div className="container">
				<Link to="/">
					<img src="https://scontent.fmyc4-1.fna.fbcdn.net/v/t39.30808-6/431868915_122147910416075746_868966375044363633_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=wRZzczE6X4QQ7kNvgFOekzE&_nc_zt=23&_nc_ht=scontent.fmyc4-1.fna&_nc_gid=AehWxiYl7tMNqWzlzzVrhpx&oh=00_AYBXN70t-VR_0Q2zbh6eGcYVIyhxxTrJP3vyhwAJndhW9w&oe=6741746D" alt="ARAT DIESEL Logo" className="logo-image" />
				</Link>
				<div className="textoEmpresa">
					<p className="text-warning-emphasis">ARAT DIESEL</p>
				</div>
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
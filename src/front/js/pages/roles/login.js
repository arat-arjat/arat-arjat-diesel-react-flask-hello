import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [mail, setMail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		// console.log(mail, password)
		if (mail != "" && password != "") {
			let resp = await actions.login(mail, password)
			if (resp) {
				if (store.user.rol == "Administrador") {
					navigate("/MenuAdmin")
				} else if (store.user.rol == "Técnico") {
					navigate("/MenuTecnico") // Redirect to Técnico page
				} else {
					navigate("/demo")
				}

			} else {
				alert("error de ingreso")
			}
		} else {
			alert("Debe ingresar informacion")
		}
	}

	return (
		<div className="InicioSesion text-center mt-5 container">
			<h1>Inicie Sesión</h1>
			<form>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
						value={mail}
						onChange={(e) => setMail(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" id="exampleInputPassword1"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="button" className="btn btn-outline-primary mb-2" onClick={(e) => handleSubmit(e)}>Iniciar Sesion</button>
			</form>
		</div>
	);
};
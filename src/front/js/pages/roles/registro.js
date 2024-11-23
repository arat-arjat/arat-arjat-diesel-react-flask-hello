import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";


export const Registro = () => {
	const { store, actions } = useContext(Context);
	const [mail, setMail] = useState("")
	const [password, setPassword] = useState("")
	const [nombre, setNombre] = useState("")
	const [apellido, setApellido] = useState("")
	const [rol, setRol] = useState("")
	const [telefono, setTelefono] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (mail != "" && password != "" && nombre != "" && apellido != "" && telefono != "" && rol != "") {
			let resp = await actions.registro(mail, password, nombre, apellido, telefono, rol)
			if (resp) {
				let login = await actions.login(mail, password)
				if (login) {
					if (store.user.rol == "Administrador") {
						navigate("/MenuAdmin")
					} else if (store.user.rol == "Técnico") {
						navigate("/MenuTecnico") // Redirect to Técnico page
					} else {
						navigate("/demo")
					}
				}

			} else {
				alert("error de ingreso")
			}
		} else {
			alert("Debe ingresar informacion")
		}
	}

	return (
		<div className="text-center mt-5 container">
			<h1>Registrarse</h1>
			<hr />
			<form>
				<div className="row">
					<div className="col">
						<div className="mb-3">

							<input type="text" className="form-control" id="name" placeholder="Nombre"
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
							/>
						</div>
					</div>
					<div className="col">
						<div className="mb-3">
							<input type="text" className="form-control" id="last_name" placeholder="Apellido"
								value={apellido}
								onChange={(e) => setApellido(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="mb-3">

							<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electronico"
								value={mail}
								onChange={(e) => setMail(e.target.value)}
							/>
							<div id="emailHelp" className="form-text"></div>
						</div>
					</div>
					<div className="col">
						<div className="mb-3">
							<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}

							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="mb-3">
							<select className="form-select" aria-label="Default select example" value={rol} onChange={(e) => setRol(e.target.value)}>
								<option selected>Rol</option>
								<option value={"Administrador"}>Administrador</option>
								<option value={"Técnico"}>Técnico</option>
								<option value={"Cliente"}>Cliente</option>
							</select>
						</div>
					</div>
					<div className="col">
						<div className="mb-3">
							<input type="text" className="form-control" id="phone" placeholder="Teléfono"
								value={telefono}
								onChange={(e) => setTelefono(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<hr />
				<button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Registrarse</button>
				<p>Nunca compartiremos tus datos con nadie más.</p>


			</form>
		</div>
	);
};
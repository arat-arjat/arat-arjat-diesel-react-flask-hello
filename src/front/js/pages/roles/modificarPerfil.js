import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ModificarPerfil = () => {
    const { store, actions } = useContext(Context);
    const [mail, setMail] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [rol, setRol] = useState("")
    const [telefono, setTelefono] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()

    const obtenerPerfil = async () => {
        let resp = await actions.obtenerInfoPerfil(id)

        if (resp) {
            setNombre(store.perfil.nombre)
            setApellido(store.perfil.apellido)
            setMail(store.perfil.email)
            setTelefono(store.perfil.telefono)
            setRol(store.perfil.rol)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mail != "" && nombre != "" && apellido != "" && telefono != "" && rol != "") {

            let resp = await actions.modificarUsuario(mail, nombre, apellido, telefono, rol, id)
            if (resp) {
                navigate("/MenuAdmin")
            } else {
                alert("error de ingreso")
            }
        } else {
            alert("Debe ingresar informacion")
        }
    }

    useEffect(() => {
        obtenerPerfil()
    }, [])
    return (
        <div className="text-center mt-5 container">
        <h1>Editar Perfil</h1>
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
            <button type="button" className="btn btn-outline-primary" onClick={(e) => handleSubmit(e)}>Modificar</button>
            


        </form>
    </div>
    )
}

export default ModificarPerfil
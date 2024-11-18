import React from "react";
import { Login } from "../pages/roles/login"
import { Link } from "react-router-dom";

const IniciarSesion = () => {
    return (
        <div className="container">
            <div className="col">
                <Login />
                <p className="text-center">¿Aún no tienes cuenta?  <Link to={"/Registro"}> Registrate</Link></p>
            </div>


        </div>
    )
}

export default IniciarSesion
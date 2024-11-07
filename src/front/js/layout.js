import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Registro } from "./pages/roles/registro";
import { Login } from "./pages/roles/login";
import ListarVehiculos from "./pages/vehiculos/listaVehiculos";
import ListarUsuarios from "./pages/roles/ListarUsuarios";
import CrearVehiculos from "./pages/vehiculos/crearVehiculos";
import CrearReparacion from "./pages/reparacion/crearReparacion";
import ListarReparaciones from "./pages/reparacion/listarReparaciones";
import ModificarReparacion from "./pages/reparacion/modificarReparacion";
import MenuAdmin from "./pages/roles/menuadmin";
import MenuTecnico from "./pages/roles/menuTecnico";
import VerReparacionesCliente from "./pages/roles/ListarReparacionCliente";
import ModificarVehiculo from "./pages/vehiculos/modificarVehiculo";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Registro />} path="/Registro" />
                        <Route element={<Login />} path="/Login" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<ListarVehiculos />} path="/Vehiculos" />
                        <Route element={<ListarUsuarios />} path="/Usuarios" />
                        <Route element={<CrearVehiculos />} path="/CrearVehiculos" />
                        <Route element={<CrearReparacion />} path="/CrearReparacion" />
                        <Route element={<ListarReparaciones />} path="/ListarReparaciones" />
                        <Route element={<ModificarReparacion />} path="/ModificarReparacion/:id" />
                        <Route element={<MenuAdmin />} path="/MenuAdmin" />
                        <Route element={<MenuTecnico />} path="/MenuTecnico" />
                        <Route element={<VerReparacionesCliente />} path="/VerReparacionesCliente" />
                        <Route element={<ModificarVehiculo />} path="/modificar_vehiculo/:id" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

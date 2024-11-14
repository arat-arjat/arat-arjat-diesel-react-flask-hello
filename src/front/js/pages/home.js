import React from "react";
import "../../styles/home.css";
import IniciarSesion from "./IniciarSesion";
import Experiencia from "./landing_page/experiencia";
import { Footer } from "../component/footer";

export const Home = () => {

    return (
        <div className="homePage" >
            <div className="container">
                <h1 className="pt-4 text-white">Bienvenidos</h1>
                <hr />
            </div>
            <IniciarSesion />

            <div style={{ marginTop: "80px" }}>
                <Experiencia />
            </div>

            <hr />
            <Footer />
        </div>
    );
};
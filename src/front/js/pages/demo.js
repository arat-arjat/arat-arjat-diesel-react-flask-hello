import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import VerReparacionesCliente from "./roles/ListarReparacionCliente";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	
	return (
		<div className="container">
			<h1>Hola, {store.user.nombre} </h1>
			<hr/>
			<VerReparacionesCliente/> 
			<hr/>
		</div>
	);
};

import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const VerReparacionesCliente = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.obtenerReparacionesClientes(); // Llamada al backend para obtener solo reparaciones del cliente actual
    }, []);

    return (
        <div className="container mt-2">
            <h1>Reparaciones de Mi Vehículo</h1>
            <hr />
            {store.reparacionesCliente && store.reparacionesCliente.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha de Ingreso</th>
                            <th scope="col">Vehículo</th>
                            {/* <th scope="col">Chofer</th> */}
                            <th scope="col">Falla</th>
                            <th scope="col">Técnico</th>
                            <th scope="col">DTC</th>
                            <th scope="col">Reporte</th>
                            <th scope="col">Estado de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.reparacionesCliente.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.fecha_ingreso}</td>
                                <td>{item.vehiculo?.matricula}</td>
                                {/* <td>{item.nombre_chofer_propietario.nombre} {item.nombre_chofer_propietario.apellido}</td> */}
                                <td>{item.fallas}</td>
                                <td>{item.tecnico_id.nombre} {item.tecnico_id.apellido}</td>
                                <td>{item.DTC}</td>
                                <td>{}</td>
                                <td>{}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No existen reparaciones registradas para este cliente.</p>
            )}
        </div>
    );
};

export default VerReparacionesCliente;


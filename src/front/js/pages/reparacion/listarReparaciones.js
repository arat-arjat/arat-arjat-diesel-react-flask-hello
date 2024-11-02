import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

const ListarReparaciones = () => {
    const { actions, store } = useContext(Context)

    const borrar = (id) => {
        Swal.fire({
            title: "Deseas Borrar esta reparacion",
            text: "No podras recuperar esta reparacion",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                actions.borrarReparacion(id) 
                Swal.fire({
                    title: "Borrado!",
                    text: "La reparacion se ha eliminado.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        actions.obtenerReparaciones()
    }, [])

    return (
        <div className="container mt-2">
            <h1>Lista de reparaciones</h1>
            <hr />
            {store.reparaciones.length > 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha de ingreso</th>
                            <th scope="col">Vehiculo</th>
                            <th scope="col">Chofer</th>
                            <th scope="col">Falla</th>
                            <th scope="col">Tecnico</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.reparaciones.map((item) => (
                            <tr key={item.id}>
                                <th scope="row" >{item.id}</th>
                                <td>{item.fecha_ingreso}</td>
                                <td>{item.vehiculo?.matricula}</td>
                                <td>{item.nombre_chofer_propietario.nombre} {item.nombre_chofer_propietario.apellido}</td>
                                <td>{item.fallas}</td>
                                <td>{item.tecnico_id.nombre} {item.tecnico_id.apellido}</td>
                                <td><i className="fa fa-eye"></i></td>
                                <td>
                                    <Link to={"/ModificarReparacion/" + item.id}> 
                                    <i className="fa fa-pen"></i>
                                    </Link>
                                    </td>
                                <td><i className="fa fa-trash" onClick={() => borrar(item.id)}></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <p>No existen reparaciones ingresadas.</p>
            }
        </div>
    )
}

export default ListarReparaciones
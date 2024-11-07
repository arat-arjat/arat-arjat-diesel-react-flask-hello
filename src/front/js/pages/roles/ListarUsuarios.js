import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

const ListarUsuarios = () => {
    const { actions, store } = useContext(Context)

    const columnas = ["#", "Nombre", "Apellido", "Mail", "Rol", "Telefono", ""]

    const borrar = (id) => {
        Swal.fire({
            title: "Deseas Borrar este Usuario",
            text: "No podras recuperar este Usuario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                actions.borrarUsuarios(id)
                Swal.fire({
                    title: "Borrado!",
                    text: "El Usuario se ha eliminado.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        actions.obtenerUsuarios()
    }, [])

    return (
        <div className="container mt-2">
            <h1>Lista de usuarios</h1>
            <hr />
            {store.usuarios.length > 0 ?
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            {columnas.map((item, index) =>(
                            <th scope="col" key={index}>{item}</th>
                        ))}  
                        </tr>

                    </thead>
                    <tbody>
                        {store.usuarios.map((item) => (
                            <tr className="text-center" key={item.id}>
                                <th scope="row" >{item.id}</th>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.email}</td>
                                <td>{item.rol}</td>
                                <td>{item.telefono}</td>
                                <td>
                                    <Link to={"/modificarPerfil/" + item.id} >
                                        < button className="btn btn-outline-primary mx-2">
                                            <i className="fa fa-pen"> </i>
                                        </button>
                                    </Link>
                                    <button className="btn btn-outline-danger" >
                                        <i className="fa fa-trash" onClick={() => borrar(item.id)}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <p>No existen usuarios ingresados.</p>
            }
        </div>
    )
}

export default ListarUsuarios
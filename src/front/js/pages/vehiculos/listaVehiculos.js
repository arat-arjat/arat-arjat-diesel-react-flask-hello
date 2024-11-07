import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Swal from 'sweetalert2'


const ListarVehiculos = () => {
    const columnas = ["#", "Código producto", "Matrícula", "Transporte", "Kilometraje", "OEM", ""]
    const { actions, store } = useContext(Context)

    const borrar = (id) => {
        Swal.fire({
            title: "Deseas Borrar este Vehiculo",
            text: "No podras recuperar este vehiculo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
            actions.borrarVehiculos(id) 
              Swal.fire({
                title: "Borrado!",
                text: "El vehiculo se ha eliminado.",
                icon: "success"
              });
            }
          });
    }

    useEffect(() => {
        actions.obtenerVehiculos()
    }, [])

    return (
        <div className="container mt-2">
        <hr />
        <h1 className="mt-3 text-primary"
            style={{ marginLeft: "15px" }}>
            <i className="fa-solid fa-car text-dark"></i> Vehículos
        </h1>
        <hr />

        <table className="table">
            <thead>
                <tr className="text-center">
                    {columnas.map((item, index) => (
                        <th scope="col" key={index}>{item}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {store.vehiculos.map((item) => (
                    <tr key={item.id} className="text-center">
                        <th scope="row">{item.id}</th>
                        <td>{item.codigo_producto}</td>
                        <td>{item.matricula}</td>
                        <td>{item.transporte}</td>
                        <td>{item.kilometraje}</td>
                        <td>{item.oem}</td>
                        <td>
                            <Link to={"/modificar_vehiculo/" + item.id}>
                                <button className="btn btn-outline-primary mx-2">
                                    <i className="fa fa-pen"></i>
                                </button>
                            </Link>
                            <button className="btn btn-outline-danger">
                                <i className="fa fa-trash"
                                    onClick={() => borrar(item.id)}>
                                </i>
                            </button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
        <hr />
    </div>
    )
}

export default ListarVehiculos 
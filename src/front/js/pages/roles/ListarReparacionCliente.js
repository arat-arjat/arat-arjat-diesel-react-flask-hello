import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

const VerReparacionesCliente = () => {
    const { actions, store } = useContext(Context);

    const [docImprimir, setdocImprimir] = useState([])

    const imprimir = () => {

        const doc = new jsPDF();
        let data = []           // Array de info
        let i = 35              // Renglones
        // Titulo
        doc.text("Reparaciones", 65, 20)
        doc.setFontSize(11)

        docImprimir.map((item, id) => {
            i = i + 10
            data = [...data,
            [
                item.tecnico_id.nombre + " " + item.tecnico_id.apellido,
            ]
            ]
        })
        const columns = ["Tecnico"]
        doc.autoTable({
            startY: 30,
            styles: { cellWidth: "wrap" },
            headStyles: { halign: 'center' }, // Centra los titulos
            bodyStyles: { halign: "center" }, // Centra la info de la tabla

            head: [columns],
            body: data
        })

        doc.save("Reporte.pdf")

    }

    const reparaciones = async () => {
        let resp = await actions.obtenerReparacionesClientes(); // Llamada al backend para obtener solo reparaciones del cliente actual
        if (resp) {
            setdocImprimir(store.reparacionesCliente)
        }

    }

    useEffect(() => {
        reparaciones()
    }, []);
    console.log(store.reparacionesCliente)
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
                                <td>
                                    <button className="btn btn-outline-secondary" 
                                    onClick={imprimir}>
                                        <i className="fa fa-print"> </i>
                                    </button>
                                </td>
                                <td>{ }</td>
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


import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const VerReparacionesCliente = () => {
    const { actions, store } = useContext(Context);

    const [showPayPal, setShowPayPal] = useState(false);
    const [reparacion, setReparacion] = useState({})

    const initialOptions = {
        clientId: process.env.client_id, 
        currency: "USD",
        intent: "capture",
    };

    const paypal = (item) => {
        setShowPayPal(true)
        setReparacion(item)
    }

    const imprimir = (item) => {
        const doc = new jsPDF();

        const fechaFormateada = item.fecha_ingreso.slice(5, 16);
        const fechaSalida = item.fecha_salida.slice(5, 16)

        // Titulo
        doc.text(`Reparación ${item.vehiculo?.matricula}`, 15, 20)
        doc.setFontSize(12)

        let data = [
            [
                item.tecnico_id.nombre + " " + item.tecnico_id.apellido,
                fechaFormateada,
                item.vehiculo?.matricula,
                item.fallas,
                item.DTC,
                fechaSalida
            ]
        ];

        const columns = ["Técnico", "Fecha de Ingreso", "Vehículo", "Falla", "DTC", "Fecha de salida"];

        doc.autoTable({
            startY: 30,
            styles: { cellWidth: "wrap" },
            headStyles: { halign: 'center' }, // Centra los titulos
            bodyStyles: { halign: "center" }, // Centra la info de la tabla

            head: [columns],
            body: data
        })


        // Posición inicial para los textos adicionales
        let yPosition = doc.lastAutoTable.finalY + 10;

        doc.setFontSize(11);
        doc.text(`Diagnóstico: ${item.diagnostico}`, 14, yPosition);
        yPosition += 10; // Mover la posición hacia abajo para el siguiente texto

        doc.text(`Reporte: ${item.reporte}`, 14, yPosition);
        yPosition += 10; // Mover la posición hacia abajo para el siguiente texto

        if (item.check_list_pago === "Pendiente") {
            doc.setTextColor(255, 0, 0); // Establecer el color a rojo (RGB: 255, 0, 0)
            doc.text(`Estado de pago: ${item.check_list_pago}`, 14, yPosition);
        } else {
            doc.setTextColor(0, 0, 0); // Establecer el color a negro (RGB: 0, 0, 0)
            doc.text(`Estado de pago: ${item.check_list_pago}`, 14, yPosition);
        }

        doc.save(`Reparación_${fechaFormateada}_.pdf`);

    }

    const reparaciones = async () => {
        await actions.obtenerReparacionesClientes(); // Llamada al backend para obtener solo reparaciones del cliente actual
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
                                <td>{(item.fecha_ingreso.slice(5, 16))}</td>
                                <td>{item.vehiculo?.matricula}</td>
                                {/* <td>{item.nombre_chofer_propietario.nombre} {item.nombre_chofer_propietario.apellido}</td> */}
                                <td>{item.fallas}</td>
                                <td>{item.tecnico_id.nombre} {item.tecnico_id.apellido}</td>
                                <td>{item.DTC}</td>
                                <td>
                                    <button className="btn btn-outline-secondary align-middle"
                                        onClick={() => imprimir(item)}>
                                        <i className="fa fa-print"> </i>
                                    </button>
                                </td>
                                <td>
                                    {item.check_list_pago}
                                    {item.check_list_pago == "Pendiente" && (
                                        <button
                                            className="btn btn-outline-secondary align-middle mx-2"
                                        onClick={() => paypal(item)}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                                alt="Paypal"
                                                width={"30px"}
                                            />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No existen reparaciones registradas para este cliente.</p>
            )}

            {showPayPal && (
                <div className="d-flex justify-content-end" style={{ marginRight: "30px" }}>
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons style={{ layout: "horizontal" }}
                            createOrder={() => actions.createOrder(reparacion)}
                        />
                    </PayPalScriptProvider>
                </div>
            )}
        </div>
    );
};

export default VerReparacionesCliente;


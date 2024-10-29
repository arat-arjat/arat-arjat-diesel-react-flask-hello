import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const ModificarReparacion = () => {
    const { id } = useParams()
    const { actions, store } = useContext(Context)
    const [chofer, setChofer] = useState("")
    const [tecnico, setTecnico] = useState("")
    const [vehiculo, setVehiculo] = useState("")
    const [falla, setFalla] = useState("")
    const [ingreso, setIngreso] = useState("")
    const [diagnostico, setDiagnostico] = useState("")
    const [dtc, setDtc] = useState("")
    const [solucion, setSolucion] = useState("")
    const [costoReparacion, setCostoReparacion] = useState("")
    const [fechaReparacion, setFechaReparacion] = useState("")
    const [porcentajeTecnico, setPorcentajeTecnico] = useState("")
    const [montoTecnico, setMontoTecnico] = useState("")
    const [salida, setSalida] = useState("")
    const [check, setCheck] = useState("")
    const [reporte, setReporte] = useState("")
    const navigate = useNavigate()
    const modificarReparacion = async () => {
        if (chofer != "" && vehiculo != "" && falla != "" && tecnico != "" && ingreso != "") {
            let resp = await actions.modificarReparacion(
                chofer,
                vehiculo,
                falla,
                tecnico,
                ingreso,
                diagnostico,
                dtc,
                solucion,
                costoReparacion,
                fechaReparacion,
                porcentajeTecnico,
                montoTecnico,
                salida,
                check,
                reporte
            );
            if (resp) {
                navigate("/ListarReparaciones")
            } else {
                Swal.fire({
                    icon: "error",
                    title: "error al guardar",
                    text: "No se guardaron los datos correctamente"
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Faltan Datos",
                text: "Debe ingresar todos los Datos"
            });
        }
    }
    const obtenerReparacion = async () => {
        let resp = await actions.obtenerReparacion(id)
        if (resp) {
            setChofer(store.reparacion.nombre_chofer_propietario.id)
            setFalla(store.reparacion.fallas)
            // Convertir fecha_ingreso a formato YYYY-MM-DD
            const fechaIngreso = new Date(store.reparacion.fecha_ingreso).toISOString().split("T")[0];
            setIngreso(fechaIngreso);
            setTecnico(store.reparacion.tecnico_id.id)
            setVehiculo(store.reparacion.vehiculo.id)
            setDiagnostico(store.reparacion.diagnostico)
            setDtc(store.reparacion.DTC)
            setSolucion(store.reparacion.solucion)
            setCostoReparacion(store.reparacion.costo_reparacion)
            // Convertir fecha_reparacion a formato YYYY-MM-DD
            const fechaReparacion = new Date(store.reparacion.fecha_reparacion).toISOString().split("T")[0];
            setFechaReparacion(fechaReparacion)
            setPorcentajeTecnico(store.reparacion.porcentaje_ganancia_tecnico)
            setMontoTecnico(store.reparacion.monto_cancelado_tecnico)
             // Convertir fecha_salida a formato YYYY-MM-DD
            const fechaSalida = new Date(store.reparacion.fecha_salida).toISOString().split("T")[0];
            setSalida(fechaSalida)
            setCheck(store.reparacion.check_list_pago)
            setReporte(store.reparacion.reporte)
        }
    }
    useEffect(() => {
        actions.obtenerChoferes()
        actions.obtenerTecnicos()
        actions.obtenerVehiculos()
        obtenerReparacion()
    }, [])
    return (
        <div className="container">
            <h1>Editar reparación</h1>
            <hr />
            <form>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Nombre del chofer
                            </label>
                            <select className="form-select" aria-label="Default select example"
                                value={chofer} onChange={(e) => setChofer(e.target.value)}
                            >
                                <option selected>{store.choferes.find(c => c.id === chofer)?.nombre || "Chofer"}</option>
                                {store.choferes
                                    .filter(item => item.id !== chofer)
                                    .map(item => (
                                        <option key={item.id} value={item.id}>{item.nombre} {item.apellido}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Vehiculo
                            </label>
                            <select className="form-select" aria-label="Default select example"
                                value={vehiculo} onChange={(e) => setVehiculo(e.target.value)}
                            >
                                <option selected>{store.vehiculos.find(v => v.id === vehiculo)?.matricula || "Vehículo"}</option>
                                {store.vehiculos
                                    .filter(item => item.id !== vehiculo)
                                    .map(item => (
                                        <option key={item.id} value={item.id}>{item.matricula} - {item.codigo_producto}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Fallas
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={falla}
                                onChange={(e) => { setFalla(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Tecnico
                            </label>
                            <select className="form-select" aria-label="Default select example"
                                value={tecnico} onChange={(e) => setTecnico(e.target.value)}
                            >
                                 <option selected>{store.tecnicos.find(t => t.id === tecnico)?.nombre || "Técnico"}</option>
                                {store.tecnicos
                                    .filter(item => item.id !== tecnico)
                                    .map(item => (
                                        <option key={item.id} value={item.id}>{item.nombre} {item.apellido}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Fecha de Ingreso
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={ingreso}
                                onChange={(e) => { setIngreso(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Diagnostico
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={diagnostico}
                                onChange={(e) => { setDiagnostico(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                DTC
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={dtc}
                                onChange={(e) => { setDtc(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Solucion
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={solucion}
                                onChange={(e) => { setSolucion(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Fecha de reparacion
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={fechaReparacion}
                                onChange={(e) => { setFechaReparacion(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Costo de Reparacion
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={costoReparacion}
                                onChange={(e) => { setCostoReparacion(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Porcentaje Tecnico
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={porcentajeTecnico}
                                onChange={(e) => { setPorcentajeTecnico(e.target.value) }}
                                aria-describedby="emailHelp"
                            />

                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                monto cancelado Tecnico
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={montoTecnico}
                                onChange={(e) => { setMontoTecnico(e.target.value) }}
                                aria-describedby="emailHelp"
                            />

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Fecha de salida
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={salida}
                                onChange={(e) => { setSalida(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Check list pago
                            </label>
                            <select className="form-select" aria-label="Default select example"
                                value={check} onChange={(e) => setCheck(e.target.value)}
                            >
                                <option selected>Check list pago</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Reporte
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={reporte}
                                onChange={(e) => { setReporte(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <button type="button"
                     onClick={(e) => modificarReparacion(e)}
                    className="btn btn-outline-primary">
                    Actualizar Reparación
                </button>
            </form >
        </div >
    )
}
export default ModificarReparacion
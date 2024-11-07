import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const ModificarVehiculo = () => {
    const { actions, store } = useContext(Context)
    const { id } = useParams()
    const navigate = useNavigate()

    const [producto, setProducto] = useState("")
    const [matricula, setMatricula] = useState("")
    const [transporte, setTransporte] = useState("")
    const [kilometraje, setKilometraje] = useState("")
    const [oem, setOem] = useState("")

    const modificarVehiculo = async (e) => {
        e.preventDefault()
        let resp = await actions.modificarVehiculo(id, producto, kilometraje, matricula, oem, transporte)
       
        if (resp) {
            navigate("/Vehiculos")
        }
    }

    const infoVehiculo = async () => {
        let resp = await actions.obtenerInfoVehiculo(id)
        if (resp) {
            setProducto(store.vehiculo.codigo_producto)
            setMatricula(store.vehiculo.matricula)
            setTransporte(store.vehiculo.transporte)
            setKilometraje(store.vehiculo.kilometraje)
            setOem(store.vehiculo.oem)
        }
    }

    useEffect(() => {
        infoVehiculo()
    }, [])

    return ( 
        <div className="container">
            <hr />
            <h1 className="mt-3 text-primary"
                style={{ marginLeft: "15px" }}>
                <i className="fa-solid fa-car text-dark"></i>  Modificar info del vehículo
            </h1>
            <hr />

            <div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Código producto
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={producto}
                                onChange={(e) => { setProducto(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Matricula
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={matricula}
                                onChange={(e) => { setMatricula(e.target.value) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Transporte
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={transporte}
                                onChange={(e) => { setTransporte(e.target.value) }}
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Kilometraje
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                value={kilometraje}
                                onChange={(e) => { setKilometraje(e.target.value) }}
                                id="exampleInputPassword1"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    OEM
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    value={oem}
                                    onChange={(e) => { setOem(e.target.value) }}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        <div className="col">

                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="button"
                        onClick={(e) => modificarVehiculo(e)}
                        className="btn btn-outline-primary w-50">
                        Modificar vehículo
                    </button>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default ModificarVehiculo
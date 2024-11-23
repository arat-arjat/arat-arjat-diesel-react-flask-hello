import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CrearVehiculos = () => {
    const { actions, store } = useContext(Context)
    const [producto, setProducto] = useState("")
    const [matricula, setMatricula] = useState("")
    const [transporte, setTransporte] = useState("")
    const [kilometraje, setKilometraje] = useState("")
    const [oem, setOem] = useState("")
    const navigate= useNavigate()

    const agregarVehiculo = async (e) => {
        e.preventDefault()
        let resp = await actions.crearVehiculo(producto, kilometraje, matricula, oem, transporte)
        if(resp) {
          navigate("/Vehiculos")  
        }

    }

    return (

        <div className="container mt-2">
            <h1> Agregar vehiculos </h1>
            <hr />
            <form>
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
                <hr />
                <button type="button" onClick={(e) => agregarVehiculo(e)} className="btn btn-outline-primary">
                    Agregar Vehiculos
                </button>
            </form>
        </div>
    )

}

export default CrearVehiculos

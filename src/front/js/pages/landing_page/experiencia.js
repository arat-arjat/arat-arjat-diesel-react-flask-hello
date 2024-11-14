import React from "react";

const Experiencia = () => {
    const info = [
        {
            imagen: "https://www.serpresur.com/wp-content/uploads/2023/06/serpresur-riesgos-mas-comunes-en-un-taller-mecanico-2-scaled.jpg",
            detalle: "Servicio profesional",
            infoAdicional: "Personal capacitado y honesto. Diagnósticos precisos, presupuestos claros y explicaciones detalladas para nuestros cliente."
        },
        {
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB1B5i3nODcjRADQM9zJznT35P_lDEb2r2oQ&s",
            detalle: "Reparaciones de calidad",
            infoAdicional: "Repuestos originales o de alta calidad y reparaciones siguiendo los estándares recomendados asegura que los arreglos sean duraderos y efectivos."
        },
        {
            imagen: "https://www.camarounds.com/wp-content/uploads/2020/06/foto-mec%C3%A1nico.jpg",
            detalle: "Rápidez y cumplimiento",
            infoAdicional: "Nos comprometemos con plazos realistas y entrega de los vehículos a tiempo. Seguimiento en cada etapa de su vehículo y post-reparación"
        }
    ]

    return (
        <div className="container">
            <div className="text-center mb-4"> 
                <h1>Más de 20 años de experiencia en el rubro</h1>
            </div>
            <div className="d-flex justify-content-center">
                {info.map((item, index) => (
                    <div className="card" key={index} style={{ width: "18rem", marginLeft: "40px" }}>
                        <img src={item.imagen} className="card-img-top" alt={item.detalle} />
                        <div className="card-body">
                            <h5 className="card-title text-center text-primary fs-2">{item.detalle}</h5>
                            <p className="card-text text-center">{item.infoAdicional}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Experiencia
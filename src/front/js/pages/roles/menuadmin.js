import React from "react";
import Card from "../../component/card";
import { Footer } from "../../component/footer";


const MenuAdmin = () => {
    let menu = [

        {
            "img": "https://media.istockphoto.com/id/1934523700/es/foto/primer-plano-de-la-mano-del-hombre-usando-el-tel%C3%A9fono-m%C3%B3vil.webp?a=1&b=1&s=612x612&w=0&k=20&c=WzEp0ZBBf5cb-NGoZVOXhy2RzGSDgUvAhPLGQgavvJ8=",
            "titulo": "Usuarios",
            "linkListado": "/Usuarios",
            "linkAgregar": "/Registro",
        },
        {
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDAbHn4t7HjcIFwE4hYyB7GgNufV5ABwL_UlA-McsQX1YzPZH0yraICw-Ze5JYlCsZl4&usqp=CAU",
            "titulo": "Vehiculos",
            "linkListado": "/Vehiculos",
            "linkAgregar": "/CrearVehiculos",
            
        },

        {
            "img": "https://www.mppt.gob.ve/wp-content/uploads/2019/02/DSC6406.jpg",
            "titulo": "Reparaciones",
            "linkListado": "/ListarReparaciones",
            "linkAgregar": "/CrearReparacion",
        },

        

    ]

    return (
        <div className="container">
            <h1>Menu Administrador</h1>
            <hr />
            <div className="row"> 
                {menu.map((item, index) =>( 
                    <Card
                    key={index}
                    img={item.img}
                    titulo={item.titulo}
                    linkListado={item.linkListado}
                    linkAgregar={item.linkAgregar}
                    />
                ) )}
            </div>
            <hr />
            <Footer />
        </div>

    )
}

export default MenuAdmin

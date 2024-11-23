import React from "react";
import Card from "../../component/card"

const MenuTecnico = () => {
    let menu = [

       
        {
            "img": "https://scontent.fmyc4-1.fna.fbcdn.net/v/t39.30808-6/467475986_122193522536075746_2957642374993846276_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=wty7P9Np85IQ7kNvgG-OIxr&_nc_zt=23&_nc_ht=scontent.fmyc4-1.fna&_nc_gid=AF4e9rn5N8_1DKjBw5yhOLG&oh=00_AYAv6YZVmCLBSQ27KcQUw8Yi8PrCbBwtY5kXXJwXeuF7hQ&oe=67418F09",
            "titulo": "Vehiculos",
            "linkListado": "/Vehiculos",
            "linkAgregar": "/CrearVehiculos",
            
        },

        {
            "img": "https://scontent.fmyc4-1.fna.fbcdn.net/v/t39.30808-6/467656996_122193522596075746_7260377403487034535_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZdjODxpY2JUQ7kNvgHj3Sqx&_nc_zt=23&_nc_ht=scontent.fmyc4-1.fna&_nc_gid=AO3aTnoM8g7XOjZ5FRJk7Zj&oh=00_AYDHDRhGPHsY-RhbvFEdDJ0aVQMIGQ1VuoMBK7YQkquKEA&oe=6741AD14",
            "titulo": "Reparaciones",
            "linkListado": "/ListarReparaciones",
            "linkAgregar": "/CrearReparacion",
        },
        // {
        //     "img": "https://scontent.fmyc4-1.fna.fbcdn.net/v/t39.30808-6/467491168_122193522560075746_3267547907488027809_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VFbi1hyHexEQ7kNvgEtDUd4&_nc_zt=23&_nc_ht=scontent.fmyc4-1.fna&_nc_gid=A_IXRrLRQKlhL54J8HESlcP&oh=00_AYDYE9vad25qz2dTMVZb-9pVYRWtYQdvg4xZw3K_3wfTsQ&oe=674198F3",
        //     "titulo": "Editar Reparaciones",
        //     "linkListado": "/ModificarReparacion/:id",
        //     "linkAgregar": "/Registro",
        // },

        

    ]

    return (
        <div className="container">
            <h1>Menu Tecnico</h1>
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
        </div>

    )
}

export default MenuTecnico

import React from "react";

export const Footer = () => (
    <div className="footer">
        <div className="row">
            <div className="col-5 d-flex justify-content-center p-2">
                <img src="https://gpautomocion.com/wp-content/uploads/2024/03/2150170020.jpg"
                    className="rounded-pill"
                    style={{ width: "65%" }}
                />
            </div>
            <div className="col-7 mt-5">
                <h5 className="text-white">
                    <i className="fa fa-map-pin"> Dirección:
                    </i>
                </h5>
                <br />
                <h5 className="text-white">
                    <i className="fa fa-phone"> Teléfono: </i>
                </h5>
                <br />
                <h5 className="text-white">
                    <i className="fa fa-envelope"> E-mail: </i>
                </h5>
            </div>
        </div>
        <hr/>
    </div>
);
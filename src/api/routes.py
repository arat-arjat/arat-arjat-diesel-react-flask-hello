"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, Usuario, Vehiculo, Reparacion
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import bcrypt
import requests #pipenv install Flask Flask-SQLAlchemy requests
import os


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/login', methods=['POST'])
def login(): 
    body = request.get_json(silent=True)
    if body is None: 
        return jsonify({"msg": "el cuerpo esta vacio"}), 400
    if 'email' not in body: 
        return jsonify({"msg": "email es requerido"}), 400
    if 'password' not in body: 
        return jsonify({"msg": "password es requerido"}), 400
    user = Usuario.query.filter_by(email=body["email"]).all()
    #print(user[0].serialize())
    if user == []:
        return jsonify({"msg": "user or password invalid"}), 400
    
    correct_password = current_app.bcrypt.check_password_hash(user[0].password, body["password"]) 
    if correct_password is False:
        return jsonify({"msg": "user or password invalid"}), 400
    access_token = create_access_token(identity=user[0].email)
    return jsonify({"msg": "ok", 
                    "access_token" : access_token, 
                    "user": user[0].serialize()
                    }), 200 

@api.route('/private', methods=['GET'])
@jwt_required()
def private(): 
    identity = get_jwt_identity()
    print(identity)
    return jsonify({"msg": "thi is a provate message"})

@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    if usuarios == []:
        return jsonify({"MSG":"No existen usuarios"}), 404
    return jsonify([u.serialize() for u in usuarios]), 200

@api.route('/usuarios', methods=['POST'])
def crear_usuario():
    datos = request.json
    exist_user = Usuario.query.filter_by(email=datos["email"]).first()
    if exist_user: 
        return jsonify({"MSG": "Ya existe el usuario"}), 404
    
    new_password = current_app.bcrypt.generate_password_hash(datos['password']).decode('utf-8')

    usuario = Usuario(
        nombre=datos['nombre'],
        apellido=datos['apellido'], 
        email=datos['email'], 
        password= new_password,   
        rol=datos['rol'],
        telefono = datos ["telefono"],
        )
    db.session.add(usuario)
    db.session.commit()
    return jsonify({'mensaje': 'Usuario creado exitosamente'}), 201

@api.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuario.query.filter_by(id=id).first()
    if usuario is None: 
        return jsonify({"msg": "no existe el usuario"}), 404
    return jsonify(usuario.serialize()), 200

@api.route('/usuarios/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    usuario = Usuario.query.filter_by(id=id).first()
    if usuario is None: 
        return jsonify({"msg": "no existe el usuario"}), 404
    
    datos = request.json
    usuario.nombre = datos['nombre']
    usuario.apellido = datos['apellido']
    usuario.email = datos['email']
    usuario.password = usuario.password
    usuario.rol = datos['rol']
    usuario.telefono = datos["telefono"]

    db.session.commit()
    return jsonify({'mensaje': 'Usuario actualizado exitosamente'}), 200

@api.route('/usuarios/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    usuario = Usuario.query.filter_by(id=id).first()
    if usuario is None: 
        return jsonify({"msg": "no existe el usuario"}), 404
    
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({'mensaje': 'Usuario eliminado exitosamente'}), 200

@api.route('/vehiculos', methods=['GET'])
def get_vehiculos():
    vehiculos = Vehiculo.query.all()
    if vehiculos == []:
        return jsonify({"MSG":"No existen vehiculos"}), 404
    return jsonify([u.serialize() for u in vehiculos]), 200


@api.route('/vehiculos', methods=['POST'])
def crear_vehiculo():
    datos = request.json
    existe = Vehiculo.query.filter_by(matricula=datos["matricula"]).first()
    if existe: 
        return jsonify({"msg": "Ya existe el vehiculo"}), 404
    
    vehiculo = Vehiculo(
        codigo_producto=datos['codigo_producto'],
        matricula=datos['matricula'], 
        transporte=datos['transporte'], 
        kilometraje=datos['kilometraje'], 
        oem=datos['oem'], 
        )
    
    db.session.add(vehiculo)
    db.session.commit()
    return jsonify({'mensaje': 'Vehículo creado exitosamente'}), 201

@api.route('/vehiculos/<int:id>', methods=['DELETE'])
def eliminar_vehiculo(id):
    vehiculo = Vehiculo.query.filter_by(id=id).first()
    if vehiculo is None:
        return jsonify({"msg": "no existe el vehículo"}), 404
    
    db.session.delete(vehiculo)
    db.session.commit()
    return jsonify({'mensaje': 'Vehículo eliminado exitosamente'}), 200


# @api.route('/usuarios/<int:id>', methods=['GET'])
# def get_usuario(id):
#    usuario = Usuario.query.filter_by(id=id).first()
#    if usuario is None: 
#        return jsonify({"msg": "no existe el usuario"}), 404
#    return jsonify(usuario.serialize()), 200 

@api.route('/usuarios_choferes', methods=['GET'])
def get_choferes():
   usuario = Usuario.query.filter_by(rol="Cliente").all()
   if usuario == [] : 
       return jsonify({"msg": "no existe el usuario"}), 404
   return jsonify([u.serialize() for u in usuario]), 200

@api.route('/usuarios_tecnico', methods=['GET'])
def get_tecnico():
   usuario = Usuario.query.filter_by(rol="Técnico").all()
   if usuario == [] : 
       return jsonify({"msg": "no existe el Tecnico"}), 404
   return jsonify([u.serialize() for u in usuario]), 200

@api.route('/vehiculos/<int:id>', methods=['PUT'])
def actualizar_vehiculo(id):
    vehiculo = Vehiculo.query.filter_by(id=id).first()
    if vehiculo is None: 
        return jsonify({"msg": "No existe el vehículo"}), 404
    
    datos = request.json
    vehiculo.codigo_producto = datos['codigo_producto']
    vehiculo.matricula = datos['matricula']
    vehiculo.transporte = datos['transporte']
    vehiculo.kilometraje = datos['kilometraje']
    vehiculo.oem = datos['oem']
    
    db.session.commit()
    return jsonify({'mensaje': 'Vehículo actualizado exitosamente'}), 200 


#@api.route('/usuarios/<int:id>', methods=['DELETE'])
#def eliminar_usuario(id):
#    usuario = Usuario.query.filter_by(id=id).first()
#    if usuario is None: 
#        return jsonify({"msg": "no existe el usuario"}), 404
    
#    db.session.delete(usuario)
#    db.session.commit()
#    return jsonify({'mensaje': 'Usuario eliminado exitosamente'})

@api.route('/reparaciones', methods=['GET'])
def obtener_reparaciones():
    reparaciones = Reparacion.query.all()
    if reparaciones == [] : 
        return jsonify({"msg": "No existen repraciones"}), 404
    return jsonify([reparacion.serialize() for reparacion in reparaciones]), 200

@api.route('/reparaciones/<int:id>', methods=['GET'])
def obtener_reparacion(id):
    reparacion = Reparacion.query.filter_by(id=id).first()
    if reparacion is None:
        return jsonify({"msg": "No existe la reparación"}), 404
    
    return jsonify(reparacion.serialize()), 200

@api.route('/reparaciones', methods=['POST'])
def crear_reparacion():
    data = request.get_json()

    nueva_reparacion = Reparacion(
        nombre_chofer_propietario=data['nombre_chofer_propietario'],
        vehiculo_id=data['vehiculo_id'],
        fallas=data['fallas'],
        tecnico_id=data['tecnico_id'],
        fecha_ingreso=data['fecha_ingreso'],        
        # diagnostico= data ["diagnostico"],
        # DTC=data['DTC'],
        # solucion=data['solucion'],
        # fecha_reparacion=data.get('fecha_reparacion'),
        # costo_reparacion=data.get('costo_reparacion'),
        # monto_cancelado_tecnico=data.get('monto_cancelado_tecnico'),
        # porcentaje_ganancia_tecnico=data.get('porcentaje_ganancia_tecnico'),
        # porcentaje_ganancia_empresa=data.get('porcentaje_ganancia_empresa'),
        # check_list_pago=data.get('check_list_pago'),
        # fecha_salida=data.get('fecha_salida'),
        # reporte=data.get('reporte')
    )

    db.session.add(nueva_reparacion)
    db.session.commit()
    return jsonify(nueva_reparacion.serialize()), 201

@api.route('/reparaciones/<int:id>', methods=['PUT'])
def actualizar_reparacion(id):
    reparacion = Reparacion.query.filter_by(id=id).first()

    if reparacion is None:
        return jsonify({"msg": "No existe la reparación"}), 404

    data = request.get_json()

    reparacion.nombre_chofer_propietario = data["nombre_chofer_propietario"]
    reparacion.vehiculo_id = data["vehiculo_id"]
    reparacion.fallas = data["fallas"]
    reparacion.DTC = data["DTC"]
    reparacion.solucion = data["solucion"]
    reparacion.tecnico_id = data["tecnico_id"]
    reparacion.fecha_ingreso = data["fecha_ingreso"]
    reparacion.fecha_reparacion = data["fecha_reparacion"]
    reparacion.costo_reparacion = data["costo_reparacion"]
    reparacion.monto_cancelado_tecnico = data["monto_cancelado_tecnico"]
    reparacion.porcentaje_ganancia_tecnico = data["porcentaje_ganancia_tecnico"]
    reparacion.porcentaje_ganancia_empresa = data["porcentaje_ganancia_empresa"]
    reparacion.check_list_pago = data["check_list_pago"]
    reparacion.fecha_salida = data["fecha_salida"]
    reparacion.reporte = data["reporte"]

    db.session.commit()
    return jsonify(reparacion.serialize()), 200

@api.route('/reparaciones/<int:id>', methods=['DELETE'])
def eliminar_reparacion(id):
    reparacion = Reparacion.query.filter_by(id=id).first()
    if reparacion is None:
        return jsonify({"msg": "No existe la reparación"}), 404
    
    db.session.delete(reparacion)
    db.session.commit()
    return jsonify({'mensaje': 'Reparación eliminada exitosamente'}), 200

@api.route('/reparaciones_clientes', methods=['GET'])
@jwt_required()
def reparaciones_clientes():
    user = get_jwt_identity () 
    # print (user)
    user_id = Usuario.query.filter_by(email = user).first()
    # print (user_id.id)
    reparaciones = Reparacion.query.filter_by(nombre_chofer_propietario=user_id.id).all()
    if reparaciones == [] : 
        return jsonify({"msg": "No existen repraciones"}), 404
    return jsonify([reparacion.serialize() for reparacion in reparaciones]), 200

# Endpoint para crear una orden de PayPal
@api.route('/create-paypal-order', methods=['POST'])
def create_paypal_order():
    data = request.json
    client_id = os.getenv('client_id')
    client_secret = os.getenv('client_secret')
    paypal_url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders'

    try:
        # Autenticación de PayPal
        auth_response = requests.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',
            headers={
                'Accept': 'application/json',
                'Accept-Language': 'en_US',
            },
            auth=(client_id, client_secret),
            data={'grant_type': 'client_credentials'}
        )

        auth_response.raise_for_status()
        access_token = auth_response.json()['access_token']

        # Crear la orden
        order_response = requests.post(
            paypal_url,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            },
            json={
                'intent': 'CAPTURE',
                'purchase_units': [
                    {
                        'amount': {
                            'currency_code': 'USD',
                            'value': "101"  # Ajusta este valor según tu lógica
                        }
                    }
                ]
            }
        )
        order_response.raise_for_status()

        order_id = order_response.json()['id']
        return jsonify({'orderID': order_id}), 201

    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500
    
@api.route('/vehiculos/<int:id>', methods=['GET'])
def info_vehiculo(id):
    vehiculo = Vehiculo.query.filter_by(id=id).first()
    if vehiculo is None:
        return jsonify({"msg": "no existe el vehículo"}), 404
    return jsonify(vehiculo.serialize()), 200
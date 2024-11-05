from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() 
    
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    rol = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    chofer = db.relationship("Reparacion", foreign_keys="[Reparacion.nombre_chofer_propietario]", backref="chofer_usuario")
    tecnico = db.relationship('Reparacion', foreign_keys="[Reparacion.tecnico_id]", backref="tecnico_usuario")

    def __repr__(self):
        return f'<Usuario {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "rol": self.rol,
            "telefono": self.telefono
        }

class Vehiculo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo_producto = db.Column(db.String(100), nullable=False)
    matricula = db.Column(db.String(10), nullable=False)
    transporte = db.Column(db.String(100), nullable=False)
    kilometraje = db.Column(db.Float, nullable=False)
    oem = db.Column(db.String(20), nullable=False)
    vehiculo = db.relationship('Reparacion')

    def __repr__(self):
        return f'<Vehiculo {self.matricula}>'

    def serialize(self):
        return {
           "id": self.id,
           "codigo_producto": self.codigo_producto,
           "matricula": self.matricula,
           "transporte": self.transporte,
           "kilometraje": self.kilometraje,
           "oem": self.oem
        }


class Reparacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_chofer_propietario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    vehiculo_id = db.Column(db.Integer,db.ForeignKey("vehiculo.id"))
    fallas = db.Column(db.String(200))
    diagnostico = db.Column(db.String(200))
    DTC = db.Column(db.String(100))
    solucion = db.Column(db.String(300))
    tecnico_id = db.Column(db.Integer,  db.ForeignKey("usuario.id"))
    fecha_ingreso = db.Column(db.Date)
    fecha_reparacion = db.Column(db.Date)
    costo_reparacion = db.Column(db.Float)
    monto_cancelado_tecnico = db.Column(db.Float)
    porcentaje_ganancia_tecnico = db.Column(db.Float)
    porcentaje_ganancia_empresa = db.Column(db.Float)
    check_list_pago = db.Column(db.String(15))
    fecha_salida = db.Column(db.Date) 
    reporte = db.Column(db.String(500))
    
    def __repr__(self):
        return f'<Reparacion {self.id}>'

    def serialize(self):
        vehiculo = Vehiculo.query.filter_by(id=self.vehiculo_id).first()
        chofer = Usuario.query.filter_by(id=self.nombre_chofer_propietario).first()
        tecnico =  Usuario.query.filter_by(id=self.tecnico_id).first()

        return {
           "id": self.id,
          "nombre_chofer_propietario": chofer.serialize() if chofer else None,
          "vehiculo": vehiculo.serialize() if vehiculo else None,
          "fallas": self.fallas,
          "diagnostico": self.diagnostico,
          "DTC": self.DTC,
          "solucion": self.solucion,
          "tecnico_id": tecnico.serialize() if tecnico else None,
          "fecha_ingreso": self.fecha_ingreso,
          "fecha_reparacion": self.fecha_reparacion,
          "costo_reparacion": self.costo_reparacion,
          "monto_cancelado_tecnico": self.monto_cancelado_tecnico,
          "porcentaje_ganancia_tecnico": self.porcentaje_ganancia_tecnico,
          "porcentaje_ganancia_empresa": self.porcentaje_ganancia_empresa,
          "check_list_pago": self.check_list_pago,
          "fecha_salida": self.fecha_salida,
          "reporte": self.reporte 
        }


   
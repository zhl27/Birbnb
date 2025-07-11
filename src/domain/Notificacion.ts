import { Usuario } from "./Usuario.js";

import { Reserva, EstadoReserva } from "./Reserva.js";
// import { Date } from "date-fns";

export class Notificacion {
	#mensaje;
	#usuario;
	#fechaAlta;
	#leida;
	#fechaLeida;

	constructor(
		mensaje: string,
		usuario: Usuario,
		fechaAlta: Date,
		leida: boolean,
		fechaLeida?: Date
	) {
		this.#mensaje = mensaje;
		this.#usuario = usuario;
		this.#fechaAlta = fechaAlta;
		this.#leida = leida;
		this.#fechaLeida = fechaLeida;
	}

	get mensaje() {
		return this.#mensaje;
	}
	get usuario() {
		return this.#usuario;
	}
	get fechaAlta() {
		return this.#fechaAlta;
	}
	get leida() {
		return this.#leida;
	}
	get fechaLeida() {
		return this.#fechaLeida;
	}
}

export class FactoryNotificacion {
	static _crearNotificacion(
		mensaje: string,
		receptorDeLaNotificacion: Usuario
	) {
		return new Notificacion(
			mensaje,
			receptorDeLaNotificacion,
			new Date(),
			false
		);
	}

	static crearSegunReserva(
		reserva: Reserva,
		motivo: string
	): Notificacion | undefined {
		let mensaje: string;
		const anfitrion = reserva.alojamiento.anfitrion;
		const huesped = reserva.huespedReservador;

		switch (reserva.estado) {
			case EstadoReserva.CANCELADA:
				mensaje = JSON.stringify({
					estado: reserva.estado, // esto se va a leer del consumidor de la api para saber qué notifica sobre la reserva
					anfitrion: anfitrion,
					huesped: huesped,
					motivo: motivo,
					saludo: `Hola ${anfitrion.nombre}, la reserva del huesped "${huesped.nombre}" fue cancelada.`
				});
				return FactoryNotificacion._crearNotificacion(
					mensaje,
					anfitrion
				);

			case EstadoReserva.CONFIRMADA:
				mensaje = JSON.stringify({
					estado: reserva.estado,
					anfitrion: anfitrion,
					huesped: huesped,
					motivo: motivo,
					saludo: `Hola ${huesped.nombre}, tu reserva fue confirmada por el anfitrión "${anfitrion.nombre}" !`
				});
				return FactoryNotificacion._crearNotificacion(mensaje, huesped);

			case EstadoReserva.PENDIENTE: {
				const diaCheckIn: Date = reserva.rangoFechas.fechaInicio;
				const diaCheckOut: Date = reserva.rangoFechas.fechaFin;
				mensaje = JSON.stringify({
					estado: reserva.estado,
					anfitrion: anfitrion,
					huesped: huesped,
					alojamiento: reserva.alojamiento,
					diaCheckIn: diaCheckIn,
					diaCheckOut: diaCheckOut,
					motivo: motivo,
					saludo: `Hola ${anfitrion.nombre}, una solicitud de reserva acaba de ser realizada por "${huesped.nombre}".`
				});
				return FactoryNotificacion._crearNotificacion(
					mensaje,
					anfitrion
				);
			}

			default:
				break;
		}
	}
}

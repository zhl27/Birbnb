import { EstadoReserva, Reserva } from "./Reserva.js";
import { Usuario } from "./Usuario.js";

import { FactoryNotificacion, Notificacion } from "./Notificacion.js";

export class CambioEstadoReserva {
	// una peticion de cambio de estado de reserva
	#fecha;
	#estado;
	#reserva;
	#motivo;
	#usuario;

	constructor(
		fecha: Date,
		estado: EstadoReserva,
		reserva: Reserva,
		motivo: string,
		usuario: Usuario
	) {
		this.#fecha = fecha;
		this.#estado = estado;
		this.#reserva = reserva;
		this.#motivo = motivo;
		this.#usuario = usuario;

		this.#reserva.actualizarEstado(estado);
		const notificacion = FactoryNotificacion.crearSegunReserva(
			reserva,
			motivo
		);

		this.enviarNotificacion(this.#usuario, notificacion);
	}

	enviarNotificacion(usuario: Usuario, notificacion?: Notificacion) {
		const email = usuario.email;
		const mensaje = notificacion?.mensaje;
		// enviar email al usuario
		console.log(mensaje);
	}

	get fecha() {
		return this.#fecha;
	}
	get estado() {
		return this.#estado;
	}
	get reserva() {
		return this.#reserva;
	}
	get motivo() {
		return this.#motivo;
	}
	get usuario() {
		return this.#usuario;
	}
}

import { Alojamiento } from "./Alojamiento.js";
import { RangoFechas } from "./RangoFechas.js";
import { Usuario } from "./Usuario.js";

export class Reserva {
	#fechaAlta;
	#huespedReservador;
	#cantHuespedes;
	#alojamiento;
	#rangoFechas: RangoFechas;
	#estado;
	#precioPorNoche;

	constructor(
		huespedReservador: Usuario,
		cantHuespedes: number,
		alojamiento: Alojamiento,
		rangoFechas: RangoFechas,
		estado: EstadoReserva,
		precioPorNoche: number
	) {
		this.#fechaAlta = new Date();
		this.#huespedReservador = huespedReservador;
		this.#cantHuespedes = cantHuespedes;
		this.#alojamiento = alojamiento;
		this.#rangoFechas = rangoFechas;
		this.#estado = estado;
		this.#precioPorNoche = precioPorNoche;
	}

	actualizarEstado(nuevoEstado: EstadoReserva) {
		this.#estado = nuevoEstado;
	}

	get estado() {
		return this.#estado;
	}
	get alojamiento() {
		return this.#alojamiento;
	}
	get rangoFechas() {
		return this.#rangoFechas;
	}
	get huespedReservador() {
		return this.#huespedReservador;
	}

	toDTO() {
		return {
			fechaAlta: this.#fechaAlta,
			huespedReservador: this.#huespedReservador?.nombre,
			cantHuespedes: this.#cantHuespedes,
			alojamiento: this.#alojamiento.toDTO(),
			rangoFechas: this.#rangoFechas.toDTO(),
			estado: this.#estado,
			precioPorNoche: this.#precioPorNoche
		};
	}
}

export enum EstadoReserva {
	PENDIENTE,
	CONFIRMADA,
	CANCELADA,
	ANFITRION
}

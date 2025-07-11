import { Direccion } from "./Direccion.js";
import { Foto } from "./Foto.js";
import { RangoFechas } from "./RangoFechas.js";
import { EstadoReserva, Reserva } from "./Reserva.js";
import { Usuario } from "./Usuario.js";

export class Alojamiento {
	#anfitrion: Usuario;
	#nombre: string;
	#descripcion: string;
	#precioPorNoche: number;
	#moneda: Moneda;
	#horarioCheckIn: string;
	#horarioCheckOut: string;
	#direccion: Direccion;
	#cantHuespedesMax: number;
	#caracteristicas: Caracteristica[] = [];
	#reservas: Reserva[] = [];
	#fotos: Foto[] = [];

	// constructor de la clase
	constructor(
		anfitrion: Usuario,
		nombre: string,
		descripcion: string,
		precioPorNoche: number,
		moneda: Moneda,
		horarioCheckIn: string,
		horarioCheckOut: string,
		direccion: Direccion,
		cantHuespedesMax: number
	) {
		this.#anfitrion = anfitrion;
		this.#nombre = nombre;
		this.#descripcion = descripcion;
		this.#precioPorNoche = precioPorNoche;
		this.#moneda = moneda;
		this.#horarioCheckIn = horarioCheckIn;
		this.#horarioCheckOut = horarioCheckOut;
		this.#direccion = direccion;
		this.#cantHuespedesMax = cantHuespedesMax;
	}

	estasDisponibleEn(rangoDeFechas: RangoFechas) {
		return !this.reservasConfirmadas().some(reserva =>
			reserva.rangoFechas.seSuperponeCon(rangoDeFechas)
		);
	}

	// Para toda reserva pert. reservasConf: E reserva => reserva.rangoFechas (se superpone con) rangoFechas
	// .... : V reserva => ! ....

	reservasConfirmadas() {
		return this.#reservas.filter(
			reserva => reserva.estado == EstadoReserva.CONFIRMADA
		);
	}

	tuPrecioEstaDentroDe(valorMinimo: number, valorMaximo: number) {
		return (
			this.#precioPorNoche <= valorMaximo &&
			this.#precioPorNoche >= valorMinimo
		);
	}
	tenesCaracteristica(caracteristica: Caracteristica) {
		return this.#caracteristicas.includes(caracteristica);
	}
	puedenAlojarse(cantHuespedes: number) {
		return cantHuespedes <= this.#cantHuespedesMax;
	}

	agregarReserva(reserva: Reserva) {
		this.#reservas.push(reserva);
	}

	agregarCaracteristica(caracteristica: Caracteristica) {
		this.#caracteristicas.push(caracteristica);
	}

	get reservas() {
		return this.#reservas;
	}

	get moneda() {
		return this.#moneda;
	}

	get anfitrion() {
		return this.#anfitrion;
	}
	get nombre() {
		return this.#nombre;
	}
	get descripcion() {
		return this.#descripcion;
	}
	get precioPorNoche() {
		return this.#precioPorNoche;
	}
	get horarioCheckIn() {
		return this.#horarioCheckIn;
	}
	get horarioCheckOut() {
		return this.#horarioCheckOut;
	}
	get direccion() {
		return this.#direccion;
	}
	get cantHuespedesMax() {
		return this.#cantHuespedesMax;
	}

	toDTO() {
		return {
			anfitrion: this.#anfitrion?.nombre,
			nombre: this.#nombre,
			descripcion: this.#descripcion,
			precioPorNoche: this.#precioPorNoche,
			moneda: this.#moneda,
			horarioCheckIn: this.#horarioCheckIn,
			horarioCheckOut: this.#horarioCheckOut,
			direccion: this.#direccion.toDTO(),
			cantHuespedesMax: this.#cantHuespedesMax,
			caracteristicas: this.#caracteristicas,
			fotos: this.#fotos
		};
	}
}

export enum Caracteristica {
	WIFI,
	PISCINA,
	MASCOTAS_PERMITIDAS,
	ESTACIONAMIENTO
}

export enum Moneda {
	DOLAR_USA,
	PESO_ARG,
	REALES
}

import { Ciudad } from "./Ciudad.js";

export class Direccion {
	#calle;
	#altura;
	#ciudad;
	#latitud;
	#longitud;

	constructor(
		calle: string,
		altura: number,
		ciudad: Ciudad,
		latitud: number,
		longitud: number
	) {
		this.#calle = calle;
		this.#altura = altura;
		this.#ciudad = ciudad;
		this.#latitud = latitud;
		this.#longitud = longitud;
	}

	toDTO() {
		return {
			calle: this.#calle,
			altura: this.#altura,
			ciudad: this.#ciudad.nombre,
			latitud: this.#latitud,
			longitud: this.#longitud
		};
	}
}

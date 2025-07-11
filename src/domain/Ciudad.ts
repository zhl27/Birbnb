import { Pais } from "./Pais.js";

export class Ciudad {
	#nombre;
	#pais;

	constructor(nombre: string, pais: Pais) {
		this.#nombre = nombre;
		this.#pais = pais;
	}

	get nombre() {
		return this.#nombre;
	}
	get pais() {
		return this.#pais;
	}
}

export class Pais {
	#nombre;

	constructor(nombre: string) {
		this.#nombre = nombre;
	}

	get nombre() {
		return this.#nombre;
	}
}

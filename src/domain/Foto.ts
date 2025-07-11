export class Foto {
	#descripcion;
	#path;

	constructor(descripcion: string, path: string) {
		this.#descripcion = descripcion;
		this.#path = path;
	}

	get descripcion() {
		return this.#descripcion;
	}

	get path() {
		return this.#path;
	}
}

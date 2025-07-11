export class Usuario {
	#nombre;
	#email;
	#tipo;

	constructor(nombre: string, email: string, tipo: TipoUsuario) {
		this.#nombre = nombre;
		this.#email = email;
		this.#tipo = tipo;
	}

	get nombre() {
		return this.#nombre;
	}
	get email() {
		return this.#email;
	}
	get tipo() {
		return this.#tipo;
	}
}

export enum TipoUsuario {
	HUESPED,
	ANFITRION
}

export class RangoFechas {
	#fechaInicio: Date;
	#fechaFin: Date;

	constructor(fechaInicio: Date, fechaFin: Date) {
		this.#fechaFin = fechaFin;
		this.#fechaInicio = fechaInicio;
	}

	get fechaFin() {
		return this.#fechaFin;
	}

	get fechaInicio() {
		return this.#fechaInicio;
	}

	seSuperponeCon(otroRangoFechas: RangoFechas): boolean {
		return (
			this.#fechaFin >= otroRangoFechas.fechaInicio &&
			this.#fechaInicio <= otroRangoFechas.fechaFin
		);
	}

	//             xi            xf
	//             yi        yf

	toDTO() {
		return {
			fechaInicio: this.#fechaInicio,
			fechaFin: this.#fechaFin
		};
	}
}

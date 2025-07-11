import { test, describe, expect } from "@jest/globals";

import { Pais } from "../../src/domain/Pais.js";
import { Ciudad } from "../../src/domain/Ciudad.js";
import { Direccion } from "../../src/domain/Direccion.js";
import { RangoFechas } from "../../src/domain/RangoFechas.js";
import { TipoUsuario, Usuario } from "../../src/domain/Usuario.js";
import { Alojamiento, Moneda } from "../../src/domain/Alojamiento.js";
import { Reserva, EstadoReserva } from "../../src/domain/Reserva.js";

describe("Reserva class", () => {
	test("should create a Reserva instance with correct properties", () => {
		const direc1 = new Direccion(
			"Calle Falsa",
			123,
			new Ciudad("Buenos Aires", new Pais("Argentina")),
			-34,
			-58.3816
		);
		const gaspi = new Usuario("Gaspar", "gaspi845", TipoUsuario.ANFITRION);
		const huesped1 = new Usuario(
			"Huesped 1",
			"mailhuesped",
			TipoUsuario.HUESPED
		);
		const aloj1 = new Alojamiento(
			gaspi,
			"Casa de Gaspi",
			"Casa de Gaspar",
			200,
			Moneda.DOLAR_USA,
			"14:00",
			"12:00",
			direc1,
			4
		);
		const rangoFechas1 = new RangoFechas(
			new Date("2025-10-01"),
			new Date("2025-10-05")
		);
		const reserva1 = new Reserva(
			huesped1,
			2,
			aloj1,
			rangoFechas1,
			EstadoReserva.PENDIENTE,
			200
		);
		expect(reserva1.estado).toBe(EstadoReserva.PENDIENTE);
		expect(reserva1.huespedReservador.nombre).toBe("Huesped 1");
	});

	test("should add a Reserva to an Alojamiento", () => {
		const direc1 = new Direccion(
			"Calle Falsa",
			123,
			new Ciudad("Buenos Aires", new Pais("Argentina")),
			-34,
			-58.3816
		);
		const gaspi = new Usuario("Gaspar", "gaspi845", TipoUsuario.ANFITRION);
		const huesped1 = new Usuario(
			"Huesped 1",
			"mailhuesped",
			TipoUsuario.HUESPED
		);
		const aloj1 = new Alojamiento(
			gaspi,
			"Casa de Gaspi",
			"Casa de Gaspar",
			200,
			Moneda.DOLAR_USA,
			"14:00",
			"12:00",
			direc1,
			4
		);
		const rangoFechas1 = new RangoFechas(
			new Date("2025-10-01"),
			new Date("2025-10-05")
		);
		const reserva1 = new Reserva(
			huesped1,
			2,
			aloj1,
			rangoFechas1,
			EstadoReserva.PENDIENTE,
			200
		);
		aloj1.agregarReserva(reserva1);
		expect(aloj1.reservas).toContain(reserva1);
	});
});

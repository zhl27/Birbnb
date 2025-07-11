import { test, describe, expect, beforeEach } from "@jest/globals";

import {
	Alojamiento,
	Caracteristica,
	Moneda
} from "../../src/domain/Alojamiento.js";
import { TipoUsuario, Usuario } from "../../src/domain/Usuario.js";
import { Direccion } from "../../src/domain/Direccion.js";
import { Ciudad } from "../../src/domain/Ciudad.js";
import { Pais } from "../../src/domain/Pais.js";
import { RangoFechas } from "../../src/domain/RangoFechas.js";
import { Reserva, EstadoReserva } from "../../src/domain/Reserva.js";

// domain/Alojamiento.test.js

describe("Alojamiento class", () => {
	let anfitrion: Usuario;
	let direccion: Direccion;
	let alojamiento: Alojamiento;

	beforeEach(() => {
		const pais = new Pais("Argentina");
		const ciudad = new Ciudad("Buenos Aires", pais);
		direccion = new Direccion("Calle Falsa", 123, ciudad, -34, -58.3816);
		anfitrion = new Usuario("Gaspar", "gaspi845", TipoUsuario.ANFITRION);
		alojamiento = new Alojamiento(
			anfitrion,
			"Casa de Gaspi",
			"Casa de Gaspar",
			200,
			Moneda.DOLAR_USA,
			"14:00",
			"12:00",
			direccion,
			4
		);
	});

	test("should create an Alojamiento instance with correct properties", () => {
		expect(alojamiento.nombre).toBe("Casa de Gaspi");
		expect(alojamiento.descripcion).toBe("Casa de Gaspar");
		expect(alojamiento.precioPorNoche).toBe(200);
		expect(alojamiento.moneda).toBe(Moneda.DOLAR_USA);
		expect(alojamiento.direccion).toBe(direccion);
		expect(alojamiento.cantHuespedesMax).toBe(4);
	});

	test("should add a characteristic to the Alojamiento", () => {
		alojamiento.agregarCaracteristica(Caracteristica.WIFI);
		expect(alojamiento.tenesCaracteristica(Caracteristica.WIFI)).toBe(true);
		expect(alojamiento.tenesCaracteristica(Caracteristica.PISCINA)).toBe(
			false
		);
	});

	test("should check if the price is within a range", () => {
		expect(alojamiento.tuPrecioEstaDentroDe(100, 300)).toBe(true);
		expect(alojamiento.tuPrecioEstaDentroDe(300, 400)).toBe(false);
	});

	test("should check if it has a specific characteristic", () => {
		alojamiento.agregarCaracteristica(Caracteristica.PISCINA);
		expect(alojamiento.tenesCaracteristica(Caracteristica.PISCINA)).toBe(
			true
		);
		expect(alojamiento.tenesCaracteristica(Caracteristica.WIFI)).toBe(
			false
		);
	});

	test("should check if it can accommodate a certain number of guests", () => {
		expect(alojamiento.puedenAlojarse(3)).toBe(true);
		expect(alojamiento.puedenAlojarse(5)).toBe(false);
	});

	test("should add a reservation to the Alojamiento", () => {
		const huesped = new Usuario(
			"Huesped 1",
			"mailhuesped",
			TipoUsuario.HUESPED
		);
		const rangoFechas = new RangoFechas(
			new Date("2025-10-01"),
			new Date("2025-10-05")
		);
		const reserva = new Reserva(
			huesped,
			2,
			alojamiento,
			rangoFechas,
			EstadoReserva.PENDIENTE,
			200
		);

		alojamiento.agregarReserva(reserva);
		expect(alojamiento.reservas).toContain(reserva);
	});

	test("should return confirmed reservations", () => {
		const huesped = new Usuario(
			"Huesped 1",
			"mailhuesped",
			TipoUsuario.HUESPED
		);
		const rangoFechas = new RangoFechas(
			new Date("2025-10-01"),
			new Date("2025-10-05")
		);
		const reserva1 = new Reserva(
			huesped,
			2,
			alojamiento,
			rangoFechas,
			EstadoReserva.CONFIRMADA,
			200
		);
		const reserva2 = new Reserva(
			huesped,
			2,
			alojamiento,
			rangoFechas,
			EstadoReserva.PENDIENTE,
			200
		);

		alojamiento.agregarReserva(reserva1);
		alojamiento.agregarReserva(reserva2);

		const confirmedReservations = alojamiento.reservasConfirmadas();
		expect(confirmedReservations).toContain(reserva1);
		expect(confirmedReservations).not.toContain(reserva2);
	});

	test("should check availability for a date range", () => {
		const huesped = new Usuario(
			"Huesped 1",
			"mailhuesped",
			TipoUsuario.HUESPED
		);
		const rangoFechas1 = new RangoFechas(
			new Date("2025-10-01"),
			new Date("2025-10-05")
		);
		const rangoFechas2 = new RangoFechas(
			new Date("2025-10-06"),
			new Date("2025-10-10")
		);
		const reserva = new Reserva(
			huesped,
			2,
			alojamiento,
			rangoFechas2,
			EstadoReserva.CONFIRMADA,
			200
		);

		alojamiento.agregarReserva(reserva);

		expect(alojamiento.estasDisponibleEn(rangoFechas2)).toBe(false);
		expect(alojamiento.estasDisponibleEn(rangoFechas1)).toBe(true);
	});
});

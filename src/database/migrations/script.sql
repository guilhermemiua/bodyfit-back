-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.1
-- PostgreSQL version: 10.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: new_database | type: DATABASE --
-- -- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- -- ddl-end --
-- 

-- object: "bodyfit-bd" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "bodyfit-bd" CASCADE;
CREATE SCHEMA "bodyfit-bd";
-- ddl-end --
-- ALTER SCHEMA "bodyfit-bd" OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,"bodyfit-bd";
-- ddl-end --

-- object: "bodyfit-bd".bodybuilder | type: TABLE --
-- DROP TABLE IF EXISTS "bodyfit-bd".bodybuilder CASCADE;
CREATE TABLE "bodyfit-bd".bodybuilder(
	id serial NOT NULL,
	name varchar(100) NOT NULL,
	cpf varchar(45) NOT NULL,
	birth_date date NOT NULL,
	status boolean NOT NULL DEFAULT false,
	last_paid date,
	phone varchar(45) NOT NULL,
	code varchar(45) NOT NULL,
	CONSTRAINT bodybuilder_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE "bodyfit-bd".bodybuilder OWNER TO postgres;
-- ddl-end --

-- object: "bodyfit-bd".instructor | type: TABLE --
-- DROP TABLE IF EXISTS "bodyfit-bd".instructor CASCADE;
CREATE TABLE "bodyfit-bd".instructor(
	id serial NOT NULL,
	name varchar(100) NOT NULL,
	cpf varchar(45) NOT NULL,
	birth_date date NOT NULL,
	cref varchar(45) NOT NULL,
	code varchar(45) NOT NULL,
	CONSTRAINT instructor_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE "bodyfit-bd".instructor OWNER TO postgres;
-- ddl-end --

-- object: "bodyfit-bd".evaluation | type: TABLE --
-- DROP TABLE IF EXISTS "bodyfit-bd".evaluation CASCADE;
CREATE TABLE "bodyfit-bd".evaluation(
	id serial NOT NULL,
	date_time timestamp NOT NULL,
	id_bodybuilder integer NOT NULL,
	CONSTRAINT evaluation_pk PRIMARY KEY (id,date_time)

);
-- ddl-end --
-- ALTER TABLE "bodyfit-bd".evaluation OWNER TO postgres;
-- ddl-end --

-- object: "bodyfit-bd".workout | type: TABLE --
-- DROP TABLE IF EXISTS "bodyfit-bd".workout CASCADE;
CREATE TABLE "bodyfit-bd".workout(
	id serial NOT NULL,
	id_bodybuilder integer NOT NULL,
	id_instructor integer NOT NULL,
	id_intensity integer NOT NULL,
	CONSTRAINT circuit_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE "bodyfit-bd".workout OWNER TO postgres;
-- ddl-end --

-- object: "bodyfit-bd".exercise | type: TABLE --
-- DROP TABLE IF EXISTS "bodyfit-bd".exercise CASCADE;
CREATE TABLE "bodyfit-bd".exercise(
	id serial NOT NULL,
	name varchar(45) NOT NULL,
	CONSTRAINT exercise_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE "bodyfit-bd".exercise OWNER TO postgres;
-- ddl-end --

-- object: "bodyfit-bd".monthly_charge | type: TABLE --
-- DROP TABLE IF EXISTS "bodyfit-bd".monthly_charge CASCADE;
CREATE TABLE "bodyfit-bd".monthly_charge(
	id serial NOT NULL,
	due_date date NOT NULL,
	value decimal(5,2) NOT NULL,
	paid boolean NOT NULL DEFAULT false,
	id_bodybuilder integer NOT NULL,
	CONSTRAINT monthly_charge_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE "bodyfit-bd".monthly_charge OWNER TO postgres;
-- ddl-end --

-- object: "bodyfit-bd".intensity | type: TABLE --
-- DROP TABLE IF EXISTS "bodyfit-bd".intensity CASCADE;
CREATE TABLE "bodyfit-bd".intensity(
	id serial NOT NULL,
	name varchar(45),
	CONSTRAINT intensity_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE "bodyfit-bd".intensity OWNER TO postgres;
-- ddl-end --

-- object: bodybuilder_fk | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".monthly_charge DROP CONSTRAINT IF EXISTS bodybuilder_fk CASCADE;
ALTER TABLE "bodyfit-bd".monthly_charge ADD CONSTRAINT bodybuilder_fk FOREIGN KEY (id_bodybuilder)
REFERENCES "bodyfit-bd".bodybuilder (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: bodybuilder_fk | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".workout DROP CONSTRAINT IF EXISTS bodybuilder_fk CASCADE;
ALTER TABLE "bodyfit-bd".workout ADD CONSTRAINT bodybuilder_fk FOREIGN KEY (id_bodybuilder)
REFERENCES "bodyfit-bd".bodybuilder (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: workout_uq | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".workout DROP CONSTRAINT IF EXISTS workout_uq CASCADE;
ALTER TABLE "bodyfit-bd".workout ADD CONSTRAINT workout_uq UNIQUE (id_bodybuilder);
-- ddl-end --

-- object: bodybuilder_fk | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".evaluation DROP CONSTRAINT IF EXISTS bodybuilder_fk CASCADE;
ALTER TABLE "bodyfit-bd".evaluation ADD CONSTRAINT bodybuilder_fk FOREIGN KEY (id_bodybuilder)
REFERENCES "bodyfit-bd".bodybuilder (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: evaluation_uq | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".evaluation DROP CONSTRAINT IF EXISTS evaluation_uq CASCADE;
ALTER TABLE "bodyfit-bd".evaluation ADD CONSTRAINT evaluation_uq UNIQUE (id_bodybuilder);
-- ddl-end --

-- object: instructor_fk | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".workout DROP CONSTRAINT IF EXISTS instructor_fk CASCADE;
ALTER TABLE "bodyfit-bd".workout ADD CONSTRAINT instructor_fk FOREIGN KEY (id_instructor)
REFERENCES "bodyfit-bd".instructor (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: intensity_fk | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".workout DROP CONSTRAINT IF EXISTS intensity_fk CASCADE;
ALTER TABLE "bodyfit-bd".workout ADD CONSTRAINT intensity_fk FOREIGN KEY (id_intensity)
REFERENCES "bodyfit-bd".intensity (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: "bodyfit-bd".card | type: TABLE --
-- DROP TABLE IF EXISTS "bodyfit-bd".card CASCADE;
CREATE TABLE "bodyfit-bd".card(
	id serial NOT NULL,
	series integer NOT NULL,
	repetition integer NOT NULL,
	weight decimal(5,2) NOT NULL,
	id_exercise integer NOT NULL,
	id_workout integer NOT NULL,
	CONSTRAINT card_pk PRIMARY KEY (id)

);
-- ddl-end --

-- object: exercise_fk | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".card DROP CONSTRAINT IF EXISTS exercise_fk CASCADE;
ALTER TABLE "bodyfit-bd".card ADD CONSTRAINT exercise_fk FOREIGN KEY (id_exercise)
REFERENCES "bodyfit-bd".exercise (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: workout_fk | type: CONSTRAINT --
-- ALTER TABLE "bodyfit-bd".card DROP CONSTRAINT IF EXISTS workout_fk CASCADE;
ALTER TABLE "bodyfit-bd".card ADD CONSTRAINT workout_fk FOREIGN KEY (id_workout)
REFERENCES "bodyfit-bd".workout (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --



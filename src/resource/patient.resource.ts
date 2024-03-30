import { Request, Response } from 'express';
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';
import { Code } from '../enum/http-code.enum';
import { connection } from '../config/mysql.config';
import { QUERY } from '../query/patient.query';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/http-status.enum';
import { Patient } from '../interfaces/patient';
import { Pool } from 'mysql2/promise';
import { P } from 'pino';

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];

export const getPatients = async (req: Request, res: Response): Promise<Response<HttpResponse<Patient[]>>> => {
	console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

	try {
		const pool = await connection();
		const result: ResultSet = await pool.query(QUERY.SELECT_PATIENTS);

		return res.status(Code.OK)
			.send(new HttpResponse(Code.OK, Status.OK, 'Patients retrieved successfully', result[0]))

	} catch (error: unknown) {
		console.log(error);
		return res.status(Code.INTERNAL_SERVER_ERROR)
			.send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
	}
}

export const getPatient = async (req: Request, res: Response): Promise<Response<HttpResponse<Patient>>> => {
	console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

	try {
		const pool = await connection();
		const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patinetId])

		if ((result[0] as Array<ResultSet>).length > 0) {
			return res.status(Code.OK)
				.send(new HttpResponse(Code.OK, Status.OK, 'Patient retrieved', result[0]));
		} else {
			return res.status(Code.NOT_FOUND)
				.send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Patient not found.'))
		}

	} catch (error: unknown) {
		console.error(error);
		return res.status(Code.INTERNAL_SERVER_ERROR)
			.send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
	}
}

export const createPatient = async (req: Request, res: Response): Promise<Response<HttpResponse<Patient>>> => {
	console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

	try {
		const pool = await connection();
		const patientData: Patient = { ...req.body };

		const emailExists = await _checkPatientEmailExists(pool, patientData.email);

		if (emailExists) {
			return res.status(Code.CONFLICT)
				.send(new HttpResponse(Code.CONFLICT, Status.CONFLICT, 'A patient with the same email already exists'));
		}

		const result: any = pool.query(QUERY.CREATE_PATIENT_PROCEDURE, Object.values(patientData));

		return res.status(Code.OK)
			.send(new HttpResponse(Code.CREATED, Status.CREATED, 'Patient created', patientData));

	} catch (error: unknown) {
		console.error(error);
		return res.status(Code.INTERNAL_SERVER_ERROR)
			.send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
	}
}

export const updatePatient = async (req: Request, res: Response): Promise<Response<HttpResponse<Patient>>> => {
	console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
	let patientData: Patient = { ...req.body };

	try {
		const pool = await connection();
		const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);

		if ((result[0] as Array<ResultSet>).length > 0) {
			await pool.query(QUERY.UPDATE_PATIENT, [...Object.values(patientData)])
			return res.status(Code.OK)
				.send(new HttpResponse(Code.OK, Status.OK, "Patient updated succesfully", { ...patientData, patient_id: req.params.patientId }));
		
		} else {
			return res.status(Code.NOT_FOUND)
				.send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Patient not found'));
		}

	} catch (error: unknown) {
		console.error(error);
		return res.status(Code.INTERNAL_SERVER_ERROR)
      		.send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  	}
}

export const deletePatient = async (req: Request, res: Response): Promise<Response<HttpResponse<Patient>>> => {
	console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
	
	try {
		const pool = await connection();
		const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
		
		if ((result[0] as Array<ResultSet>).length > 0) {
			const result: ResultSet = await pool.query(QUERY.DELETE_PATIENT, [req.params.patientId]);
			return res.status(Code.OK)
        		.send(new HttpResponse(Code.OK, Status.OK, 'Patient deleted'));
    	
		} else {
			return res.status(Code.NOT_FOUND)
        		.send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Patient not found'));
		}

	} catch (error: unknown) {
		console.error(error);
		return res.status(Code.INTERNAL_SERVER_ERROR)
			.send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
	}
}	

const _checkPatientEmailExists = async (pool: Pool, email: string): Promise<boolean> => {
	const existingPatientCount: any = await pool.query(QUERY.CHECK_PATIENT_EXISTS_BY_EMAIL, [email])
	return existingPatientCount[0].length > 0;
}

import { Request, Response } from 'express';
import { Code } from '../enum/http-code.enum';
import { connection } from '../config/mysql.config';
import { QUERY } from '../query/patient.query';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/http-status.enum';
import { Patient } from '../interfaces/patient';


export const getPatients = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  
	try {
		const pool = await connection();
		const result: any = await pool.query(QUERY.SELECT_PATIENTS);
		
		return res.status(Code.OK)
			.send(new HttpResponse(Code.OK, Status.OK, 'Patients retrieved successfully', result[0]))
	
	} catch (error: unknown) {
			
		console.log(error);

		return res.status(Code.INTERNAL_SERVER_ERROR)
			.send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
}
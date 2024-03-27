import database from '../config/mysql.config';
import { Patient } from '../interfaces/patient';
import QUERY from '../query/patient.query';


/**
 * Service function to fetch all patients from the database.
 * @returns Promise resolving to an array of patients.
 */
export async function getPatients(): Promise<Patient[]> {
	return new Promise((resolve, reject) => {
		database.query(QUERY.SELECT_PATIENTS, (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}

/**
 * Service function to fetch a patient by their ID.
 * @param patientId ID of the patient to fetch.
 * @returns Promise resolving to the fetched patient.
 */
export async function getPatient(patientId: number): Promise<Patient> {
	return new Promise((resolve, reject) => {
		database.query(QUERY.SELECT_PATIENT, [patientId], (error, results) => {
			if (error) {
				reject(error);
			} else if (!results[0]) {
				reject(new Error(`Patient with ID ${patientId} not found`));
			} else {
				resolve(results[0]);
			}
		});
	});
}

/**
 * Service function to create a new patient.
 * @param data Data of the patient to be created.
 * @returns Promise resolving to the created patient.
 */
export async function createPatient(data: Patient): Promise<Patient> {
	return new Promise((resolve, reject) => {
		database.query(QUERY.CREATE_PATIENT_PROCEDURE, Object.values(data), (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results[0][0]);
			}
		});
	});
}

/**
 * Service function to update a patient.
 * @param patientId ID of the patient to update.
 * @param data Updated data for the patient.
 * @returns Promise resolving to the updated patient.
 */
export async function updatePatient(patientId: number, data: Patient): Promise<Patient> {
	return new Promise((resolve, reject) => {
		database.query(QUERY.UPDATE_PATIENT, [...Object.values(data), patientId], (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve({ patientId, ...data });
			}
		});
	});
}

/**
 * Service function to delete a patient.
 * @param patientId ID of the patient to delete.
 * @returns Promise resolving to the result of the deletion operation.
 */
export async function deletePatient(patientId: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		database.query(QUERY.DELETE_PATIENT, [patientId], (error, results) => {
      if (error) {
				reject(error);
			} else if (results.affectedRows === 0) {
				reject(new Error(`Patient with ID ${patientId} not found`));
			}  else {
        resolve(true);
			}
    });
  });
}

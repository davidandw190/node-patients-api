import database from '../config/mysql.config';
import QUERY from '../query/patient.query';
import Patient from '../domain/patient';


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

export async function getPatient(id: number): Promise<Patient> {
	return new Promise((resolve, reject) => {
		database.query(QUERY.SELECT_PATIENT, [id], (error, results) => {
			if (error) {
				reject(error);
			} else if (!results[0]) {
				reject(new Error(`Patient with ID ${id} not found`));
			} else {
				resolve(results[0]);
			}
		});
	});
}

/**
 * Service function to create a new patient.
 * @param patientData Data of the patient to be created.
 * @returns Promise resolving to the created patient.
 */
export async function createPatient(patientData: any): Promise<Patient> {
	return new Promise((resolve, reject) => {
		database.query(QUERY.CREATE_PATIENT_PROCEDURE, Object.values(patientData), (error, results) => {
			if (error) {
        reject(error);
      } else {
        resolve(results[0][0]);
      }
		});
	});
}





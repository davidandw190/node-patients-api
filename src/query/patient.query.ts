export const QUERY = {
  SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created_at DESC LIMIT 100',
  SELECT_PATIENT: 'SELECT * FROM patients WHERE patient_id = ?',
  CREATE_PATIENT: 'INSERT INTO patients(first_name, last_name, email, phone, address, diagnosis, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
  UPDATE_PATIENT: 'UPDATE patients SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, diagnosis = ?, image_url = ? WHERE patient_id = ?',
  DELETE_PATIENT: 'DELETE FROM patients WHERE patient_id = ?',
  CREATE_PATIENT_PROCEDURE: 'CALL create_and_return(?, ?, ?, ?, ?, ?, ?)',
  QUERY_PATIENT_BY_EMAIL: 'SELECT * FROM patients WHERE email = ? LIMIT 1',
  CHECK_PATIENT_EXISTS_BY_EMAIL: 'SELECT COUNT(*) FROM patients WHERE email = ?',
};
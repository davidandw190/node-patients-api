CREATE DATABASE IF NOT EXISTS patientsdb;

USE patientsdb;

DROP TABLE IF EXISTS patients;

CREATE TABLE patients (
  patient_id  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name  VARCHAR(25)  NOT NULL,
  last_name   VARCHAR(25)  NOT NULL,
  email       VARCHAR(25)  NOT NULL,
  phone       VARCHAR(10)  DEFAULT NULL,
  address     VARCHAR(100) DEFAULT NULL,
  diagnosis   VARCHAR(255) DEFAULT NULL,
  image_url   VARCHAR(255) DEFAULT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (patient_id),
  CONSTRAINT UQ_Patients_Email UNIQUE (email)
);

DELIMITER //
CREATE PROCEDURE create_and_return(
        IN first_name VARCHAR(25), 
        IN last_name  VARCHAR(25), 
        IN email      VARCHAR(25), 
        IN phone      VARCHAR(10), 
        IN address    VARCHAR(100), 
        IN diagnosis  VARCHAR(255),
        IN image_url  VARCHAR(255)
)

BEGIN
  INSERT INTO patients(first_name, last_name, email, phone, address, diagnosis, image_url) 
  VALUES (first_name, last_name, email, phone, address, diagnosis, image_url);
  
  SET @PATIENT_ID = LAST_INSERT_ID();

  SELECT * FROM patients WHERE patient_id=@PATIENT_ID;
END //
DELIMITER ;
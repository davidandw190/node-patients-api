import { Router } from "express";
import { createPatient, deletePatient, getPatient, updatePatient } from "../resource/patient.resource";

export const patientRoutes = Router();

patientRoutes.route('/')
    .get(getPatient)
    .post(createPatient);

patientRoutes.route('/:patientId')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);
    
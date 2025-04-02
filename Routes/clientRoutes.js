import express from "express";
import clientController from "../Controllers/clientController.js";

const route = express.Router();

route.get('/:id/appointments', (req, res) => clientController.viewAppointmentHistory(req, res))

export default route
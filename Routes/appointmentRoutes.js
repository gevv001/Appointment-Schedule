import express from "express";
import appointmentController from "../Controllers/appointmentController.js";
const route = express.Router();

route.get('/', (req, res) => appointmentController.getAppointments(req,res))
route.post('/', (req, res) => appointmentController.scheduleAppointment(req, res))
route.put('/:id', (req, res) => appointmentController.rescheduleAppointment(req, res))
route.delete('/:id', (req, res) => appointmentController.cancelAppointment(req, res))

export default route
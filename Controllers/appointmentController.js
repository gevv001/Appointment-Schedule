import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appointmentDataPath = path.join(__dirname, '..', 'Data', 'appointments.json');

class AppointmentController {
    constructor() {
        this.appointments = this.readData(appointmentDataPath)
    }

    readData(path) {
        try {
            let data = fs.readFileSync(path, "utf-8")
            if (!data.length) {
                return [];
            }
            return JSON.parse(data)
        } catch (err) {
            console.error('Error reading file', err);
            return [];
        }
    }

    getAppointments(req, res) {

    }

    scheduleAppointment(req, res) {
        let newApp = req.body;

        if (!newApp.clientId || !newApp.providerId || !newApp.date || !newApp.time) {
            res.status(400).json({ "message": "Fields required" })
            return;
        }

        delete newApp.ID

        newApp.id = uuidv4();

        this.appointments.push(newApp);
        this.saveData(appointmentDataPath, this.appointments)

        res.status(201).json({ "message": "New appointment Created", "appointment": newApp})

    }

    rescheduleAppointment(req, res) {
        let id = (req.params.id).slice(1);
        console.log(id);
        
        
        let appIndex = this.appointments.findIndex(elem => elem.id == id);
        
        if (appIndex === -1) {
            res.status(404).json({"message": `No appointment under specified id: ${id}`})
            return;
        }

        let app = req.body;
        
        if (!app.date || !app.time) {
            res.status(400).json({"message": "Fields name and specialty required"})
            return;
        }

        this.appointments[appIndex] = {"id": id, ...app}
        
        this.saveData(appointmentDataPath, this.appointments)

        res.status(201).json({"message": "Fields updated", "appointment": this.appointments[appIndex]})
    }

    cancelAppointment(req, res) {
        let id = (req.params.id).slice(1);
        console.log(id);
        
        
        let appIndex = this.appointments.findIndex(elem => elem.id == id);
        
        if (appIndex === -1) {
            res.status(404).json({"message": `No provider under specified id: ${id}`})
            return;
        }

        delete this.appointments[appIndex]; //would be better with filter, but no time

        this.saveData(appointmentDataPath, this.appointments)

        res.status(204).json({"message": "Appointment canceled successfully"})
    }
}

export default {"appointmentController": new AppointmentController(), "appointmentPath": appointmentDataPath};
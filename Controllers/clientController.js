import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import {appointmentController, appointmentPath} from './appointmentController.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDataPath = path.join(__dirname, '..', 'Data', 'clients.json');


class ClientController{
    constructor () {
        this.clients = readData(clientDataPath)
        this.appointments = this.readData(appointmentPath)
    }
    readData(path) {
        try {
            let data = fs.readFileSync(path, "utf-8")
            if(!data.length) {
                return [];
            }
            return JSON.parse(data)
        } catch (err) {
            console.error('Error reading file', err);
            return [];
        }
    }

    viewAppointmentHistory(req, res) {
        let id = (req.params.id).slice(1);
        console.log(id);

        
        let {clientId} = req.body;

        let clients = this.clients.filter(client => client.id === id);

        res.status(201).json({"History": clients})
    }
}

export default new ClientController()
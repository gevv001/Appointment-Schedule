import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import {v4 as uuidv4} from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const providerDataPath = path.join(__dirname, '..', 'Data', 'providers.json');

class ProviderController{
    constructor() {
        this.providers = this.readData(providerDataPath);
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

    saveData(path, data) {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    } 

    getProviders(req, res) {
        res.send(this.providers);
    }

    postProviders(req, res) {
        let newProvider = req.body;

        if(!newProvider.name || !newProvider.specialty) {
            res.status(400).json({"message": "Fields name and specialty required"})
            return;
        }

        delete newProvider.ID

        newProvider.id = uuidv4();

        this.providers.push(newProvider);
        this.saveData(providerDataPath, this.providers)

        res.status(201).json({"message": "New provider Created", "ID": newProvider.id, "name": newProvider.name, "specialty": newProvider.specialty})
    }

    putProviders(req, res) {
        let id = (req.params.id).slice(1);
        console.log(id);
        
        
        let providerIndex = this.providers.findIndex(elem => elem.id == id);
        
        if (providerIndex === -1) {
            res.status(404).json({"message": `No provider under specified id: ${id}`})
            return;
        }

        let provider = req.body;
        console.log(provider);
        

        if (!provider.name || !provider.specialty) {
            res.status(400).json({"message": "Fields name and specialty required"})
            return;
        }
//a34326b8-edeb-4570-8546-0c0dffb13229

        this.providers[providerIndex] = {"id": id, ...provider}
        
        this.saveData(providerDataPath, this.providers)

        res.status(201).json({"message": "Fields updated", "ID": provider.id, "name": provider.name, "specialty": provider.specialty})
    }

    deleteProviders(req, res) {
        let id = (req.params.id).slice(1);
        console.log(id);
        
        
        let providerIndex = this.providers.findIndex(elem => elem.id == id);
        
        if (providerIndex === -1) {
            res.status(404).json({"message": `No provider under specified id: ${id}`})
            return;
        }

        delete this.providers[providerIndex]; //would be better with filter, but no time

        this.saveData(providerDataPath, this.providers)

        res.status(204).json({"message": "Provider deleted successfully"})
    }
}

export default new ProviderController()
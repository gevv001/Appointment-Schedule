import express from "express";
import providerController from "../Controllers/providerController.js";

const route = express.Router()

route.get('/', (req, res) => providerController.getProviders(req, res))
route.post('/', (req, res) => providerController.postProviders(req, res))
route.put('/:id', (req, res) => providerController.putProviders(req, res))
route.delete('/:id', (req, res) => providerController.deleteProviders(req, res))

export default route
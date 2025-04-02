import express from 'express';
import customerController from '../Controllers/customerController.js';

const route = express.Router();

route.get('/:id/transactions', (req,res) => customerController.viewTransactionHistory(req, res));

export default route;

Array.prototype.find()
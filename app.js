import express from 'express';
import dotenv from 'dotenv';
import appointmentRoute from './Routes/appointmentRoutes.js'
import clientRoute from './Routes/clientRoutes.js'
import providerRoute from './Routes/providerRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/appointments', appointmentRoute)
app.use('/clients', clientRoute)
app.use('/providers', providerRoute)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})



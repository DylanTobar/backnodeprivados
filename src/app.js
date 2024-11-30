import express from "express";
import morgan from "morgan";
// Import Routes
import vehiclesRoutes from "./routes/vehicles.routes.js"
import personRoutes from "./routes/person.routes.js"
import infoRoutes from "./routes/info.routes.js"
import authRoutes from "./routes/auth.routes.js"
import requestLocalRoutes from "./routes/localRequest.routes.js"
import requestExteriorRoutes from "./routes/exteriorRequest.routes.js"
import departmentRoutes from "./routes/department.routes.js"
import tripsRoutes from "./routes/trips.routes.js"
import voucherRoutes from "./routes/voucher.routes.js"

var cors = require('cors')
const app=express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())


//Use Routes
app.use('/api/vehicles',vehiclesRoutes);
app.use('/api/persons',personRoutes);
app.use('/api/info',infoRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/localRequest',requestLocalRoutes);
app.use('/api/exteriorRequest',requestExteriorRoutes);
app.use('/api/departments',departmentRoutes);
app.use('/api/trips',tripsRoutes);
app.use('/api/voucher',voucherRoutes);
app.use((req,res,next) => {
    res.status(404).json({
        message: 'Ruta invalida'
    })
})

export default app;
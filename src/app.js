import express from "express";
import morgan from "morgan";
// Import Routes
import proyectRoutes from "./routes/proyect.routes.js"
import authRoutes from "./routes/auth.routes.js"

var cors = require('cors')
const app=express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())


//Use Routes
app.use('/api/proyects',proyectRoutes);
app.use('/api/auth',authRoutes);
app.use((req,res,next) => {
    res.status(404).json({
        message: 'Ruta invalida'
    })
})

export default app;
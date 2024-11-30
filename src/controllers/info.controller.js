const InfoService = require("../services/info.service")

//TODO OBTENER TODOS LOS TIPOS
const getAllTypes= async(req,res) =>{
    try{
        const allTypes = await InfoService.getAllTypes();
        res.json({status: 'OK' , data: allTypes})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS TRABAJOS
const getAllJobs= async(req,res) =>{
    try{
        const allJobs = await InfoService.getAllJobs();
        res.json({status: 'OK' , data: allJobs})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS ESTATUS DE VEHICULOS
const getAllStatusForVehicles= async(req,res) =>{
    try{
        const allStatus = await InfoService.getAllStatusForVehicles();
        res.json({status: 'OK' , data: allStatus})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS ESTATUS DE PERSONAS
const getAllStatusForPersons= async(req,res) =>{
    try{
        const allStatus = await InfoService.getAllStatusForPersons();
        res.json({status: 'OK' , data: allStatus})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS ESTATUS DE SOLICITUDES
const getAllStatusForRequest= async(req,res) =>{
    try{
        const allStatus = await InfoService.getAllStatusForRequest();
        res.json({status: 'OK' , data: allStatus})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS ESTATUS DE VIAJES
const getAllStatusForTrips= async(req,res) =>{
    try{
        const allStatus = await InfoService.getAllStatusForTrips();
        res.json({status: 'OK' , data: allStatus})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS ROLES
const getAllRoles= async(req,res) =>{
    try{
        const allRoles = await InfoService.getAllRoles();
        res.json({status: 'OK' , data: allRoles})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getAllTypes,
    getAllJobs,
    getAllStatusForVehicles,
    getAllStatusForPersons,
    getAllStatusForRequest,
    getAllStatusForTrips,
    getAllRoles
}
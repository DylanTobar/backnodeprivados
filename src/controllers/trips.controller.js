const TripService = require("../services/trips.service")


//TODO OBTENER TODOS LOS VIAJES EXTERIORES
const getAllTrips= async(req,res) =>{
    let myUrl = new URL (process.env.URL+req.url)
    let option = myUrl.searchParams.get('value')
    let request = myUrl.searchParams.get('request')
    try{
        const allTrips = await TripService.getAllTrips(option, request);
        res.json({status: 'OK' , data: allTrips})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODOS LOS VIAJES EXTERIORES EN ESPERA
const getAllTripsOnHold= async(req,res) =>{
    try{
        const tripsOnHold = await TripService.getTripsOnHoldFromExteriorRequest();
        res.json({status: 'OK' , data: tripsOnHold})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER UN VIAJE
const getOneTrip= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const oneTrip =  await TripService.getOneTrip(id);
        if (oneTrip.status == 404) {
            res.status(404).json({data: oneTrip})
        }else{
            res.status(200).json({status: "OK", data: oneTrip})
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO CREAR UN VIAJE
const createNewTrip= async(req,res) =>{
    try{
        const Trip = {
            transp_request_local: req.body.transp_request_local,
            transp_request_exterior: req.body.transp_request_exterior,
            pilot: req.body.pilot,
            vehicle_plate: req.body.vehicle_plate,
            status: 6
        };
        const createdTrip = await TripService.createNewTrip(Trip);
        if (createdTrip.status == 400) {
            res.status(400).json({data: createdTrip})
        }else{
            res.status(201).json({status: "Creado Correctamente", data: createdTrip})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

//TODO ACTUALIZAR UN TRIP
const updateOneTrip= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }
    try{
        const Trip = {
            status: req.body.status,
            reason_rejected: req.body.reason_rejected
        };
        const updatedTrip = await TripService.updateOneTrip(id, Trip);
        if (updatedTrip.status == 400) {
            res.status(400).json({data: updatedTrip})
        }else{
            res.status(201).json({status: "Actualizado Correctamente", data: updatedTrip})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

//TODO OBTENER UN PASE DE SALID
const getOnePDF= async(req,res) =>{
    let myUrl = new URL (process.env.URL+req.url)
    let option = myUrl.searchParams.get('option')
    let request = myUrl.searchParams.get('request')
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const oneExitPass =  await TripService.getOnePDF(id, option, request);
        if (oneExitPass.status == 404) {
            res.status(404).json({data: oneExitPass})
        }else{
            res.status(200).json({status: "OK", data: oneExitPass})
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getAllTrips,
    getAllTripsOnHold,
    getOneTrip,
    createNewTrip,
    updateOneTrip,
    getOnePDF
}
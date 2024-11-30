const { v4: uuidv4 } = require('uuid');
const PersonService = require("../services/person.service")


//TODO OBTENER TODAS LOS PERSONAS
const getAllPersons= async(req,res) =>{
    try{
        const allPersons = await PersonService.getAllPersons();
        res.json({status: 'OK' , data: allPersons})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODAS LOS PERSONAS
const getAllPilots= async(req,res) =>{
    try{
        const allPersons = await PersonService.getAllPilots();
        res.json({status: 'OK' , data: allPersons})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER TODAS LOS PERSONAS
const getAllPilotsActives= async(req,res) =>{
    try{
        const dates = {
            initialDateOf: req.body.initialDateOf,
            finalDateTo: req.body.finalDateTo
        };
        const allPersons = await PersonService.getAllPilotsActives(dates);
        res.json({status: 'OK' , data: allPersons})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER UNA PERSONA
const getOnePerson= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const onePerson =  await PersonService.getOnePerson(id);
        if (onePerson.status == 404) {
            res.status(404).json({data: onePerson})
        }else{
            res.status(200).json({status: "OK", data: onePerson})
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

//TODO CREAR NUEVA PERSONA
const createNewPerson= async(req,res) =>{
    
    try{
        const person = {
            uuid: uuidv4(),
            fullname: req.body.fullname,
            job: req.body.job,
            phone: req.body.phone,
            dpi: req.body.dpi,
            nit: req.body.nit
        };
        const createdPerson = await PersonService.createNewPerson(person);
        if (createdPerson.status == 400) {
            res.status(400).json({data: createdPerson})
        }else{
            res.status(201).json({status: "Creado Correctamente", data: createdPerson})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

//TODO ACTUALIZAR UNA PERSONA
const updateOnePerson= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }

    try{
        const person = {
            fullname: req.body.fullname,
            job: req.body.job,
            phone: req.body.phone,
            dpi: req.body.dpi,
            nit: req.body.nit
        };
        const updatedPerson = await PersonService.updateOnePerson(id, person);
        if (updatedPerson.status == 400) {
            res.status(400).json({data: updatedPerson})
        }else{
            res.status(201).json({status: "Actualizado Correctamente", data: updatedPerson})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

//TODO ELIMINAR UNA PERSONA
const deleteOnePerson= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }
    try{
        const deletedPerson = await PersonService.deleteOnePerson(id);
        if (deletedPerson.status == 400) {
            res.status(400).json({data: deletedPerson})
        }else{
            res.status(204).json({status: "Eliminado Correctamente", data: deletedPerson})
        }
    }catch(error){
    
    }
}

export const methods = {
    getAllPersons,
    getAllPilots,
    getAllPilotsActives,
    getOnePerson,
    createNewPerson,
    updateOnePerson,
    deleteOnePerson,
}
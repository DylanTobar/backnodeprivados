
const ProyectService = require("../services/proyect.service")

const getAllProyects= async(req,res) =>{
    try{
        const allProyects = await ProyectService.getAllProyects();
        res.json({status: 'OK' , data: allProyects})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}
const createNewProyect= async(req,res) =>{
    
    try{

        const proyect = {
            idproyect: '',
            proyect_name: req.body.proyect_name,
            client_name: req.body.client_name,
            description: req.body.description,
            start_date: req.body.est_end_date,
            end_date: req.body.est_end_date,
            est_end_date: req.body.est_end_date,
            id_status: 1,
            assigned_to: 1,
        };

        const createdProyect = await ProyectService.createNewProyect(proyect);
        if (createdProyect.status == 400) {
            res.status(400).json({data: createdProyect})
        }else{
            res.status(201).json({status: "Creado Correctamente", data: createdProyect})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "Failed",data:{error: error?.message || error}})
    }
}

export const methods = {
    getAllProyects,
    createNewProyect,
}
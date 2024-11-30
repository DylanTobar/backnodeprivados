import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS TIPOS
const getAllTypes= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT idvtype,type_name 
        FROM vtype`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS TRABAJOS
const getAllJobs= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT id,job_name,description 
        FROM job`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS Estatus
const getAllStatusForVehicles= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT idstatus,status_name,description 
        FROM status 
        WHERE forVehicle = 1`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS Estatus
const getAllStatusForPersons= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT idstatus,status_name,description 
        FROM status 
        WHERE forPerson = 1`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS Estatus
const getAllStatusForRequest= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT idstatus,status_name,description 
        FROM status 
        WHERE forRequest = 1`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS Estatus
const getAllStatusForTrips= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT idstatus,status_name,description 
        FROM status 
        WHERE forTrips = 1`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS Estatus
const getAllRoles= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT idrol,rol,description 
        FROM rol`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getAllTypes,
    getAllJobs,
    getAllStatusForVehicles,
    getAllRoles,
    getAllStatusForPersons,
    getAllStatusForRequest,
    getAllStatusForTrips
}
const InfoStorage = require("../storage/info.storage")

//TODO OBTENER TODOS LOS TIPOS
const getAllTypes = async () => {
    try{
        const allTypes = await InfoStorage.getAllTypes();
        return allTypes;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS TRABAJOS
const getAllJobs = async () => {
    try{
        const allJobs = await InfoStorage.getAllJobs();
        return allJobs;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS ESTATUS DE VEHICULOS
const getAllStatusForVehicles = async () => {
    try{
        const allStatus = await InfoStorage.getAllStatusForVehicles();
        return allStatus;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS ESTATUS DE PERSONAS
const getAllStatusForPersons = async () => {
    try{
        const allStatus = await InfoStorage.getAllStatusForPersons();
        return allStatus;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS ESTATUS DE SOLICITUDES
const getAllStatusForRequest = async () => {
    try{
        const allStatus = await InfoStorage.getAllStatusForRequest();
        return allStatus;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS ESTATUS DE VIAJES
const getAllStatusForTrips = async () => {
    try{
        const allStatus = await InfoStorage.getAllStatusForTrips();
        return allStatus;
    } catch (error){
        throw error;
    }   
}


//TODO OBTENER TODOS LOS ROLES
const getAllRoles = async () => {
    try{
        const allRoles = await InfoStorage.getAllRoles();
        return allRoles;
    } catch (error){
        throw error;
    }   
}

module.exports = {
    getAllTypes,
    getAllJobs,
    getAllStatusForVehicles,
    getAllStatusForPersons,
    getAllStatusForRequest,
    getAllStatusForTrips,
    getAllRoles
}
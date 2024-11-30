const RequestStorage = require("../storage/localRequest.storage")

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async (option, status, created_by) => {
    try{
        let allRequests;
        switch (option) {
            case 'actives':
                allRequests = await RequestStorage.getAllRequestsActivesAndOnHold(status, created_by);
                break;
                case 'onHold':
                allRequests = await RequestStorage.getAllRequestsActivesAndOnHold(status, created_by);
                break;
            default:
                allRequests = await RequestStorage.getAllRequests(created_by);
                break;
        }
        return allRequests;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER UNA SOLICITYD
const getOneRequest = async (option, id) => {
    try {
        let oneRequest;
        switch (option) {
            case 'complete':
                oneRequest = await RequestStorage.getOneRequestComplete(id);
                break;
            default:
                oneRequest = await RequestStorage.getOneRequest(id);
                break;
        }
        return oneRequest
    } catch (error) {
        
    }
}

//TODO CREAR NUEVA SOLICITUD
const createNewRequest = async (newRequest) => {
    try {
        const createdRequest = await RequestStorage.createNewRequest(newRequest);
        return createdRequest;
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVO DETALLE DE SOLICITUD
const createNewDetailRequest = async (newDetailRequest) => {
    try {
        const createdDetailRequest = await RequestStorage.createNewDetailRequest(newDetailRequest);
        return createdDetailRequest;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UNA SOLICITUD
const updateOneRequest = async (id, Request) => {
    try {
        const updatedRequest = await RequestStorage.updateOneRequest(id, Request);
        return updatedRequest;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getAllRequests,
    getOneRequest,
    createNewRequest,
    createNewDetailRequest,
    updateOneRequest
}
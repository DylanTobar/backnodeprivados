const TripStorage = require("../storage/trips.storage")

//TODO OBTENER TODOS LOS VIAJES EXTERIORES
const getAllTrips = async (option, request) => {
    try{
        let allTrips;
        switch (option) {
            case 'actives':
                if (request == 'exterior') {
                    allTrips = await TripStorage.getAllTripsFromExteriorRequest();
                }else{
                    allTrips = await TripStorage.getAllTripsFromLocalRequest();
                }
                break;
                case 'onHold':
                    if (request == 'exterior') {
                        allTrips = await TripStorage.getTripsOnHoldFromExteriorRequest();
                    }else{
                        allTrips = await TripStorage.getTripsOnHoldFromLocalRequest();
                    }
                    break;
            default:
                return {
                    status: 404,
                    message: 'Valores incorrectos'
                };
        }
        return allTrips;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER UN TRIP
const getOneTrip = async (id) => {
    try {
        const oneTrip = await TripStorage.getOneTrip(id);
        return oneTrip
    } catch (error) {
        
    }
}

//TODO CREAR NUEVO TRIP
const createNewTrip = async (newTrip) => {
    try {
        const createdTrip = await TripStorage.createNewTrip(newTrip);
        return createdTrip;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UN TRIP
const updateOneTrip = async (id, Trip) => {
    try {
        const updatedTrip = await TripStorage.updateOneTrip(id, Trip);
        return updatedTrip;
    } catch (error) {
        throw error;
    }

}

//TODO OBTENER UN PASE DE SALIDA
const getOnePDF = async (id, option, request) => {
    try {
        let oneExitPass;
        switch (option) {
            case 'exitpass':
                oneExitPass = await TripStorage.getOneExitPass(id);
                break;
                case 'binnacle':
                        oneExitPass = await TripStorage.getOneBinnacle(id);
                break;
            default:
                return {
                    status: 404,
                    message: 'Valores incorrectos'
                };
        }
        return oneExitPass
    } catch (error) {
        
    }
}
module.exports = {
    getAllTrips,
    getOneTrip,
    createNewTrip,
    updateOneTrip,
    getOnePDF
}
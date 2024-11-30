const VehicleStorage = require("../storage/vehicles.storage")

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehicles = async (option) => {
    try{
        let allVehicles;
        switch (option) {
            case 'diesel':
                allVehicles = await VehicleStorage.getAllVehiclesDiesel();
                break;
                case 'regular':
                    allVehicles = await VehicleStorage.getAllVehiclesRegular();
                    break;
            default:
                allVehicles = await VehicleStorage.getAllVehicles();
                break;
        }
        return allVehicles;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehiclesActives = async (dates) => {
    try{
        const allVehicles = await VehicleStorage.getAllVehiclesActives(dates);
        return allVehicles;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER UN VEHICULO
const getOneVehicle = async (id) => {
    try {
        const oneVehicle = await VehicleStorage.getOneVehicle(id);
        return oneVehicle
    } catch (error) {
        
    }
}

//TODO OBTENER UN VEHICULO PARA EL VALE
const getOneVehicleForVoucher = async (id) => {
    try {
        const oneVehicle = await VehicleStorage.getOneVehicleForVoucher(id);
        return oneVehicle
    } catch (error) {
        
    }
}

//TODO CREAR NUEVO VEHICULO
const createNewVehicle = async (newVehicle) => {
    try {
        const createdVehicle = await VehicleStorage.createNewVehicle(newVehicle);
        return createdVehicle;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UN VEHICULO
const updateOneVehicle = async (id, vehicle) => {
    try {
        const updatedVehicle = await VehicleStorage.updateOneVehicle(id, vehicle);
        return updatedVehicle;
    } catch (error) {
        throw error;
    }

}

//TODO ELIMINAR UN VEHICULO
const deleteOneVehicle = async (id) => {
    try {
        const deletedVehicle = await VehicleStorage.deleteOneVehicle(id);
        return deletedVehicle;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVehicles,
    getAllVehiclesActives,
    getOneVehicle,
    getOneVehicleForVoucher,
    createNewVehicle,
    updateOneVehicle,
    deleteOneVehicle
}
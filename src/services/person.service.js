const PersonStorage = require("../storage/person.storage")

//TODO OBTENER TODAS LAS PERSONAS
const getAllPersons = async () => {
    try{
        const allPersons = await PersonStorage.getAllPersons();
        return allPersons;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODAS LAS PERSONAS
const getAllPilots = async () => {
    try{
        const allPersons = await PersonStorage.getAllPilots();
        return allPersons;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODAS LAS PERSONAS
const getAllPilotsActives = async (dates) => {
    try{
        const allPersons = await PersonStorage.getAllPilotsActives(dates);
        return allPersons;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER UNA PERSONA
const getOnePerson = async (id) => {
    try {
        const onePerson = await PersonStorage.getOnePerson(id);
        return onePerson
    } catch (error) {
        
    }
}

//TODO CREAR NUEVA PERSONA
const createNewPerson = async (newPerson) => {
    try {
        const createdPerson = await PersonStorage.createNewPerson(newPerson);
        return createdPerson;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UNA PERSONA
const updateOnePerson = async (id, person) => {
    try {
        const updatedPerson = await PersonStorage.updateOnePerson(id, person);
        return updatedPerson;
    } catch (error) {
        throw error;
    }

}

//TODO ELIMINAR UNA PERSONA
const deleteOnePerson = async (id) => {
    try {
        const deletedPerson = await PersonStorage.deleteOnePerson(id);
        return deletedPerson;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPersons,
    getAllPilots,
    getAllPilotsActives,
    getOnePerson,
    createNewPerson,
    updateOnePerson,
    deleteOnePerson
}
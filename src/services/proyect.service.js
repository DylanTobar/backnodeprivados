const ProyectStorage = require("../storage/proyect.storage")


const getAllProyects = async () => {
    try{
        const allProyects = await ProyectStorage.getAllProyects();
        return allProyects;
    } catch (error){
        throw error;
    }   
}
const createNewProyect = async (newProyect) => {
    try {
        const createdProyect = await ProyectStorage.createNewProyect(newProyect);
        console.log(newProyect);
        return createdProyect;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProyects,
    createNewProyect,
    
}
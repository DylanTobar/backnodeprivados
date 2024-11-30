const InfoDepartment = require("../storage/department.storage")

//TODO OBTENER TODOS LOS DEPARTAMENTOS
const getAllDepartments = async () => {
    try{
        const allDepartments = await InfoDepartment.getAllDepartments();
        return allDepartments;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS MUNICIPIOS
const getOneDepartment = async (id) => {
    try{
        const oneDepartment = await InfoDepartment.getOneDepartment(id);
        return oneDepartment;
    } catch (error){
        throw error;
    }   
}

module.exports = {
    getAllDepartments,
    getOneDepartment
}
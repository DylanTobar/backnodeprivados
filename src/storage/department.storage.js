const DB = require("./../database/departments.json");

//TODO OBTENER TODOS LOS DEPARTAMENTOS
const getAllDepartments= async () =>{
    try{
        return DB.departments;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS DEPARTAMENTOS
const getOneDepartment= async (id) =>{
    try{
        const result = DB.departments.find((department) => department.title === id);
        if (!result) {
            return {
            status: 404,
            message: 'No se encontro el departamento'
        };
        }else{
            return result;
        }
    }catch(error){
        throw error;
    }
}

module.exports = {
    getAllDepartments,
    getOneDepartment
}
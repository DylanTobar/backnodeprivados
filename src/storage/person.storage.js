import {getConnection} from "./../database/database";

//TODO OBTENER TODAS LAS PERSONAS
const getAllPersons= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT p.uuid,p.fullname,j.job_name,p.phone,p.dpi,p.nit,active,available 
        FROM person AS p 
        JOIN job As j
        WHERE p.job = j.id`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODAS LAS PERSONAS
const getAllPilots= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT uuid,fullname,phone,dpi,active,available 
        FROM person 
        WHERE job = 1`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODAS LAS PERSONAS
const getAllPilotsActives= async (dates) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT uuid,fullname,phone,dpi,active,available 
        FROM person 
        WHERE job = 1 AND active = 1 AND uuid NOT IN (
        SELECT T.pilot 
        FROM trips AS T 
        JOIN detail_local_request AS DLR ON DLR.id_local_request = T.transp_request_local
        WHERE T.status NOT LIKE 13 AND (
        (DLR.dateOf BETWEEN Date(?) AND Date(?)) OR
        (DLR.dateTo BETWEEN Date(?) AND Date(?)) OR
        (Date(?) BETWEEN DLR.dateOf AND DLR.dateTo) OR
        (Date(?) BETWEEN DLR.dateOf AND DLR.dateTo))
        UNION
        SELECT T.pilot 
        FROM trips AS T 
        JOIN detail_exterior_request AS DER ON DER.id_exterior_request = T.transp_request_exterior
        WHERE T.status NOT LIKE 13 AND (
        (DER.dateOf BETWEEN Date(?) AND Date(?)) OR
        (DER.dateTo BETWEEN Date(?) AND Date(?)) OR
        (Date(?) BETWEEN DER.dateOf AND DER.dateTo) OR
        (Date(?) BETWEEN DER.dateOf AND DER.dateTo))
        );`,[dates.initialDateOf, dates.finalDateTo, dates.initialDateOf, dates.finalDateTo, dates.initialDateOf, dates.finalDateTo, dates.initialDateOf, dates.finalDateTo, dates.initialDateOf, dates.finalDateTo, dates.initialDateOf, dates.finalDateTo])
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UNA PERSONA
const getOnePerson = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT uuid,fullname,job,phone,dpi,nit,active,available 
        FROM person 
        WHERE uuid = ?`, id);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro la persona'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVA PERSONA
const createNewPerson = async (newPerson) => {
    newPerson.active = 1,
    newPerson.availabale = 3
    try{
        const connection = await getConnection();
        const verifyPerson = await connection.query(`
        SELECT uuid 
        FROM person 
        WHERE uuid = ? `,newPerson.uuid);
        if (verifyPerson.length <= 0) {
            await connection.query(`
            INSERT INTO person (uuid,fullname,job,phone,dpi,nit,active,available) 
            VALUES (?,?,?,?,?,?,?,?)`,
            [newPerson.uuid,newPerson.fullname,newPerson.job,newPerson.phone,newPerson.dpi,newPerson.nit,newPerson.active, newPerson.availabale]);
            return {uuid: newPerson.uuid, 
                    fullname: newPerson.fullname,
                    job: newPerson.job,
                    phone: newPerson.phone,
                    dpi: newPerson.dpi,
                    nit: newPerson.nit};
        }else{
            return {
                status: 400,
                message: 'UUID ya existente'
            };
        }
    } catch(error)
    {
        throw error;
    }
}

//TODO ACTUALIZAR UNA PERSONA
const updateOnePerson = async (id, updatedPerson) => {
    try{
        const connection = await getConnection();
            const result = await connection.query(`
            UPDATE person 
            SET fullname = IFNULL(?, fullname), job = IFNULL(?, job), phone = IFNULL(?, phone), dpi = IFNULL(?, dpi), nit = IFNULL(?, nit) 
            WHERE uuid = ?`,
            [updatedPerson.fullname,updatedPerson.job,updatedPerson.phone,updatedPerson.dpi,updatedPerson.nit,id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'La persona no existe'
                };
            }
             const updated = await connection.query(`
             SELECT p.uuid,p.fullname,j.job_name,p.phone,p.dpi,p.nit,active,available 
             FROM person AS p JOIN job As j 
             WHERE p.job = j.id and uuid = ?`, id);
             return updated;
    } catch(error)
    {
        throw error;
    }
}

//TODO ELIMINAR UNA PERSONA
const deleteOnePerson = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        DELETE FROM person 
        WHERE uuid = ?`, id);
        if (result.affectedRows <= 0) {
            return {
                status: 400,
                message: 'La persona no existe'
            };
        }
        return {
            status: 204
        }
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
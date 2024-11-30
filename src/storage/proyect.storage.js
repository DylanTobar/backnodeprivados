import {getConnection} from "../database/database";


const getAllProyects= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        Select idproyect,proyect_name,client_name,start_date, s.status 
        FROM ha0klysawmthhq8w.proyect 
        inner JOIN ha0klysawmthhq8w.status AS s
        ON ha0klysawmthhq8w.proyect.id_status = s.idstatus; `)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

const createNewProyect = async (newProyect) => {
    newProyect.active = 1,
    newProyect.availabale = 3
    try{
        const connection = await getConnection();
        const verifyProyect = await connection.query(`
        SELECT proyect_name 
        FROM proyect 
        WHERE proyect_name = ? `,newProyect.proyect_name);
        if (verifyProyect.length <= 0) {
            await connection.query(`
            INSERT INTO proyect (idproyect,proyect_name,client_name,description,start_date,est_end_date,end_date,id_status,assigned_to) 
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [newProyect.idproyect,newProyect.proyect_name,newProyect.client_name,newProyect.description,newProyect.start_date,newProyect.est_end_date,newProyect.end_date,newProyect.id_status, newProyect.assigned_to]);
            return {idproyect: newProyect.idproyect, 
                proyect_name: newProyect.proyect_name, 
                client_name: newProyect.client_name,
                description: newProyect.description,
                start_date: newProyect.start_date,
                est_end_date: newProyect.est_end_date,
                end_date: newProyect.end_date,
                id_status: newProyect.id_status,
                assigned_to: newProyect.assigned_to
            };
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

module.exports = {
    getAllProyects,
    createNewProyect,
}
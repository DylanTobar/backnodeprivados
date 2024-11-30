import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehicles= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT  v.idVehicle, v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active 
        FROM vehicle AS v 
        JOIN vtype As t 
        JOIN status AS s 
        WHERE v.type = t.idvtype 
        AND v.status = s.idstatus 
        ORDER BY idVehicle asc`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehiclesDiesel= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT  v.idVehicle, v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active 
        FROM vehicle AS v 
        JOIN vtype As t 
        JOIN status AS s 
        WHERE v.type = t.idvtype 
        AND v.status = s.idstatus 
        AND v.gas = 'Diesel'
        ORDER BY idVehicle asc`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehiclesRegular= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT  v.idVehicle, v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active 
        FROM vehicle AS v 
        JOIN vtype As t 
        JOIN status AS s 
        WHERE v.type = t.idvtype 
        AND v.status = s.idstatus 
        AND v.gas = 'Regular'
        ORDER BY idVehicle asc`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}


//TODO OBTENER TODOS LOS VEHICULOS
const getAllVehiclesActives= async (dates) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT v.idVehicle,v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active,v.color,v.cylinders 
        FROM vehicle AS v 
        JOIN vtype As t 
        JOIN status AS s 
        WHERE v.type = t.idvtype 
        AND v.status = s.idstatus 
        AND v.status = 3 
        AND active = 1 
        AND v.idVehicle NOT IN (
        SELECT T.vehicle_plate 
        FROM trips AS T 
        JOIN detail_local_request AS DLR ON DLR.id_local_request = T.transp_request_local
        WHERE T.status NOT LIKE 13 AND (
        (DLR.dateOf BETWEEN Date(?) AND Date(?)) OR
        (DLR.dateTo BETWEEN Date(?) AND Date(?)) OR
        (Date(?) BETWEEN DLR.dateOf AND DLR.dateTo) OR
        (Date(?) BETWEEN DLR.dateOf AND DLR.dateTo))
        UNION
        SELECT T.vehicle_plate 
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

//TODO OBTENER UN VEHICULO
const getOneVehicle = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT idVehicle, vin,brand,model,plate,km,type,gas,status,active,cylinders,color 
        FROM vehicle 
        WHERE idVehicle = ?`, id);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro el vehiculo'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER UN VEHICULO PARA EL VALE
const getOneVehicleForVoucher = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT v.idVehicle, v.plate,v.brand,v.model,t.type_name,v.color 
        FROM vehicle AS v 
        JOIN vtype As t  
        WHERE v.type = t.idvtype 
        AND idVehicle = ?`, id);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro el vehiculo'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVO VEHICULO
const createNewVehicle = async (newVehicle) => {
        newVehicle.active = 1
    try{
        const connection = await getConnection();
        const verifyVehicle = await connection.query(`
        SELECT vin 
        FROM vehicle 
        WHERE vin = ? `,newVehicle.vin);
        if (verifyVehicle.length <= 0) {
            await connection.query(`
            INSERT INTO vehicle (vin,plate,type,cylinders,color,brand,model,km,gas,status,active) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [newVehicle.vin, newVehicle.plate, newVehicle.type,newVehicle.cylinders,newVehicle.color, newVehicle.brand, newVehicle.model, newVehicle.km, newVehicle.gas, newVehicle.status, newVehicle.active]);
            return {vin: newVehicle.vin, 
                    plate: newVehicle.plate,
                    type: newVehicle.type,
                    cylinders: newVehicle.cylinders,
                    color: newVehicle.color,
                    brand: newVehicle.brand,
                    model: newVehicle.model,
                    km: newVehicle.km,
                    gas: newVehicle.gas};
        }else{
            return {
                status: 400,
                message: 'Número de VIN existente'
            };
        }
    } catch(error)
    {
        throw error;
    }
}

//TODO ACTUALIZAR UN VEHICULO
const updateOneVehicle = async (id, updatedVehicle) => {
    try{
        const connection = await getConnection();
            const result = await connection.query(`
            UPDATE vehicle 
            SET vin = IFNULL (?, vin), plate = IFNULL(?, plate), type = IFNULL(?, type), brand = IFNULL(?, brand), model = IFNULL(?, model), km = IFNULL(?, km), gas = IFNULL(?, gas), status = IFNULL(?, status), active = IFNULL(?, active), cylinders = IFNULL(?, cylinders), color = IFNULL(?, color) 
            WHERE idVehicle = ?`,
            [updatedVehicle.vin, updatedVehicle.plate,updatedVehicle.type,updatedVehicle.brand,updatedVehicle.model,updatedVehicle.km, updatedVehicle.gas, updatedVehicle.status, updatedVehicle.active, updatedVehicle.cylinders, updatedVehicle.color, id]);
            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'El número de vehiculo no existe'
                };
            }
             const updated = await connection.query(`
             SELECT v.vin,v.brand,v.model,v.plate,v.km,t.type_name,v.gas,s.status_name,v.active,v.cylinders,v.color 
             FROM vehicle AS v 
             JOIN vtype As t 
             JOIN status AS s 
             WHERE v.type = t.idvtype 
             AND v.status = s.idstatus 
             AND idVehicle = ?`, id);
             return updated;

    } catch(error)
    {
        throw error;
    }
}

//TODO ELIMINAR UN VEHICULO
const deleteOneVehicle = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        DELETE FROM vehicle 
        WHERE idVehicle = ?`, id);
        if (result.affectedRows <= 0) {
            return {
                status: 400,
                message: 'El número de vehiculo no existe'
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
    getAllVehicles,
    getAllVehiclesDiesel,
    getAllVehiclesRegular,
    getAllVehiclesActives,
    getOneVehicle,
    getOneVehicleForVoucher,
    createNewVehicle,
    updateOneVehicle,   
    deleteOneVehicle
}
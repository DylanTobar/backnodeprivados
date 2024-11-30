import {getConnection} from "./../database/database";

//TODO OBTENER TODOS LOS VIAJES EXTERIORES
const getAllTripsFromExteriorRequest= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT t.idtrips,ER.requesting_unit,ER.commission_manager,ER.date_request,t.transp_request_exterior,P.fullname,V.plate,S.status_name, t.reason_rejected,
        (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, 
        (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date
        FROM trips as t
        JOIN exterior_request as ER 
        JOIN person as P 
        JOIN vehicle as V 
        JOIN status as S 
        WHERE pilot = P.uuid 
        AND vehicle_plate = V.idVehicle 
        AND t.status = S.idstatus 
        AND transp_request_exterior = ER.id 
        AND t.status IN (8,13)
        ORDER BY t.idtrips DESC `)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS VIAJES EXTERIORES EN ESPERA
const getTripsOnHoldFromExteriorRequest= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT t.idtrips,ER.requesting_unit,ER.commission_manager,ER.date_request,t.transp_request_exterior,P.fullname,V.plate,S.status_name, 
        (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, 
        (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date
		FROM trips as t 
		JOIN exterior_request as ER ON ER.id = transp_request_exterior
		JOIN person as P ON P.uuid = pilot
		JOIN vehicle as V ON V.idVehicle = vehicle_plate
		JOIN status as S ON S.idstatus = t.status
		WHERE t.status IN (6,11) 
		ORDER BY t.idtrips DESC`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS VIAJES LOCALES
const getAllTripsFromLocalRequest= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT t.idtrips,LR.applicantsName,LR.section,LR.date,t.transp_request_local,P.fullname,V.plate,S.status_name,t.reason_rejected,
        (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as latest_date, 
        (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_date
        FROM trips as t JOIN local_request as LR 
        JOIN person as P 
        JOIN vehicle as V 
        JOIN status as S 
        WHERE pilot = P.uuid 
        AND vehicle_plate = V.idVehicle 
        AND t.status = S.idstatus 
        AND transp_request_local = LR.id 
        AND t.status IN (8,13)
        ORDER BY t.idtrips desc`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER TODOS LOS VIAJES LOCALES EN ESPERA
const getTripsOnHoldFromLocalRequest= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT t.idtrips,LR.applicantsName,LR.section,LR.date,t.transp_request_local,P.fullname,V.plate,S.status_name, 
        (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as latest_date, 
        (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_date
        FROM trips as t 
        JOIN local_request as LR ON transp_request_local = LR.id 
        JOIN person as P ON P.uuid = pilot 
        JOIN vehicle as V ON V.idVehicle  = vehicle_plate 
        JOIN status as S ON S.idstatus = t.status   
        WHERE t.status IN (6,11)
        ORDER BY t.idtrips desc`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UN VIAJE
const getOneTrip = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        SELECT l.uuid,l.pilotName,l.plate,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status, DL.dateOf, DL.dateTo, DL.schedule, DL.destiny, DL.peopleNumber, DL.comission 
        FROM detail_local_request AS DL 
        JOIN local_request AS l 
        WHERE id_local_request = ?`, id);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro el viaje'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVO VIAJE
const createNewTrip = async (Trip) => {
    try{
        const connection = await getConnection();
        const request = await connection.query(`
            INSERT INTO trips (transp_request_local,transp_request_exterior,pilot,vehicle_plate,status) 
            VALUES (?,?,?,?,?)`,
            [Trip.transp_request_local,Trip.transp_request_exterior,Trip.pilot,Trip.vehicle_plate,Trip.status]);
            const idTrips = request.insertID
            const newExitPass = await connection.query(`
            INSERT INTO exit_pass (id_trips)
             VALUES (?)`, idTrips)
             return newExitPass;
    } catch(error)
    {
        throw error;
    }
}

//TODO ACTUALIZAR UN VIAJE
const updateOneTrip = async (id, updatedTrip) => {
    try{
        const connection = await getConnection();
            const result = await connection.query(`
            UPDATE trips 
            SET status = IFNULL(?, status), reason_rejected = IFNULL(?, reason_rejected)
            WHERE idtrips = ?`,
            [updatedTrip.status, updatedTrip.reason_rejected, id]);

            if (result.affectedRows === 0) {
                return {
                    status: 400,
                    message: 'El viaje no existe'
                };
            }
             return result;

    } catch(error)
    {
        throw error;
    }
}

//TODO OBTENER DATOS PARA EL PASE DE SALIDA
const getOneExitPass= async (id) =>{
    try{
        const connection = await getConnection();
        const status = await connection.query(`
                SELECT transp_request_local 
                FROM trips
                WHERE idtrips = ? `, id);
        let exteriorRequest, localRequest, data;
        if (!status[0].transp_request_local) {
            exteriorRequest = await connection.query(`
                Select EP.idexit_pass, V.brand, V.plate, V.km, VT.type_name, P.fullname, CONCAT(ER.id,' (Exterior)') as id, ER.requesting_unit,
                (SELECT MIN(DER.hour) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_hour,
                (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date,
                (SELECT MAX(DER.department) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as destinations
                From exit_pass AS EP
                JOIN trips AS T ON T.idtrips = EP.id_trips
                JOIN vehicle AS V ON V.idVehicle = T.vehicle_plate 
                JOIN person AS P ON P.uuid = T.pilot
                JOIN exterior_request AS ER ON ER.id = T.transp_request_exterior
                JOIN vtype AS VT ON VT.idvtype = V.type
                WHERE idexit_pass = ?`,id)

            data=JSON.parse(JSON.stringify(exteriorRequest))
        }else{
            localRequest = await connection.query(`
                Select EP.idexit_pass, V.brand, V.plate, V.km, VT.type_name, P.fullname, CONCAT(LR.id,' (Exterior)') as id, LR.section AS requesting_unit,
                (SELECT MIN(DLR.schedule) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_hour,
                (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_date,
                (SELECT MAX(DLR.destiny) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as destinations
                From exit_pass AS EP
                JOIN trips AS T ON T.idtrips = EP.id_trips
                JOIN vehicle AS V ON V.idVehicle = T.vehicle_plate 
                JOIN person AS P ON P.uuid = T.pilot
                JOIN local_request AS LR ON LR.id = T.transp_request_local
                JOIN vtype AS VT ON VT.idvtype = V.type
                WHERE idexit_pass = ?`,id)
            data=JSON.parse(JSON.stringify(localRequest))
        }
        
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER DATOS PARA EL PASE DE SALIDA
const getOneBinnacle= async (id) =>{
    try{
        const connection = await getConnection();
        const status = await connection.query(`
        SELECT transp_request_local 
        FROM trips
        WHERE idtrips = ? `, id);
        let exteriorRequest, localRequest, data;
        if (!status[0].transp_request_local) {
            exteriorRequest = await connection.query(`
            Select B.idbinnacle, P.fullname, V.brand, V.cylinders, V.plate, V.model, V.gas, V.km, VT.type_name, CONCAT(ER.id,' (Exterior)') as id, ER.phoneNumber,COALESCE( CONCAT(VR.idregular,' (Regular)'), CONCAT(VD.iddiesel,' (Diesel)')) AS idVoucher, COALESCE(VR.cost, VD.cost) AS cost,
			(SELECT MIN(DER.hour) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_hour,
            (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date,
            (SELECT MAX(DER.department) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as destinations
            From binnacle AS B
            JOIN trips AS T ON T.idtrips = B.id_trips
            LEFT JOIN voucher_regular AS VR ON T.voucher_regular = VR.idregular
			LEFT JOIN voucher_diesel AS VD ON T.voucher_diesel = VD.iddiesel
            JOIN vehicle AS V ON V.idVehicle = T.vehicle_plate 
            JOIN person AS P ON P.uuid = T.pilot
            JOIN exterior_request AS ER ON ER.id = T.transp_request_exterior
            JOIN vtype AS VT ON VT.idvtype = V.type
            WHERE idbinnacle = ?`,id)
            data=JSON.parse(JSON.stringify(exteriorRequest))
        }else{
            localRequest = await connection.query(`
            Select B.idbinnacle, P.fullname, V.brand, V.cylinders, V.plate, V.model, V.gas, V.km, VT.type_name, CONCAT(LR.id,' (Exterior)') as id, LR.phoneNumber,COALESCE( CONCAT(VR.idregular,' (Regular)'), CONCAT(VD.iddiesel,' (Diesel)')) AS idVoucher, COALESCE(VR.cost, VD.cost) AS cost,
            (SELECT MIN(DLR.schedule) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_hour,
            (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_date,
            (SELECT MAX(DLR.destiny) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as destinations
            From binnacle AS B
            JOIN trips AS T ON T.idtrips = B.id_trips
            LEFT JOIN voucher_regular AS VR ON T.voucher_regular = VR.idregular
			LEFT JOIN voucher_diesel AS VD ON T.voucher_diesel = VD.iddiesel
            JOIN vehicle AS V ON V.idVehicle = T.vehicle_plate 
            JOIN person AS P ON P.uuid = T.pilot
            JOIN local_request AS LR ON LR.id = T.transp_request_local
            JOIN vtype AS VT ON VT.idvtype = V.type
            WHERE idbinnacle = ?`,id)
            data=JSON.parse(JSON.stringify(localRequest))
        }
        return data;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getAllTripsFromExteriorRequest,
    getTripsOnHoldFromExteriorRequest,
    getAllTripsFromLocalRequest,
    getTripsOnHoldFromLocalRequest,
    getOneTrip,
    createNewTrip,
    updateOneTrip,
    getOneExitPass,
    getOneBinnacle
}
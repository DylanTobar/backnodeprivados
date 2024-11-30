import { getConnection } from "../database/database";

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async (created_by) => {
    try {
        const connection = await getConnection();
        let result;
        if (created_by == 'Admin') {
            result = await connection.query(`
            SELECT 	LR.id,LR.place,LR.date,LR.section,LR.applicantsName,LR.position,LR.phoneNumber,LR.observations,s.status_name, 
            (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_date, 
            (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as latest_date
            FROM local_request AS LR JOIN status AS s 
            WHERE status = s.idstatus 
            AND status != 6 
            ORDER BY LR.id desc`)
        }else{
            result = await connection.query(`
            SELECT 	LR.id,LR.place,LR.date,LR.section,LR.applicantsName,LR.position,LR.phoneNumber,LR.observations,s.status_name, 
            (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_date, 
            (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as latest_date
            FROM local_request AS LR JOIN status AS s 
            WHERE status = s.idstatus 
            AND status != 6 
            AND LR.created_by = ?
            ORDER BY LR.id desc`, created_by)
        }
        var data = JSON.parse(JSON.stringify(result))
        return data;
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequestsActivesAndOnHold = async (status, created_by) => {
    try {
        const connection = await getConnection();
        let result;
        if (created_by == 'Admin') {
            result = await connection.query(`
            SELECT LR.id,LR.place,LR.date,LR.section,LR.applicantsName,LR.position,LR.phoneNumber,LR.observations,s.status_name, 
            (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_date, 
            (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as latest_date
            FROM local_request AS LR JOIN status AS s 
            WHERE status = s.idstatus 
            AND LR.status = ?
            ORDER BY LR.id desc`, status)
        } else{
            result = await connection.query(`
            SELECT LR.id,LR.place,LR.date,LR.section,LR.applicantsName,LR.position,LR.phoneNumber,LR.observations,s.status_name, 
            (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as first_date, 
            (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = LR.id) as latest_date
            FROM local_request AS LR JOIN status AS s 
            WHERE status = s.idstatus 
            AND LR.status = ?
            AND LR.created_by = ?
            ORDER BY LR.id desc`, [status, created_by])
        }
        var data = JSON.parse(JSON.stringify(result))
        return data;
    } catch (error) {
        throw error;
    }
}


//TODO OBTENER UNA SOLICITUD
const getOneRequest = async (id) => {
    try {
        const connection = await getConnection();
        const status = await connection.query(`
        SELECT status 
        FROM local_request
        WHERE id = ? `, id);
        let request, detailRequest;
        if (status[0].status == 7) {
            request = await connection.query(`
            SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status,l.created_by, l.reason_rejected, V.idVehicle as plate ,P.uuid as pilotName, T.idtrips,
            (SELECT SUBSTRING_INDEX(GROUP_CONCAT(DLR.comission ORDER BY DLR.dateOf ASC SEPARATOR ', '), ',', 1) FROM detail_local_request DLR WHERE DLR.id_local_request = l.id) as first_objective,
            (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = l.id) as first_date, 
            (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = l.id) as latest_date,
            (SELECT GROUP_CONCAT(DLR.destiny SEPARATOR ', ') FROM detail_local_request DLR WHERE DLR.id_local_request = l.id) as destinations
            FROM local_request AS l 
            JOIN trips as T ON T.transp_request_local = l.id
            JOIN vehicle as V ON V.idVehicle = T.vehicle_plate 
            JOIN person as P ON P.uuid = T.pilot 
            WHERE l.id = ?`, id);
        }
        else {
            request = await connection.query(`
            SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status,l.created_by,l.reason_rejected,
            (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = l.id) as first_date, 
            (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = l.id) as latest_date
            FROM local_request AS l 
            WHERE l.id = ?`, id);
        }
            detailRequest = await connection.query(`
            SELECT DL.dateOf, DL.dateTo, DL.schedule, DL.destiny, DL.peopleNumber, DL.comission  
            FROM detail_local_request AS DL 
            JOIN local_request AS l 
            WHERE id_local_request = l.id and DL.id_local_request = ?`, id);
        if (request.length <= 0) {
            return {
                status: 404,
                message: 'No se encontro la Solicitud'
            };
        } else {
            return { request: request, detailRequest: detailRequest };
        }
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER UNA SOLICITUD
const getOneRequestComplete = async (id) => {
    try {
        const connection = await getConnection();
        const status = await connection.query(`
        SELECT status 
        FROM local_request
        WHERE id = ? `, id);
        let request, detailRequest;
        if (status[0].status == 7) {
            request = await connection.query(`
                SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status,l.created_by, l.reason_rejected, V.plate,P.fullname 
                FROM local_request AS l 
                JOIN trips as T ON T.transp_request_local = id
                JOIN vehicle as V ON V.idVehicle = T.vehicle_plate
                JOIN person as P ON P.uuid = T.pilot
                WHERE id = ?`, id);
        }
        else {
            request = await connection.query(`
                SELECT l.id,l.place,l.date,l.section,l.applicantsName,l.position,l.phoneNumber,l.observations,l.status,l.created_by,l.reason_rejected,
                (SELECT MIN(DLR.dateOf) FROM detail_local_request DLR WHERE DLR.id_local_request = l.id) as first_date, 
                (SELECT MAX(DLR.dateTo) FROM detail_local_request DLR WHERE DLR.id_local_request = l.id) as latest_date
                FROM local_request AS l 
                WHERE l.id = ?`, id);
        }
            detailRequest = await connection.query(`
                SELECT DL.dateOf, DL.dateTo, DL.schedule, DL.destiny, DL.peopleNumber, DL.comission  
                FROM detail_local_request AS DL 
                JOIN local_request AS l 
                WHERE DL.id_local_request = l.id and DL.id_local_request = ?`, id);
        if (request.length <= 0) {
            return {
                status: 404,
                message: 'No se encontro la Solicitud'
            };
        } else {
            return { request: request, detailRequest: detailRequest };
        }
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVA SOLICITUD
const createNewRequest = async (newRequest) => {
    newRequest.status = 6;
    try {
        const connection = await getConnection();
        const Request = await connection.query(`
        INSERT INTO local_request (place,date,section,applicantsName,position,phoneNumber,observations,status, reason_rejected, created_by) 
        VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [newRequest.place, newRequest.date, newRequest.section, newRequest.applicantsName, newRequest.position, newRequest.phoneNumber, newRequest.observations, newRequest.status, newRequest.reason_rejected, newRequest.created_by]);
        return Request.insertId
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEV0 DETALLE DE SOLICITUD
const createNewDetailRequest = async (newDetailRequest) => {
    try {
        const connection = await getConnection();
        const newDetail = await connection.query(`
        INSERT INTO detail_local_request (dateOf,dateTo,schedule,destiny,peopleNumber,comission,id_local_request) 
        VALUES (?,?,?,?,?,?,?)`,
            [newDetailRequest.dateOf, newDetailRequest.dateTo, newDetailRequest.schedule, newDetailRequest.destiny, newDetailRequest.peopleNumber, newDetailRequest.comission, newDetailRequest.id_local_request]);
        return newDetail;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UNA SOLICITUD
const updateOneRequest = async (id, updatedRequest) => {
    try {
        const connection = await getConnection();
        if (updatedRequest.status_request == 7) {
            const updated = await connection.query(`
            UPDATE local_request 
            SET status = IFNULL(?, status) 
            WHERE id = ?`,
                [updatedRequest.status_request, id]);
            const createTrips = await connection.query(`
            INSERT INTO trips(transp_request_local,pilot,vehicle_plate,status) 
            VALUES (?,?,?,?)`,
                [updatedRequest.transp_request_local, updatedRequest.pilot_name, updatedRequest.plate_vehicle, updatedRequest.status]);
                const idTrips = createTrips.insertId
                const newExitPass = await connection.query(`
            INSERT INTO exit_pass (id_trips)
            VALUES (?)`, idTrips)
                const newBinnacle = await connection.query(`
            INSERT INTO binnacle (id_trips)
            VALUES (?)`, idTrips)
            return { request: createTrips, updated: updated, exitPass: newExitPass, binnacle: newBinnacle };
        }
        const updated = await connection.query(`
            UPDATE local_request SET status = IFNULL(?, status), reason_rejected = IFNULL(?, reason_rejected)  
            WHERE id = ?`,
            [updatedRequest.status_request, updatedRequest.reason_rejected, id]);
        return updated;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllRequests,
    getAllRequestsActivesAndOnHold,
    getOneRequest,
    getOneRequestComplete,
    createNewRequest,
    createNewDetailRequest,
    updateOneRequest,
}
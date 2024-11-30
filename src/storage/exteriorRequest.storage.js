import { getConnection } from "../database/database";

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async (created_by) => {
    try {
        const connection = await getConnection();
        let result;
        if (created_by == 'Admin') {
            result = await connection.query(`
            SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,s.status_name,ER.reason_rejected, 
            (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date
            FROM exterior_request as ER
            JOIN status AS s 
            WHERE status_request = s.idstatus 
            AND status_request != 6 
            ORDER BY id desc`);
        } else{
            result = await connection.query(`
            SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,s.status_name,ER.reason_rejected, 
            (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date
            FROM exterior_request as ER
            JOIN status AS s 
            WHERE status_request = s.idstatus 
            AND status_request != 6 
            AND ER.created_by = ?
            ORDER BY id desc`, created_by);
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
            SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,s.status_name,ER.reason_rejected, 
            (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, 
            (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date,
            (SELECT GROUP_CONCAT(DER.department SEPARATOR ', ') FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as destinations
            FROM exterior_request as ER
            JOIN status AS s 
            WHERE status_request = s.idstatus 
            AND status_request = ?
            ORDER BY id desc`, status);
        } else{
            result = await connection.query(`
            SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,s.status_name,ER.reason_rejected, 
            (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, 
            (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date,
            (SELECT GROUP_CONCAT(DER.department SEPARATOR ', ') FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as destinations
            FROM exterior_request as ER
            JOIN status AS s 
            WHERE status_request = s.idstatus 
            AND status_request = ?
            AND ER.created_by = ?
            ORDER BY id desc`, [status,created_by]);
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
        SELECT status_request 
        FROM exterior_request
        WHERE id = ? `, id);
        let request, detailRequest;
        if (status[0].status_request == 7) {
            request = await connection.query(`
            SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,ER.status_request,ER.reason_rejected,ER.created_by,V.idVehicle as plate_vehicle,P.uuid as pilot_name, T.idtrips,
            (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, 
            (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date,
            (SELECT GROUP_CONCAT(DER.department SEPARATOR ', ') FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as destinations
            FROM exterior_request as ER
            JOIN trips as T ON T.transp_request_exterior = ER.id
            JOIN vehicle as V ON V.idVehicle = T.vehicle_plate 
            JOIN person as P ON P.uuid = T.pilot 
            WHERE ER.id = ?`, id);
        }
        else {
            request = await connection.query(`
            SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,ER.status_request,ER.reason_rejected,ER.created_by,
            (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, 
            (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date
            FROM exterior_request as ER
            WHERE id = ?`, id);
        }
            detailRequest = await connection.query(`
            SELECT DE.no, DE.number_people, DE.department, DE.municipality, DE.village, DE.dateOf, DE.dateTo , DE.hour 
            FROM detail_exterior_request AS DE 
            JOIN exterior_request AS e 
            WHERE id_exterior_request = e.id and DE.id_exterior_request = ?`, id);
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

//TODO OBTENER UNA SOLICITUD COMPLETA
const getOneRequestComplete = async (id) => {
    try {
        const connection = await getConnection();
        const status = await connection.query(`
        SELECT status_request 
        FROM exterior_request
        WHERE id = ? `, id);
        let request, detailRequest;
        if (status[0].status_request == 7) {
            request = await connection.query(`
            SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,ER.status_request,ER.reason_rejected,ER.created_by,V.plate,P.fullname 
            FROM exterior_request  as ER
            JOIN trips as T 
            JOIN vehicle as V 
            JOIN person as P 
            WHERE T.transp_request_exterior = id 
            AND T.vehicle_plate = V.idVehicle 
            AND T.pilot = P.uuid 
            AND ER.id = ?`, id);
        }
        else {
            request = await connection.query(`
            SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,ER.status_request,ER.reason_rejected,ER.created_by,
            (SELECT MAX(DER.dateTo) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as latest_date, 
            (SELECT MIN(DER.dateOf) FROM detail_exterior_request DER WHERE DER.id_exterior_request = ER.id) as first_date
            FROM exterior_request as ER
            WHERE id = ?`, id);
        }
            detailRequest = await connection.query(`
            SELECT DE.no, DE.number_people, DE.department, DE.municipality, DE.village, DE.dateOf, DE.dateTo , DE.hour 
            FROM detail_exterior_request AS DE 
            JOIN exterior_request AS e 
            WHERE id_exterior_request = e.id and DE.id_exterior_request = ?`, id);
        if (request.length <= 0) {
            return {
                status: 404,
                message: 'No se encontro la Solicitud'
            };
        } else {
            return { request: request, detailRequest: detailRequest };
        }
        request = await connection.query(`
        SELECT ER.id,ER.requesting_unit,ER.commission_manager,ER.date_request,ER.objective_request,ER.duration_days,ER.phoneNumber,ER.observations,ER.provide_fuel,ER.provide_travel_expenses,ER.status_request,ER.reason_rejected,ER.created_by,V.plate,P.fullname 
        FROM exterior_request  as ER
        JOIN trips as T 
        JOIN vehicle as V 
        JOIN person as P 
        WHERE T.transp_request_exterior = id 
        AND T.vehicle_plate = V.idVehicle 
        AND T.pilot = P.uuid 
        AND ER.id = ?`, id);
        detailRequest = await connection.query(`
        SELECT DE.no, DE.number_people, DE.department, DE.municipality, DE.village, DE.dateOf, DE.dateTo , DE.hour 
        FROM detail_exterior_request AS DE 
        JOIN exterior_request AS e 
        WHERE id_exterior_request = e.id and DE.id_exterior_request = ?`, id);
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
    try {
        const connection = await getConnection();
        const Request = await connection.query(`
        INSERT INTO exterior_request (requesting_unit,commission_manager,date_request,objective_request,duration_days,phoneNumber,observations,provide_fuel,provide_travel_expenses,status_request,reason_rejected,created_by) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [newRequest.requesting_unit, newRequest.commission_manager, newRequest.date_request, newRequest.objective_request, newRequest.duration_days, newRequest.phoneNumber, newRequest.observations, newRequest.provide_fuel, newRequest.provide_travel_expenses, newRequest.status_request, newRequest.reason_rejected, newRequest.created_by ]);
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
        INSERT INTO detail_exterior_request (no,number_people,department,municipality,village,dateOf,dateTo,hour,id_exterior_request) 
        VALUES (?,?,?,?,?,?,?,?,?)`,
            [newDetailRequest.no, newDetailRequest.number_people, newDetailRequest.department, newDetailRequest.municipality, newDetailRequest.village, newDetailRequest.dateOf, newDetailRequest.dateTo, newDetailRequest.hour, newDetailRequest.id_exterior_request]);
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
            UPDATE exterior_request 
            SET status_request = IFNULL(?, status_request) 
            WHERE id = ?`,
            [updatedRequest.status_request, id]);  
            const createTrips = await connection.query(`
            INSERT INTO trips(transp_request_exterior,pilot,vehicle_plate,status) 
            VALUES (?,?,?,?)`,
            [updatedRequest.transp_request_exterior,updatedRequest.pilot_name, updatedRequest.plate_vehicle, updatedRequest.status]);
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
            UPDATE exterior_request SET status_request = IFNULL(?, status_request), reason_rejected = IFNULL(?, reason_rejected) 
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
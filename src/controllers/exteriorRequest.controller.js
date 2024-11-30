const RequestService = require("../services/exteriorRequest.service")

//TODO OBTENER TODAS LAS SOLICITUDES
const getAllRequests = async (req, res) => {
    let myUrl = new URL (process.env.URL+req.url)
    let option = myUrl.searchParams.get('value')
    let status = myUrl.searchParams.get('status')
    let created_by = myUrl.searchParams.get('created_by')
    try {
        const allRequests = await RequestService.getAllRequests(option,status,created_by);
        res.json({ status: 'OK', data: allRequests })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

//TODO OBTENER UNA SOLICITUD
const getOneRequest = async (req, res) => {
    let myUrl = new URL (process.env.URL+req.url)
    let option = myUrl.searchParams.get('value')
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
        });
        return;
    }
    try {
        const oneRequest = await RequestService.getOneRequest(option, id);
        if (oneRequest.status == 404) {
            res.status(404).json({ data: oneRequest })
        } else {
            res.status(200).json({ status: "OK", data: oneRequest })
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

//TODO CREAR NUEVA SOLICITUD
const createNewRequest = async (req, res) => {
    let data = req.body;
    let detail = data.detail;
    try {
        const Request = {
            requesting_unit: data.requesting_unit,
            commission_manager: data.commission_manager,
            date_request: data.date_request,
            objective_request: data.objective_request,
            duration_days: data.duration_days,
            phoneNumber: data.phoneNumber,
            observations: data.observations,
            provide_fuel: data.provide_fuel,
            provide_travel_expenses: data.provide_travel_expenses,
            status_request: 6,
            reason_rejected: data.reason_rejected,
            created_by: data.created_by,
        };
        const createdRequest = await RequestService.createNewRequest(Request);

        const detailRequest = {
            no: "",
            number_people: "",
            department: "",
            municipality: "",
            village: "",
            dateOf: "",
            dateTo: "",
            hour: ""
        }

        for (let index = 0; index < detail.length; index++) {
            const element = detail[index];
            detailRequest.no = index + 1,
                detailRequest.number_people = element.number_people,
                detailRequest.department = element.department,
                detailRequest.municipality = element.municipality,
                detailRequest.village = element.village,
                detailRequest.dateOf = element.dateOf,
                detailRequest.dateTo = element.dateTo,
                detailRequest.hour = element.hour,
                detailRequest.id_exterior_request = createdRequest
            await RequestService.createNewDetailRequest(detailRequest);
        }

        if (createdRequest.status == 400) {
            res.status(400).json({ data: createdRequest })
        } else {
            res.status(201).json({ status: "Creado Correctamente", data: createdRequest })
        }

    } catch (error) {
        res.status(error?.status || 500)
        res.send({ status: "Failed", data: { error: error?.message || error } })
    }
}

//TODO ACTUALIZAR UNA SOLICITUD
const updateOneRequest = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
        });
        return;
    }

    try {
        const Request = {
            pilot_name: req.body.pilot_name,
            plate_vehicle: req.body.plate_vehicle,
            status_request: req.body.status_request,
            reason_rejected: req.body.reason_rejected,
            provide_fuel: req.body.provide_fuel,
            provide_travel_expenses: req.body.provide_travel_expenses,
            transp_request_exterior: parseInt(id),
            status: 6
        };
        const updatedRequest = await RequestService.updateOneRequest(id, Request);
        if (updatedRequest.status == 400) {
            res.status(400).json({ data: updatedRequest })
        } else {
            res.status(201).json({ status: "Actualizada Correctamente", data: updatedRequest })
        }

    } catch (error) {
        res.status(error?.status || 500)
        res.send({ status: "Failed", data: { error: error?.message || error } })
    }
}

export const methods = {
    getAllRequests,
    getOneRequest,
    createNewRequest,
    updateOneRequest,
}
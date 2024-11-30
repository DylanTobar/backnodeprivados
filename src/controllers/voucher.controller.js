const VoucherService = require("../services/voucher.service")

//TODO OBTENER TODOS LOS VALES
const getAllVouchersDiesel= async(req,res) =>{
    try{
        const allVouchers = await VoucherService.getAllVouchersDiesel();
        res.json({status: 'OK' , data: allVouchers})
    }catch(error){
        res.status(500);
        res.send({data: error.message});
    }
}

//TODO OBTENER TODOS LOS VALES
const getAllVouchersRegular= async(req,res) =>{
    try{
        const allVouchers = await VoucherService.getAllVouchersRegular();
        res.json({status: 'OK' , data: allVouchers})
    }catch(error){
        res.status(500);
        res.send({data: error.message});
    }
}

//TODO OBTENER UN VEHICULO
const getOneVoucherDiesel= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const oneVoucher =  await VoucherService.getOneVoucherDiesel(id);
        if (oneVoucher.status == 404) {
            res.status(404).json({data: oneVoucher})
        }else{
            res.status(200).json({status: "OK", data: oneVoucher})
        }
        
    }catch(error){
        res.status(500);
        res.send({data: error.message});
    }
}

//TODO OBTENER UN VEHICULO
const getOneVoucherRegular= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
          });
          return;
    }
    try{
        const oneVoucher =  await VoucherService.getOneVoucherRegular(id);
        if (oneVoucher.status == 404) {
            res.status(404).json({data: oneVoucher})
        }else{
            res.status(200).json({status: "OK", data: oneVoucher})
        }
        
    }catch(error){
        res.status(500);
        res.send({data: error.message});
    }
}


//TODO CREAR NUEVO VALE
const createNewVoucherDiesel= async(req,res) =>{
    
    try{
        const Voucher = {
            date: req.body.date,
            cost: req.body.cost,
            id_vehicle: req.body.idVehicle,
            comission_to: req.body.comission_to,
            objective: req.body.objective,
            id_pilot: req.body.id_pilot,
            km_to_travel: req.body.km_to_travel,
            idtrips: req.body.idtrips
        };
        const createdVoucher = await VoucherService.createNewVoucherDiesel(Voucher);
        if (createdVoucher.status == 400) {
            res.status(400).json({data: createdVoucher})
        }else{
            res.status(201).json({status: "OK", data: createdVoucher})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status:"FAILED",data:{error: error?.message || error}})
    }
}

//TODO CREAR NUEVO VALE
const createNewVoucherRegular= async(req,res) =>{
    try{
        const Voucher = {
            date: req.body.date,
            cost: req.body.cost,
            id_vehicle: req.body.idVehicle,
            comission_to: req.body.comission_to,
            objective: req.body.objective,
            id_pilot: req.body.id_pilot,
            km_to_travel: req.body.km_to_travel,
            idtrips: req.body.idtrips
        };
        const createdVoucher = await VoucherService.createNewVoucherRegular(Voucher);
        if (createdVoucher.status == 400) {
            res.status(400).json({data: createdVoucher})
        }else{
            res.status(201).json({status: "OK", data: createdVoucher})
        }
            
    }catch(error){
        res.status(error?.status || 500)
        res.send({status:"FAILED",data:{error: error?.message || error}})
    }
}

//TODO ACTUALIZAR UN VEHICULO
const updateOneVoucher= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }

    try{
        const Voucher = {
            plate: req.body.plate,
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            km: req.body.km,
            gas: req.body.gas,
            status: req.body.status,
            cylinders: req.body.cylinders,
            color: req.body.color,
            active: req.body.active
        };
        const updatedVoucher = await VouchersService.updateOneVoucher(id, Voucher);
        if (updatedVoucher.status == 400) {
            res.status(400).json({data: updatedVoucher})
        }else{
            res.status(201).json({status: "OK", data: updatedVoucher})
        }
    }catch(error){
        res.status(error?.status || 500)
        res.send({status: "FAILED",data:{error: error?.message || error}})
    }
}

//TODO ELIMINAR UN VEHICULO
const deleteOneVoucher= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }
    try{
        const deletedVoucher = await VouchersService.deleteOneVoucher(id);
        if (deletedVoucher.status == 400) {
            res.status(400).json({data: deletedVoucher})
        }else{
            res.status(204).json({status: "OK", data: deletedVoucher})
        }
    }catch(error){
    
    }
}

export const methods = {
    getAllVouchersDiesel,
    getAllVouchersRegular,
    getOneVoucherDiesel,
    getOneVoucherRegular,
    createNewVoucherRegular,
    createNewVoucherDiesel,
    updateOneVoucher,
    deleteOneVoucher,
}
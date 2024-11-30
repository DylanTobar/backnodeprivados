const VoucherStorage = require("../storage/voucher.storage")

//TODO OBTENER TODOS LOS VALES
const getAllVouchersDiesel = async () => {
    try{
        const allVouchers = await VoucherStorage.getAllVouchersDiesel();
        return allVouchers;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER TODOS LOS VALES
const getAllVouchersRegular = async () => {
    try{
        const allVouchers = await VoucherStorage.getAllVouchersRegular();
        return allVouchers;
    } catch (error){
        throw error;
    }   
}

//TODO OBTENER UN VALE
const getOneVoucherDiesel = async (id) => {
    try {
        const oneVoucher = await VoucherStorage.getOneVoucherDiesel(id);
        return oneVoucher
    } catch (error) {
        
    }
}

//TODO OBTENER UN VALE
const getOneVoucherRegular = async (id) => {
    try {
        const oneVoucher = await VoucherStorage.getOneVoucherRegular(id);
        return oneVoucher
    } catch (error) {
        
    }
}

//TODO CREAR NUEVO VALE REGULAR
const createNewVoucherDiesel = async (newVoucher) => {
    try {
        const createdVoucher = await VoucherStorage.createNewVoucherDiesel(newVoucher);
        return createdVoucher;
    } catch (error) {
        throw error;
    }
}

//TODO CREAR NUEVO VALE DIESEL
const createNewVoucherRegular = async (newVoucher) => {
    try {
        const createdVoucher = await VoucherStorage.createNewVoucherRegular(newVoucher);
        return createdVoucher;
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UN VEHICULO
const updateOneVoucher = async (id, Voucher) => {
    try {
        const updatedVoucher = await VoucherStorage.updateOneVoucher(id, Voucher);
        return updatedVoucher;
    } catch (error) {
        throw error;
    }

}

//TODO ELIMINAR UN VEHICULO
const deleteOneVoucher = async (id) => {
    try {
        const deletedVoucher = await VoucherStorage.deleteOneVoucher(id);
        return deletedVoucher;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVouchersDiesel,
    getAllVouchersRegular,
    getOneVoucherDiesel,
    getOneVoucherRegular,
    createNewVoucherDiesel,
    createNewVoucherRegular,
    updateOneVoucher,
    deleteOneVoucher
}
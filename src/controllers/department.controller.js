const DepartmentService = require("../services/department.service")

const getAllDepartments= async(req,res) =>{
    try{
        const allDepartments = await DepartmentService.getAllDepartments();
        res.json({status: 'OK' , data: allDepartments})
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getOneDepartment= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            error: { message: "ID no puede ir vacio" },
          });
          return;
        }
        try{
            const oneDepartment =  await DepartmentService.getOneDepartment(id);
            if (oneDepartment.status == 404) {
                res.status(404).json({data: oneDepartment})
            }else{
                res.status(200).json({status: "OK", data: oneDepartment})
            }
        }catch(error){
            res.status(500);
            res.send(error.message);
        }
}

export const methods = {
    getAllDepartments,
    getOneDepartment
}
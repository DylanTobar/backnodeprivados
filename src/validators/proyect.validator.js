const {check} = require('express-validator')
const {validateResult} = require ('../helper/validateHelper')

const validateCreateProyect = [
    check('proyect_name')
        .exists()
        .notEmpty(),
    
    (req,res,next) => {
        validateResult(req,res,next)
    }
]
module.exports = {
    validateCreateProyect
}
const {check} = require('express-validator')
const {validateResult} = require ('../helper/validateHelper')

const validateCreatePerson = [
    check('fullname')
        .exists()
        .notEmpty(),
    check('dpi')
        .exists()
        .notEmpty()
        .isNumeric()
        .isLength({min: 10, max: 15})
        .withMessage("Error en la cantidad de caracteres"),
    check('job') 
        .exists()
        .notEmpty(),
    check('phone')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('nit')
        .exists()
        .notEmpty(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]
module.exports = {
    validateCreatePerson
}
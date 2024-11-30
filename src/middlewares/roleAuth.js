const { verifySign } = require('../helper/handleJwt')
const AuthService = require("../services/auth.service")

const checkRole = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop() //TODO: ['Bearer','TOKEN']
        console.log(token)
        const verifyToken = verifySign(token);
        if (!verifyToken) {
            res.status(409)
            res.send({ error: 'Token invalid' })
        } else {
            const role = await AuthService.getOneRol(verifyToken.uuid)
            if ([].concat(roles).includes(role.rol_id)) {
                next()
            } else {
                res.status(409)
                res.send({ error: 'No tienes permisos' })
            }
        }
    } catch (e) {
        console.log('___Error auth___')
        res.status(409)
        res.send({ error: 'Algo sucedio en el middleware authRol' })
    }
}

module.exports = checkRole
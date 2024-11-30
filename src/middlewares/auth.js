const { verifySign } = require('../helper/handleJwt')

const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop() //TODO: ['Bearer','TOKEN']
        
        const verifyToken = verifySign(token);
        if (!verifyToken) {
            res.status(401)
            res.send({ error: 'Token invalid' })
        } else {
            next()
        }
    } catch (e) {
        res.status(401)
        res.send({ error: 'Algo sucedio con tu token de acceso' })
    }
}
module.exports = checkToken
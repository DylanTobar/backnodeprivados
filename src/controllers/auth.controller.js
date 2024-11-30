const { v4: uuidv4 } = require('uuid');
const { encrypt, compare } = require('../helper/handleBcrypt')
const { generateSign } = require('../helper/handleJwt')
const AuthService = require("../services/auth.service")

const loginUser = async (req, res) => {
    try {
        const { body } = req
        console.log(body);
        const detailUser = await AuthService.getOneUsername(body.username);
        const checkPassword = await compare(body.password, detailUser.password)
        console.log(checkPassword);
        if (!checkPassword) {
            const token = await generateSign(detailUser)
            res.send({
                data: {
                    status: "OK", data: {
                        username: detailUser.username,
                        rol: detailUser.rol
                    }
                },
                token
            })
        } else {
            res.status(400)
            res.send({ error: 'Contraseña Invalida' })
        }
    } catch (error) {
        res.status(error?.status || 500)
        res.send({ status: "Failed", data: { error: error?.message || error } })
    }
}

export const methods = {
    loginUser,
}
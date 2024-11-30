const jwt = require('jsonwebtoken')
require("dotenv").config();

const generateSign = (user) => {
    try {
        const token = jwt.sign(
            {
                uuid: user.uuid,
                rol_id: user.rol_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "4h"
            }
        )
        return token
    } catch (error) {
        console.log('__Algo fallo___', error)
        return null
    }
}

const verifySign = (token) => {
    try {
        const tokenVerify = jwt.verify(token, process.env.JWT_SECRET)
        return tokenVerify
    } catch (error) {
        console.log('__Algo fallo___', error)
        return null
    }
}

module.exports = { 
    generateSign, 
    verifySign 
}
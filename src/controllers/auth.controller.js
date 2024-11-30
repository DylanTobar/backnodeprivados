const { v4: uuidv4 } = require('uuid');
const { encrypt, compare } = require('../helper/handleBcrypt')
const { generateSign } = require('../helper/handleJwt')
const AuthService = require("../services/auth.service")

const loginUser = async (req, res) => {
    try {
        const { body } = req
        const detailUser = await AuthService.getOneUsername(body.username);
        const checkPassword = await compare(body.password, detailUser.password)
        if (checkPassword) {
            const token = await generateSign(detailUser)
            res.send({
                data: { status: "OK", data: {   username: detailUser.username,
                                                rol: detailUser.rol } },
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

const registerUser = async (req, res) => {
    try {
        const { body } = req
        const passwordHash = await encrypt(body.password)
        const newUser = {
            uuid: uuidv4(),
            username: body.username,
            password: passwordHash,
            rol_id: body.rol_id,
            uuidPerson: body.uuidPerson
        }
        const detailUser = await AuthService.createNewUser(newUser)
        if (detailUser.status == 400) {
            res.status(400).json({ data: detailUser })
        } else {
            res.status(201).json({ status: "Creado Correctamente", data: detailUser })
        }
    } catch (error) {
        res.status(error?.status || 500)
        res.send({ status: "Failed", data: { error: error?.message || error } })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await AuthService.getAllUsers();
        res.json({ status: 'OK', data: allUsers })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getOneUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "ID no puede ir vacio" },
        });
        return;
    }
    try {
        const oneUser = await AuthService.getOneUser(id);
        if (oneUser.status == 404) {
            res.status(404).json({ data: oneUser })
        } else {
            res.status(200).json({ status: "OK", data: oneUser })
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const updateOneUser = async (req, res) => {
    const { body } = req
    const { id } = req.params;
    let passwordHash;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
        });
        return;
    }
    
    try {
        if (req.body.password == '') {
            passwordHash = ''
        }else{
            passwordHash = await encrypt(body.password);
        }

        const user = {
            username: req.body.username,
            password: passwordHash,
            rol_id: req.body.rol_id,
        };
        const updatedUser = await AuthService.updateOneUser(id, user);

        if (updatedUser.status == 400) {
            res.status(400).json({ data: updatedUser })
        } else {
            res.status(201).json({ status: "OK", data: updatedUser })
        }
            
    } catch (error) {
        res.status(error?.status || 500)
        res.send({ status: "FAILED", data: { error: error?.message || error } })
    }
}

//TODO ELIMINAR UN USUARIO  
const deleteOneUser= async(req,res) =>{
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Se necesita un ID" },
          });
          return;
    }
    try{
        const deletedUser = await AuthService.deleteOneUser(id);
        if (deletedUser.status == 400) {
            res.status(400).json({data: deletedUser})
        }else{
            res.status(204).json({status: "Eliminado Correctamente", data: deletedUser})
        }
    }catch(error){
    
    }
}
export const methods = {
    loginUser,
    registerUser,
    getAllUsers,
    getOneUser,
    updateOneUser,
    deleteOneUser
}
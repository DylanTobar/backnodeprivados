import {getConnection} from "./../database/database";

//TODO CREAR NUEVO USUARIO
const createNewUser = async (newUser) => {
    try{
        const connection = await getConnection();
            await connection.query(`
            INSERT INTO user (uuid,username,password,rol_id,uuidPerson) 
            VALUES (?,?,?,?,?)`,
            [newUser.uuid,newUser.username,newUser.password,newUser.rol_id,newUser.uuidPerson]);
            return {uuid: newUser.uuid, 
                    username: newUser.username,
                    rol_id: newUser.rol_id,
                    uuidPerson: newUser.uuidPerson,};
    } catch(error)
    {
        throw error;
    }
}

//TODO OBTENER UN USERNAME
const getOneUsername = async (detailUsername) => {
    try {
        const connection = await getConnection();
        const result  = await connection.query(`
        SELECT uuid, username, password, r.rol 
        FROM user 
        JOIN rol as r 
        WHERE rol_id = r.idrol and username =  ?`, detailUsername);
            return result[0];
    } catch (error) {
        throw error;
    }
}

//TODO OBTENER TODOS LOS USUARIOS
const getAllUsers= async () =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        Select u.uuid,u.username,r.rol,p.fullname 
        FROM user AS u JOIN rol AS r 
        JOIN person AS p 
        WHERE u.uuidperson = p.uuid and u.rol_id = r.idrol`)
        var data=JSON.parse(JSON.stringify(result))
        return data;
    }catch(error){
        throw error;
    }
}

//TODO OBTENER ROLES
const getOneRol= async (uuid) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query(`
        Select rol_id 
        FROM user 
        WHERE uuid = ?`, uuid)
        var data=JSON.parse(JSON.stringify(result))
        return data[0];
    }catch(error){
        throw error;
    }
}

//TODO OBTENER UN USUARIO
const getOneUser = async (uuid) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        Select username,rol_id, uuidPerson 
        FROM user 
        WHERE uuid = ?`, uuid);
        if (result.length <= 0) {
            return {
            status: 404,
            message: 'No se encontro el usuario'
        };
        }else{
            return result;
        }
    } catch (error) {
        throw error;
    }
}
//TODO OBTENER UN USERNAME
const getPassword = async (uuid) => {
    try {
        const connection = await getConnection();
        const result  = await connection.query(`
        SELECT password 
        FROM user 
        WHERE uuid = ?`, uuid);
            return result[0];
    } catch (error) {
        throw error;
    }
}

//TODO ACTUALIZAR UN USUARIO
const updateOneUser = async (id, updatedUser) => {
    try{
        const connection = await getConnection();
            let result;
            if (updatedUser.password == '') {
                result = await connection.query(`
                UPDATE user 
                SET username = IFNULL(?, username), rol_id = IFNULL(?, rol_id) 
                WHERE uuid = ?`,
                [updatedUser.username,updatedUser.rol_id,id]);
            }else{
                result = await connection.query(`
                UPDATE user 
                SET username = IFNULL(?, username), password = IFNULL(?, password), rol_id = IFNULL(?, rol_id) 
                WHERE uuid = ?`,
                [updatedUser.username,updatedUser.password,updatedUser.rol_id,id]);
            }
             return result;
    } catch(error)
    {
        throw error;
    }
}

//TODO ELIMINAR UN USUARIO
const deleteOneUser = async (id) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
        DELETE FROM user 
        WHERE uuid = ?`, id);
        if (result.affectedRows <= 0) {
            return {
                status: 400,
                message: 'El Usuario no existe'
            };
        }
        return {
            status: 204
        }
    } catch (error) {
        throw error;
    }
    
}
module.exports = {
    createNewUser,
    getOneUsername,
    getAllUsers,
    getOneUser,
    getOneRol,
    updateOneUser,
    getPassword,
    deleteOneUser
}
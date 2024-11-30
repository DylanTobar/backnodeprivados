import {getConnection} from "./../database/database";

const getOneUsername = async (detailUsername) => {
    try {
        const connection = await getConnection();
        const result  = await connection.query(`
        SELECT iduser, username, password
        FROM ha0klysawmthhq8w.user 
        WHERE username =  ?`, detailUsername);
            return result[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOneUsername,
}
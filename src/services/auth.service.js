const AuthStorage = require("../storage/auth.storage")

const getOneUsername = async (detailUsername) => {
    try {
        const OneUsername = await AuthStorage.getOneUsername(detailUsername);
        return OneUsername
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getOneUsername,
}
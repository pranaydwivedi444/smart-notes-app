const bcrypt = require('bcrypt');
const saltRounds = Number( process.env.SALT_ROUNDS);

async function hashPassword(plainTextPassword) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
        return hashedPassword;
        
    } catch (error) {
        throw new Error(error.message);
    }
}


async function checkPassword(plainTextPassword, hashedPassword) {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
}

module.exports = { hashPassword, checkPassword };
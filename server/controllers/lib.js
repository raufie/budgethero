const bcrypt = require("bcrypt");
const config = require("config");

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (e) {
        console.log(e)
    }
}
const comparePassword = async (password, hashedPassword) => {
    try {
        const isValid = await bcrypt.compare(password, hashedPassword);
        return isValid;
    } catch (e) {
        return false;
    }
}


exports.encryptPassword = encryptPassword;
exports.comparePassword = comparePassword;

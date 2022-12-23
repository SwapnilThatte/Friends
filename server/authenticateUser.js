const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()

const authenticate = async (req) => {
    
    const token = req.headers["authorization"];
    if (token === null) {
        return false 
    }
    else {
        try {
            const secret = process.env.TOKEN_SECRET;
            const valid = await bcrypt.compare(token, secret)
            if (valid) {
                return true
            }
            else {
                return false
            }
        } catch(error) {
            return false
        }
    }
}

module.exports = authenticate
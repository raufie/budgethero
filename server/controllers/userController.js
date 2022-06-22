const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const User = require("../models/User")
const config = require("config");
const lib = require("./lib")
// sign up
const signUp = async (req, res, next) => {
    //create a uuid for activation link
    try {
        req.body.password = await lib.encryptPassword(req.body.password);
        User.create(req.body)
            .then(u => {
                return res.status(200).json({
                    message: u
                })
            }).catch(e => {
                return res.status(400).json({
                    error: e && e.code === 11000 ? "A user with that name already exists" :"Some error occured signing you up"
                });
            })
    } catch (e) {
        return res.status(400).json({
            error: "An error occured while hashing"
        });
    }
}
// sign in
const signIn = async (req, res, next) => {

    try {

        const user = await User.findOne({ username: req.body.username });
 
            const isValid = await bcrypt.compare(req.body.password, user.password);
            if (isValid) {
                const token = jwt.sign({ _id: user._id }, config.get("jwtkey"), {
                    expiresIn: "30d"
                });
                return res.status(200).json({
                    "x-auth-token": token
                })
            } else {
                return res.status(400).json({
                    error: "Invalid_Password"
                })
            }

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "The User Does not exist or something"
        })
    }
}
// verify
const verify = async (req, res, next) => {
    //if the token is valid and the user exists then next other wise return bad request
    try {
        const token = jwt.verify(req.header("x-auth-token"), config.get("jwtkey"));
        const user = await User.findById({ _id: token._id });
        if (user) {
            req.verifiedUserId = user._id;
            next();
        } 
        else {
            return res.status(400).json({
                error: "The User doesn't exist"
            })
        }

    } catch (e) {
        return res.status(400).json({
            error: "invalid token"
        })
    }

}
// verify login
const verifyLogin = async (req, res, next) => {
    const user = await User.findOne({ _id: req.verifiedUserId });
    return res.status(200).json({
        user
    });
}
exports.signUp = signUp;
exports.signIn = signIn
// middle-only middlewares
exports.verify = verify
exports.verifyLogin = verifyLogin
const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');

const verifyReCaptcha = (req, res, next) => {

    const secretKey = process.env.SECRET_KEY_GOOGLE
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.reCaptchaToken}&remoteip=${req.connection.remoteAddress}`;


    axios.get(verifyUrl).catch((err) => {
        res.status(401).send({
            message: "Invalid ReCaptcha!"
        });
    }).then((response) => {
        if (response.data.success) {
            next();
        } else {
            res.status(401).send({
                message: "Invalid ReCaptcha!"
            });
        }
    });

};


module.exports = verifyReCaptcha;
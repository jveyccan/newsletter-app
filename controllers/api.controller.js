
const UserService = require('../services/ApiService');
const { ResourceNotFound } = require('../errors');
exports.new = async function(req, res) {
    try {
        console.log(req.body.firstname)
        const user = req.body;
        const newUser = await UserService.addUser(user);

        res.status(200).json({ error: false, statusCode: 200, user: newUser, message: 'new user created successfully' });
    }
    catch (err) {
        console.log(err);
        switch (true) {
            case err instanceof ResourceNotFound:
            case err instanceof TypeError:
                return res.status(400).json({ error: true, statusCode: 400, message: err.message });
            default:
                return res.status(500).json({
                    error: true,
                    statusCode: 500,
                    message: 'Internal Server Error'
                });
        }
    }
}

exports.send = async function(req, res) {
    try {
        const newUser = await UserService.sendEmail(req);

        res.status(200).json({ error: false, statusCode: 200, user: newUser, message: 'new user created successfully' });
    }
    catch (err) {
        console.log(err);
        switch (true) {
            case err instanceof ResourceNotFound:
            case err instanceof TypeError:
                return res.status(400).json({ error: true, statusCode: 400, message: err.message });
            default:
                return res.status(500).json({
                    error: true,
                    statusCode: 500,
                    message: 'Internal Server Error'
                });
        }
    }
}
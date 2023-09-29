const { MESSAGE, STATUS, STATUS_CODE } = require("../constants");

const validateRequestBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(STATUS_CODE.SERVER_CANNOT_PROCESS).json({
            status: STATUS.ERROR,
            message: MESSAGE.SERVER_CANNOT_PROCESS,
        });
    } next();

};
module.exports = { validateRequestBody };

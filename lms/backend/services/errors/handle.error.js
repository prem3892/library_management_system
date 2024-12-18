
function handleError(res, status, message, data, token) {


    res.status(status).json({message: message, data: data, result: token });
}

export default handleError
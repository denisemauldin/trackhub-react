export default function authCheck(noAuthHandler, handler) {
    return function(req, res, next) {
        const hasToken = req.session.dataToken || false
        const hasUsername = req.session.username || false

        hasToken && hasUsername
            ? handler(req, res, next)
            : noAuthHandler(req, res, next)
    }
}
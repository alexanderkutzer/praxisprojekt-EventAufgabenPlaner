export function getToken(req) {
    return req.header("Authorization").split(" ")[1];
}

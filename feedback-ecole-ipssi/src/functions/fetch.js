/**
 *
 * @param {string} url
 * @param {string} token
 * @param {string} method
 * @param {object} body
 */
export function request(url, token, method = "GET", body) {
    return fetch(API_URL + url, {
        method,
        body,
        headers: token ? { Authorization: token } : null
    })
        .then(response => response.json())
        .catch(error => error);
}

/**
 * Manage ajax response
 *
 * @param {object} response
 * Required to bind "this"
 * @returns {boolean}
 */
export function responseManagment(response) {
    if (response.status === 200) {
        return true;
    } else {
        responseErrorManagment.bind(this, response)();
        return false;
    }
}

/**
 * Manage ajax response errors
 *
 * @param {object} response
 * Required to bind "this"
 * Required to "setLog"
 */
export function responseErrorManagment(response) {
    if (response.message) {
        console.error(`Erreur ${response.status} : ${response.message}`);
        this.setLog({
            type: "error",
            message: response.message
        });
    } else {
        this.setLog({
            type: "error",
            message: "Une erreur est survenue."
        });
    }
}

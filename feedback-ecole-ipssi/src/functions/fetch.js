import { API_URL } from "../constants";

/**
 * Build and process fetch request
 * @param {string} url
 * @param {string} token
 * @param {object} options
 */
export function request(url, token, options = {}) {
    console.log("url", url)
    options.headers = {};
    if (options.body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(options.body);
    }
    if (token) {
        options.headers["Authorization"] = token;
    }
    return fetch(API_URL + url, options)
        .then(response =>
            response.json().then(result => ({
                status: response.status,
                result
            }))
        )
        .catch(error => error);
}

/**
 * Manage ajax response
 * @param {object} response
 * Required to bind "this"
 * @returns {boolean}
 */
export function responseManagment(response) {
    if (response.status === 200) {
        delete response.status;
        return true;
    } else {
        responseErrorManagment.bind(this, response)();
        return false;
    }
}

/**
 * Manage ajax response errors
 * @param {object} response
 * Required to bind "this"
 * Required to "setLog"
 */
export function responseErrorManagment(response) {
    if (response.message) {
        console.error(`Erreur ${response.status} : ${response.message}`);
        this.props.setLog({
            type: "error",
            message: response.message
        });
    } else {
        console.error(
            "La connexion avec le serveur n' a pas pu être effectuée"
        );
        this.props.setLog({
            type: "error",
            message: "Une erreur est survenue."
        });
    }
}

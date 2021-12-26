let cryptoJS = require('crypto-js')

function handleFetchError(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function requestAuthToken(email, password) {
    // TODO: Don't hardcode location for backend server
    let url = "http://127.0.0.1:7999/auth/token/login/"

    let body = {
        email: email,
        password: password
        // other information fetched from database
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(handleFetchError).then(res => res.json()).then((data) => {
        return [true, data["auth_token"]]
    }).catch((error) => {
        console.log(error)
        return [false, null]
    })
}

function requestUserInfo(auth_token) {
    // TODO: Don't hardcode location for backend server
    let url = "http://127.0.0.1:7999/auth/users/me/"

    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + auth_token
        }
    }).then(handleFetchError).then(res => res.json()).then((data) => {
        return [true, data]
    }).catch((error) => {
        console.log(error)
        return [false, null]
    })
}

function requestEditUserInfo(user, auth_token) {
    // TODO: Don't hardcode location for backend server
    let url = "http://127.0.0.1:7999/auth/users/update_profile/"

    return fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + auth_token
        },
        body: JSON.stringify({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            city: user.city,
            zip_code: user.zip_code,
        })
    }).then(handleFetchError).then(res => res.json()).then((data) => {
        return [true, data]
    }).catch((error) => {
        console.log(error)
        return [false, null]
    })
}

export { requestAuthToken, requestUserInfo, requestEditUserInfo};
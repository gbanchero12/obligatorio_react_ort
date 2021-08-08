const BASE_URL = "https://destinos.develotion.com";

export const post = async (url, data) => {
    return fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const getWithAccessToken = (url, token) => {

    return fetch(BASE_URL + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': localStorage.getItem("token")
        }
    })
}

export const postWithAccessToken = async (url, data) => {
    return fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
}

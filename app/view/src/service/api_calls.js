const apiUrl = "http://localhost:3000/api/v1/";

export async function apiGetUsers() {
    const response = await fetchApi("users", "GET");
    return response.json();
}

async function fetchApi(url, method, data) {
    return fetch(apiUrl + url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

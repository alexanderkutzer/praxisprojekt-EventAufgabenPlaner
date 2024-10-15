const public_ip = "";
const apiUrl =
    "http://" + (public_ip === "" ? "localhost" : public_ip) + ":3000/api/v1/";

export async function apiGetUsers() {
    console.log(apiUrl);
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

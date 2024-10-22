const public_ip = "";
const apiUrl = "http://" + (public_ip === "" ? "localhost" : public_ip) + ":3000/api/v1/";

export async function apiUserLogin(email, password) {
    const response = await fetchApi("auth/login", "POST", { email, password });
    return response.json();
}
export async function apiUserByToken(token) {
    const response = await fetchApi(`auth/${token == "" ? "no_token" : token}`, "GET");
    return response.json();
}
export async function apiUserLogout(token) {
    token = token == "" ? "no_token" : token;
    const response = await fetchApi(`auth/logout/${token == "" ? "no_token" : token}`, "GET");
    return response.json();
}

export async function apiUserRegister(email, username, password) {
    const response = await fetchApi("auth/register", "POST", {
        email,
        username,
        password,
    });
    return response.json();
}

export async function apiGetUsers() {
    console.log(apiUrl);
    const response = await fetchApi("users", "GET");
    return response.json();
}

export async function apiGetUser(id) {
    const response = await fetchApi(`users/${id == "" ? "noId" : id}`, "GET");
    return response.json();
}

export async function apiCreateUser(data) {
    const response = await fetchApi("users", "POST", data);
    return response.json();
}

export async function apiUpdateUser(id, data) {
    const response = await fetchApi(`users/${id == "" ? "noId" : id}`, "PUT", data);
    return response.json();
}

export async function apiDeleteUser(id) {
    const response = await fetchApi(`users/${id == "" ? "noId" : id}`, "DELETE");
    return response.json();
}

export async function apiUpdateUserEmail(token, email){
    token = token == "" ? "no_token" : token;
    const response = await fetchApi(`users/update/email/${token == "" ? "no_token" : token}`, "POST", {email});
    return response.json();
}
export async function apiUpdateUserPassword(token, password){
    token = token == "" ? "no_token" : token;
    const response = await fetchApi(`users/update/password/${token == "" ? "no_token" : token}`, "POST", {password});
    return response.json();
}
export async function apiUpdateUserUsername(token, username){
    token = token == "" ? "no_token" : token;
    const response = await fetchApi(`users/update/username/${token == "" ? "no_token" : token}`, "POST", {username});
    return response.json();
}

export async function apiGetEvents() {
    const response = await fetchApi("events", "GET");
    return response.json();
}

export async function apiGetEvent(id) {
    const response = await fetchApi(`events/${id == "" ? "noId" : id}`, "GET");
    return response.json();
}

export async function apiCreateEvent(data) {
    const response = await fetchApi("events", "POST", data);
    return response.json();
}

export async function apiUpdateEvent(id, data) {
    const response = await fetchApi(`events/${id == "" ? "noId" : id}`, "PUT", data);
    return response.json();
}

export async function apiDeleteEvent(id) {
    const response = await fetchApi(`events/${id == "" ? "noId" : id}`, "DELETE");
    return response.json();
}

export async function apiGetTasks() {
    const response = await fetchApi("tasks", "GET");
    return response.json();
}

export async function apiGetTask(id) {
    const response = await fetchApi(`tasks/${id == "" ? "noId" : id}`, "GET");
    return response.json();
}

export async function apiCreateTask(data) {
    const response = await fetchApi("tasks", "POST", data);
    return response.json();
}

export async function apiUpdateTask(data) {
    const response = await fetchApi(`tasks`, "PUT", data);
    return response.json();
}

export async function apiDeleteTask(data) {
    const response = await fetchApi(`tasks`, "DELETE", data);
    return response.json();
}

export async function apiLogin(email, password) {
    const response = await fetchApi("login", "POST", { email, password });
    return response.json();
}

async function fetchApi(url, method, data) {
    console.log("fetchApi: ", apiUrl + url, method, data ?? "");
    return fetch(apiUrl + url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

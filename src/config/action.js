
export const setToken = (token) => {
    localStorage.setItem("token", token);
}

export const removeToken = () => {
    localStorage.setItem("token");
}

export const getToken = () => {
    return localStorage.getItem("token") ? localStorage.getItem("token") : null;
}

export const getUSERId = () => {
    return localStorage.getItem("userId") ? localStorage.getItem("userId") : null;
}



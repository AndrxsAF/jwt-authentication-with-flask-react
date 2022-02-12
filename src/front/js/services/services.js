export const registerUser = (content) =>
fetch('https://3001-andrxsaf-jwtauthenticati-l3ahsc2ws00.ws-eu31.gitpod.io/api/user/register', {
    method: "POST",
    body: JSON.stringify(content)
});

export const loginUser = (content) =>
fetch('https://3001-andrxsaf-jwtauthenticati-l3ahsc2ws00.ws-eu31.gitpod.io/api/user/login', {
    method: "POST",
    body: JSON.stringify(content)
});

export const getUser = (token) =>
fetch('https://3001-andrxsaf-jwtauthenticati-l3ahsc2ws00.ws-eu31.gitpod.io/api/user', {
    method: "GET",
    headers: {
        authorization: `Bearer ${token}`
    }
});
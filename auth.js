// auth.js
function protectPage() {
    const user = localStorage.getItem("user");
    if (!user && window.location.pathname !== "/index.html") {
        window.location.href = "index.html"; // Redireciona para index se não logado
    }
}

function updateUserInfo() {
    const user = localStorage.getItem("user");
    const userInfo = document.getElementById("user-info");
    const loginContainer = document.getElementById("login-container");
    const logoutButton = document.getElementById("logout-button");

    if (user) {
        const data = JSON.parse(user);
        userInfo.innerHTML = `<p>Bem-vindo, ${data.name}!</p><img src="${data.picture}" alt="Foto de perfil">`;
        loginContainer.style.display = "none";
        logoutButton.style.display = "flex";
    } else {
        userInfo.innerHTML = "";
        loginContainer.style.display = "flex";
        logoutButton.style.display = "none";
    }
}

function handleCredentialResponse(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));
    localStorage.setItem("user", JSON.stringify(data));
    updateUserInfo();
}

function logout() {
    localStorage.removeItem("user");
    updateUserInfo();
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    protectPage(); // Verifica se a página está protegida
    updateUserInfo();

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }

    const loginButton = document.getElementById("login-button");
    if (loginButton && !localStorage.getItem("user")) {
        google.accounts.id.initialize({
            client_id: "59693124421-47qb2ds3tu2n2uo97foap2jl4pmuno6v.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(loginButton, { theme: "outline", size: "medium" });
    }
});

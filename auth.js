// Configuração e Inicialização do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAFQ6h-q38WNkJUtWB3VkqvLiKdo_uJKXo",
    authDomain: "z100web-4036c.firebaseapp.com",
    projectId: "z100web-4036c",
    storageBucket: "z100web-4036c.firebasestorage.app",
    messagingSenderId: "1074140453042",
    appId: "1:1074140453042:web:94d03b8a1158c7923d91ab"
};

// Inicializa o Firebase apenas uma vez.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

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
    // SEU CÓDIGO ORIGINAL (PERMANECE IGUAL)
    const data = JSON.parse(atob(response.credential.split('.')[1]));
    localStorage.setItem("user", JSON.stringify(data));
    updateUserInfo();

    // A "PONTE" PARA O FIREBASE (CÓDIGO NOVO ADICIONADO)
    console.log("auth.js: Avisando o Firebase sobre o login...");
    const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
    auth.signInWithCredential(credential).catch(error => {
        console.error("auth.js: Erro ao sincronizar login com Firebase:", error);
    });
}

function logout() {
    // AVISO PARA O FIREBASE (CÓDIGO NOVO ADICIONADO)
    auth.signOut(); 

    // SEU CÓDIGO ORIGINAL (PERMANECE IGUAL)
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

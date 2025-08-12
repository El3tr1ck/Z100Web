// Configuração e Inicialização do Firebase (deve acontecer primeiro e só uma vez)
const firebaseConfig = {
    apiKey: "AIzaSyAFQ6h-q38WNkJUtWB3VkqvLiKdo_uJKXo",
    authDomain: "z100web-4036c.firebaseapp.com",
    projectId: "z100web-4036c",
    storageBucket: "z100web-4036c.firebasestorage.app",
    messagingSenderId: "1074140453042",
    appId: "1:1074140453042:web:94d03b8a1158c7923d91ab"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// ========================================================================
// == ESTA É A FUNÇÃO MAIS IMPORTANTE - A PONTE ENTRE GOOGLE E FIREBASE ==
// ========================================================================
// Ela é chamada automaticamente pelo seu botão de login do Google.
function handleCredentialResponse(response) {
    console.log("auth.js: Credencial do Google recebida. Sincronizando com o Firebase...");
    
    // 1. Pegamos a "carteirinha de identidade" que o Google nos deu.
    const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);

    // 2. Usamos essa carteirinha para fazer o login silencioso no Firebase.
    // O usuário nem percebe isso acontecendo.
    auth.signInWithCredential(credential).catch(error => {
        console.error("auth.js: Erro ao sincronizar login com Firebase:", error);
    });
    // O listener `onAuthStateChanged` vai cuidar de atualizar a interface a partir daqui.
}

// Função de Logout - simples e direta
function logout() {
    auth.signOut();
}

// Listener global do Firebase
// Ele "ouve" em todas as páginas e atualiza a interface de acordo.
auth.onAuthStateChanged(user => {
    const userInfoDiv = document.getElementById("user-info");
    const loginContainerDiv = document.getElementById("login-container");
    const logoutButton = document.getElementById("logout-button");

    if (user) {
        // Se tem um usuário, mostra as informações dele e o botão de sair.
        console.log("auth.js: Estado de autenticação mudou. Usuário logado:", user.displayName);
        if (userInfoDiv) userInfoDiv.innerHTML = `<p>Bem-vindo, ${user.displayName}!</p><img src="${user.photoURL}" alt="Foto de perfil">`;
        if (loginContainerDiv) loginContainerDiv.style.display = "none";
        if (logoutButton) logoutButton.style.display = "flex";
    } else {
        // Se não tem usuário, limpa a área de info e mostra o botão de login.
        console.log("auth.js: Estado de autenticação mudou. Usuário deslogado.");
        if (userInfoDiv) userInfoDiv.innerHTML = "";
        if (loginContainerDiv) loginContainerDiv.style.display = "flex";
        if (logoutButton) logoutButton.style.display = "none";
    }
});

// Adiciona o evento de clique ao botão de logout
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});

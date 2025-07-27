
let attemptCount = 0;
let blockTime = null;

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    const loginMessage = document.getElementById("loginMessage");

    if (blockTime && Date.now() < blockTime) {
        loginMessage.textContent = "⏳ Try again in a moment...";
        return;
    }

    if (username === "1234" && password === "admin123") {
        if (rememberMe) {
            localStorage.setItem("loggedIn", "true");
        }
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("appSection").style.display = "block";
        loadCategories();
        loginMessage.textContent = "";
    } else {
        attemptCount++;
        loginMessage.textContent = "❌ Incorrect credentials";
        if (attemptCount >= 3) {
            blockTime = Date.now() + 60000;
            loginMessage.textContent = "🚫 Too many attempts. Try again in 1 minute.";
            attemptCount = 0;
        }
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}

window.onload = function () {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("appSection").style.display = "block";
        loadCategories();
    }
};

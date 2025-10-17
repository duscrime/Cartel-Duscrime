// login.js — Cartel DusCrime Login

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const userInput = document.getElementById("username");
  const passInput = document.getElementById("password");
  const errorMsg = document.getElementById("error-msg");

  loginBtn.addEventListener("click", () => {
    const username = userInput.value.trim();
    const password = passInput.value.trim();

    // Login fixo
    const fixedUser = "dcradmin";
    const fixedPass = "dcrpass";

    if (username === fixedUser && password === fixedPass) {
      // Redireciona para página privada
      window.location.href = "pagina-privada.html"; 
    } else {
      // Mostra erro
      errorMsg.textContent = "Usuário ou senha incorretos!";
      errorMsg.style.display = "block";
      errorMsg.style.color = "#ff4b4b";
      errorMsg.style.marginTop = "10px";
      errorMsg.style.fontWeight = "bold";
    }
  });

  // Enter também envia o login
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      loginBtn.click();
    }
  });
});

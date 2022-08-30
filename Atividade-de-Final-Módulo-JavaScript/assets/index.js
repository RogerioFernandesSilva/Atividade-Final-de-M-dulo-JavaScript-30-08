let botaoLogin = document.getElementById("botao1");

botaoLogin.addEventListener("click", logarUsuario);

function logarUsuario() {
  let usuarioLogin = JSON.parse(localStorage.getItem("usuarios"));
  console.log(usuarioLogin);

  let emailValidacao = document.getElementById("emailUsuario").value;
  let senhaValidacao = document.getElementById("senhaUsuario").value;

  console.log(emailValidacao);
  console.log(senhaValidacao);

  if (!emailValidacao || !senhaValidacao) {
    alert("Favor digitar E-MAIL e SENHA cadastrados");
    resetLogin();
    return;
  }

  let validarUsuario = usuarioLogin.find(
    (usuarioValidacao) =>
      usuarioValidacao.senha === senhaValidacao &&
      usuarioValidacao.email === emailValidacao
  );

  if (validarUsuario === undefined) {
    let retorno = confirm(
      "Usuário ou senha inexistente. Deseja realizar cadastro?"
    );

    if (retorno === true) {
      resetLogin();
      retornaCadastro();
    } else {
      resetLogin();
    }
  } else {
    login();
    const usuarioLogado = validarUsuario;
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    resetLogin();
  }

  console.log(validarUsuario);
}

function resetLogin() {
  document.getElementById("emailUsuario").value = "";
  document.getElementById("senhaUsuario").value = "";
}

function retornaCadastro() {
  window.location.href = "contanova.html";
}

function login() {
  alert("Login Efetuado com Sucesso");
  setTimeout(() => {
    window.location.href = "recados.html";
  }, 1000);
}
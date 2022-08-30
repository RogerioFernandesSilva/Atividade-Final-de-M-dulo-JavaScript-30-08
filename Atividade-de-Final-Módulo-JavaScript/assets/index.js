let botaoLogin = document.getElementById("botao1");

botaoLogin.addEventListener("click", logarUsuario);

function logarUsuario() {
  let usuarioLogin = JSON.parse(localStorage.getItem("usuarios"));

  let emailValidacao = document.getElementById("emailUsuario").value.toLowerCase();
  let senhaValidacao = document.getElementById("senhaUsuario").value;

  if (!emailValidacao || !senhaValidacao) {
    Swal.fire("Favor digitar E-MAIL e SENHA cadastrados");
    resetLogin();
    return;
  }

  let validarUsuario = usuarioLogin.find(
    (usuarioValidacao) =>
      usuarioValidacao.senha === senhaValidacao &&
      usuarioValidacao.email === emailValidacao
  );

  if (validarUsuario === undefined) {
    Swal.fire({
      icon: "question",
      title: "Oops...",
      text: "Usuário ou senha inexistente!",
      footer:
        '<a href="contanova.html">Clique aqui para realizar novo cadastro</a>',
    });
    resetLogin();

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
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Login Efetuado com Sucesso",
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    window.location.href = "recados.html";
  }, 2000);
}
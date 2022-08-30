let usuario = buscarDadosStorage();

if (!usuario) {
  sair();
}

function buscarDadosStorage() {
  return JSON.parse(localStorage.getItem("usuarioLogado"));
}

listarRecados();

let identidadeSistema = document.getElementById("userEmail");
identidadeSistema.innerHTML = `${usuario.email}`;

let botaoSair = document.getElementById("logout");

botaoSair.addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  sair();
});

function sair() {
  return (window.location.href = "index.html");
}

let botaoSalvar = document.getElementById("save");

botaoSalvar.addEventListener("click", cadastrarMensagens);

let descricaoHTML = document.getElementById("descricao");
let detalhamentoHTML = document.getElementById("detalhamento");

function cadastrarMensagens() {
  const idMsg = Math.floor(Math.random() * (100 - 10) + 10);
  let mensagemHTML = {
    idMsg,
    descricao: descricaoHTML.value,
    detalhamento: detalhamentoHTML.value,
  };

  if (descricaoHTML.value === "" || detalhamentoHTML.value === "") {
    alert("Descrição ou Detalhamento em branco");
    resetMensagem();
    return;
  }

  usuario.mensagens.push(mensagemHTML);

  salvarDadosStorage(usuario);

  function salvarDadosStorage(usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  }

  atualizarUsuarios();
  listarRecados();
  resetMensagem();
}

function atualizarUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  usuarios.forEach((user) => {
    if (user.email === usuario.email) {
      user.mensagens = usuario.mensagens;
    }
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function resetMensagem() {
  descricaoHTML.value = "";
  detalhamentoHTML.value = "";
}

function listarRecados() {
  let listaRecados = document.getElementById("listaDeRecados");
  listaRecados.innerHTML = "";

  for (const index in usuario.mensagens) {
    listaRecados.innerHTML += `<tr id="${usuario.mensagens[index].idMsg}", class="registro">
    <th>${index}</th>
    <th>${usuario.mensagens[index].descricao}</th>
    <th>${usuario.mensagens[index].detalhamento}</th>
    <th>
    <button type="button" class="blue" onclick="editarMensagens(${usuario.mensagens[index].idMsg})">Editar</button>
    <button type="button" class="red" onclick="apagarMensagens(${usuario.mensagens[index].idMsg})">Apagar</button>
    </th>
    </tr>`;
  }
}

let descricaoEditHTML = document.getElementById("descricaoOPEdit");
let detalhamentoEditHTML = document.getElementById("detalhamentoOPEdit");

function editarMensagens(idMsg) {
  mostrarModal();

  const cancel = document.getElementById("closeEdit");
  cancel.addEventListener("click", esconderModal);

  modalMostrarMensagens(idMsg);

  const confirmarEdicao = document.getElementById("confirmEdit");
  confirmarEdicao.onclick = () => {
    modalEditarMensagens(idMsg);
    listarRecados();
    atualizarUsuarios();
    setTimeout(() => {
      esconderModal();
    }, 500);
  };
}

function mostrarModal() {
  document.querySelector(".modal").style.display = "block";
}

function modalMostrarMensagens(id) {
  const mensagensTemp = usuario.mensagens.findIndex(
    (mensagemEdit) => mensagemEdit.idMsg === id
  );
  descricaoEditHTML.value = usuario.mensagens[mensagensTemp].descricao;
  detalhamentoEditHTML.value = usuario.mensagens[mensagensTemp].detalhamento;
}
function modalEditarMensagens(id) {
  const mensagensTemp = usuario.mensagens.findIndex(
    (mensagemEdit) => mensagemEdit.idMsg === id
  );
  usuario.mensagens[mensagensTemp].descricao = descricaoEditHTML.value;
  usuario.mensagens[mensagensTemp].detalhamento = detalhamentoEditHTML.value;
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

function esconderModal() {
  document.querySelector(".modal").style.display = "none";
}

function apagarMensagens(id) {
  let confirmaApagar = confirm("Deseja realmente apagar esta mensagem?");
  if (confirmaApagar) {
    const novaMensagem = usuario.mensagens.filter(
      (newMsg) => newMsg.idMsg !== id
    );
    usuario.mensagens = novaMensagem;
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    listarRecados();
    atualizarUsuarios();
  }
}
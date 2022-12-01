import '@picocss/pico'
import './style.css'
const formConsultarPerfis = document.querySelector('#ConsultarPerfis')
const inputBuscarGit = formConsultarPerfis.BuscarGit // seleciona o input do cep a partir do formulário
const divDados = document.querySelector('#dados')
const btnConsultarPerfis =
  document.querySelector('#btnConsultarPerfis')

formConsultarPerfis.addEventListener('submit', function (event) {
  event.preventDefault() // anula comportamento padrão de envio do form ao clicar no botão
  ativaLoader(true)
  ConsultarPerfis(inputBuscarGit.value) // invoca a função passando o cep digitado por parâmetro
})

async function ConsultarPerfis(BuscarGit) {
  let response = await fetch(`https://api.github.com/users/${BuscarGit}`)
  let dadosBuscarGit = await response.json()
  if (dadosBuscarGit.name === undefined) {
    divDados.innerHTML = `
      <div class="erro">Perfis não encontrado!</div>
    `
  } else {
    divDados.innerHTML = `
    <img src="${dadosBuscarGit.avatar_url}" alt="">
    <h1>${dadosBuscarGit.name}</h1>
    <a href="${dadosBuscarGit.html_url}">Perfil no GitHub</a>
  `
  }
  ativaLoader(false)
}

function ativaLoader(ativo) {
  if (ativo) {
    btnConsultarPerfis.
      setAttribute('aria-busy', 'true')
    btnConsultarPerfis.
      textContent = 'Consultando Perfis...'
  } else {
    btnConsultarPerfis.removeAttribute('aria-busy')
    btnConsultarPerfis. textContent = 'Consultar'
  }
}



const jogadores = []

// const addJogador = () => {
const nome = document.querySelector('#nome').value
// Cria elementos da lista de jogadores
const jogadoresTabela = document.querySelector('#jogadores')
const jogador = document.createElement('td')
jogador.append(nome)

// nome.onclick = () => {
//     if (jogadores.length > 0 && jogadores.includes(nome)) {
//         jogadores.splice(jogadores.indexOf(nome), 1)
//         jogadoresTabela.removeChild(jogador)
//     } else {
//         jogadores.push(nome)
//         jogadoresTabela.appendChild(jogador)
//     }
// }
// }
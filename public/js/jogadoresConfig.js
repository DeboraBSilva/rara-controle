const nomesOnClick = (index, linhaJogador, strNome) => {
    nomes.item(index).onclick = () => {
        if (listaJogadores.length > 0 && listaJogadores.includes(strNome)) {
            listaJogadores.splice(listaJogadores.indexOf(strNome), 1)
            sessionStorage.setItem('mesaJogadores', JSON.stringify(listaJogadores))
            jogadoresTabela.removeChild(linhaJogador)
        } else {
            listaJogadores.push(strNome)
            sessionStorage.setItem('mesaJogadores', JSON.stringify(listaJogadores))
            jogadoresTabela.appendChild(linhaJogador)
        }
    }
}

const populaMesa = (linhaJogador, jogador, strNome) => {
    for (let item = 0; item < listaJogadores.length; item++) {
        if (strNome == listaJogadores[item]) {
            jogador.append(listaJogadores[item])
            linhaJogador.appendChild(jogador)
            jogadoresTabela.appendChild(linhaJogador)
        }
    }
}

const nomes = document.getElementsByClassName('tdNome')
// Cria elementos da lista de jogadores
const jogadoresTabela = document.querySelector('#jogadores')

let listaJogadores = []

const mesaSession = JSON.parse(sessionStorage.getItem('mesaJogadores'))
listaJogadores = mesaSession != null && mesaSession.length > 0 ? [...mesaSession] : []

for (let index = 0; index < nomes.length; index++) {
    const linhaJogador = document.createElement('tr')
    const jogador = document.createElement('td')
    let strNome = nomes.item(index).textContent.trim()
    jogador.append(strNome)
    linhaJogador.appendChild(jogador)
    populaMesa(linhaJogador, jogador, strNome)
    nomesOnClick(index, linhaJogador, strNome)
}
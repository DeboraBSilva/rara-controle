const nomes = []
const jogadores = []

const addJogador = () => {
    const nome = document.querySelector('#txtAddJogador').value
    const listaNomes = document.querySelector('#listaNomes')

    // Cria elementos da lista de nomes
    const itemListaNomes = document.createElement("li")
    const lblItemListaNomes = document.createElement("label")
    const chkNome = document.createElement("input")
    const lblNome = document.createTextNode(nome)

    // Cria elementos da lista de jogadores
    const listaJogadores = document.querySelector('#listaJogadores')
    const itemListaJogadores = document.createElement("li")
    itemListaJogadores.append(lblNome.nodeValue)

    lblItemListaNomes.className = "pure-checkbox"
    chkNome.type = "checkbox"
    chkNome.onchange = () => {
        if (chkNome.checked) {
            jogadores.push(nome)
            listaJogadores.appendChild(itemListaJogadores)
        } else if (jogadores.length > 0) {
            jogadores.splice(jogadores.indexOf(nome), 1)
            listaJogadores.removeChild(itemListaJogadores)
        }
        localStorage.removeItem('Jogadores')
        localStorage.setItem('Jogadores', JSON.stringify(jogadores))
    }

    lblItemListaNomes.appendChild(chkNome);
    lblItemListaNomes.appendChild(lblNome);
    itemListaNomes.appendChild(lblItemListaNomes);
    listaNomes.appendChild(itemListaNomes);
    nomes.push(nome)
    localStorage.removeItem('Nomes')
    localStorage.setItem('Nomes', JSON.stringify(nomes))
}
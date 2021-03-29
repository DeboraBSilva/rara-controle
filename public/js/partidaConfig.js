let contadorColuna = 1
let apostaResultado = 'aposta'
let vez = 0
const colunasAposta = [
    { coluna: 1, mao: 7 },
    { coluna: 4, mao: 6 },
    { coluna: 7, mao: 5 },
    { coluna: 10, mao: 4 },
    { coluna: 13, mao: 3 },
    { coluna: 16, mao: 2 },
    { coluna: 19, mao: 1 },
    { coluna: 22, mao: 1 },
    { coluna: 25, mao: 2 },
    { coluna: 28, mao: 3 },
    { coluna: 31, mao: 4 },
    { coluna: 34, mao: 5 },
    { coluna: 37, mao: 6 },
    { coluna: 40, mao: 7 },
]

const btnEnviaDados = document.getElementById('enviaDados')

// Define qual é a mão atual e retorna false se o total de apostas é invalido para aquela mão
const verificaMao = (coluna, aposta, totalAposta) => {
    let mao
    colunasAposta.forEach((item) => {
        if (item.coluna === coluna) {
            mao = item.mao
        }
    })
    if (aposta + totalAposta == mao) {
        return false
    } else {
        return true
    }
}

const calculaPontos = (aposta, resultado) => {
    if (aposta == resultado) {
        if (contadorColuna == 20 || contadorColuna == 23) {
            if (aposta == 1) {
                pontos = 25
            } else {
                pontos = 10
            }
        } else {
            pontos = resultado + (aposta == 0 ? 10 : aposta * 10)
        }
    } else {
        pontos = resultado
    }
    return pontos
}

// Envia dados de aposta e de resultados dependendo da coluna que os dados serão inseridos
const enviaDados = () => {
    let tmp = vez
    let cont = 0
    if (apostaResultado == 'aposta') {
        let totalAposta = 0
        while (cont < conteudo.length) {
            let aposta = parseInt(prompt('Qual é a aposta de ' + conteudo[tmp][0]))
            if (!Number.isInteger(aposta)) {
                alert('Aposta inválida! A aposta deve ser um número inteiro.')
                continue
            }
            if (cont == conteudo.length - 1) {
                if (!verificaMao(contadorColuna, aposta, totalAposta)) {
                    alert('Aposta Inválida! O total de apostas não pode ser igual à ' + (aposta + totalAposta))
                    continue
                }
            }
            totalAposta += aposta
            conteudo[tmp][contadorColuna] = aposta
            tmp++
            if (tmp >= conteudo.length) {
                tmp = 0
            }
            cont++
        }
        contadorColuna++
        apostaResultado = 'resultado'
        btnEnviaDados.innerHTML = 'Envia Resultado'
    } else {
        while (cont < conteudo.length) {
            let resultado = parseInt(prompt('Qual é o resultado de ' + conteudo[tmp][0]))
            if (!Number.isInteger(resultado)) {
                alert('Resultado inválido! O resultado deve ser um número inteiro.')
                continue
            }
            conteudo[tmp][contadorColuna] = resultado
            let pontos = calculaPontos(conteudo[tmp][contadorColuna - 1], resultado)
            conteudo[tmp][contadorColuna + 1] = pontos
            tmp++
            if (tmp >= conteudo.length) {
                tmp = 0
            }
            cont++
        }
        contadorColuna++
        if (contadorColuna % 3 == 0) {
            contadorColuna++
        }
        apostaResultado = 'aposta'
        btnEnviaDados.innerHTML = 'Envia Aposta'
        vez++
        if (vez >= conteudo.length) {
            vez = 0
        }
    }
    geraTabela(conteudo)
}

// Calcula o total de pontos de cada linha e modifica o ultimo item
const totaliza = () => {
    let coluna = 3
    for (let i = 0; i < conteudo.length; i++) {
        let total = 0
        for (let k = 3; k < 43; k += coluna) {
            total += parseInt('0' + conteudo[i][k])
        }
        conteudo[i][43] = total
    }
}

const geraTabela = (conteudo) => {
    totaliza()
    const tabelaJogo = document.getElementById('tabelaJogo')
    var tableHeaderRowCount = 2
    var rowCount = tabelaJogo.rows.length
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        tabelaJogo.deleteRow(tableHeaderRowCount)
    }

    for (let i = 0; i < conteudo.length; i++) {
        const tr = document.createElement('tr')
        tr.className = 'linhaJogador'
        for (let o = 0; o < conteudo[i].length; o++) {
            const td = document.createElement('td')
            if (o == 0 || o == conteudo[i].length - 1) {
                td.className = 'colunaFixa'
            } else if (o % 3 != 0) {
                let isAposta = false
                td.addEventListener('click', () => {
                    colunasAposta.forEach(item => {
                        if (item.coluna === o) {
                            isAposta = true
                        }
                    })
                    if (isAposta) {
                        let correcao = parseInt(prompt('Correção Aposta'))
                        conteudo[i][o] = correcao
                        let pontos = calculaPontos(conteudo[i][o], conteudo[i][o + 1])
                        conteudo[i][o + 2] = pontos
                    } else {
                        let correcao = parseInt(prompt('Correção Resultado'))
                        conteudo[i][o] = correcao
                        let pontos = calculaPontos(conteudo[i][o - 1], conteudo[i][o])
                        conteudo[i][o + 1] = pontos
                    }
                    geraTabela(conteudo)
                })
            }
            let texto = document.createTextNode(conteudo[i][o])
            td.appendChild(texto)
            tr.appendChild(td)
        }
        tabelaJogo.appendChild(tr)
    }
}


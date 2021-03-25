let contadorColuna = 1
let apostaResultado = 'aposta'
let vez = 0

const btnEnviaDados = document.getElementById('enviaDados')

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

const enviaDados = () => {
    let tmp = vez
    let cont = 0
    if (apostaResultado == 'aposta') {
        let totalAposta = 0
        while (cont < conteudo.length) {
            let aposta = parseInt(prompt('Qual é a aposta de ' + conteudo[tmp][0]));
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
            let resultado = parseInt(prompt('Qual é o resultado de ' + conteudo[tmp][0]));
            conteudo[tmp][contadorColuna] = resultado
            let pontos = calculaPontos(conteudo[tmp][contadorColuna - 1], resultado)
            conteudo[tmp][contadorColuna + 1] = pontos
            conteudo[tmp][43] = pontos + parseInt('0' + conteudo[tmp][43])
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
    gerarTabela(conteudo)
}

const gerarTabela = (conteudo) => {
    const tabelaJogo = document.getElementById('tabelaJogo')
    var tableHeaderRowCount = 2;
    var rowCount = tabelaJogo.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        tabelaJogo.deleteRow(tableHeaderRowCount);
    }

    for (let i = 0; i < conteudo.length; i++) {
        const tr = document.createElement('tr')
        tr.className = 'linhaJogador'
        for (let o = 0; o < conteudo[i].length; o++) {
            const td = document.createElement('td');
            if (o == 0 || o == conteudo[i].length - 1) {
                td.className = 'colunaFixa'
            }
            let texto = document.createTextNode(conteudo[i][o]);
            td.appendChild(texto);
            tr.appendChild(td);
        }
        tabelaJogo.appendChild(tr);
    }
}


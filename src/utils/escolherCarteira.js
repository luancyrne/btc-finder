const fazerPergunta = require('./fazerPergunta.js')
const ranges = require('../data/ranges.js')

async function validaEscolherCarteira(pergunta) {
    while (true) {
        const answer = await fazerPergunta(pergunta)
        const number = parseInt(answer)

        if (number > 0 && number < 162) {
            return answer

        } else {
            console.log('Erro: voce precisa escolher um numero entre 1 e 161')
        }
    }
}

async function escolherCarteira(pergunta) {
    const answer = await validaEscolherCarteira(pergunta)

    let min = ranges[answer - 1].min
    let max = ranges[answer - 1].max

    console.log('Carteira escolhida: ', answer, ' Min: ', min, ' Max: ', max)
    console.log('Numero possivel de chaves:', parseInt(BigInt(max) - BigInt(min)).toLocaleString('pt-BR'))

    let status = ''
    if (ranges[answer - 1].status == 1) {
        status = 'Encontrada'
    } else {
        status = 'Nao Encontrada'
    }

    console.log('Status: ', status)
    let key = BigInt(min)
    return [min, max, key]
}

module.exports = escolherCarteira

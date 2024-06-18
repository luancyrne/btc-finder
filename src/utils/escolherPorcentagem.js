const fazerPergunta = require('./fazerPergunta.js')

async function validaEscolherPorcentagem() {
    while (true) {
        const answer = await fazerPergunta("Escolha um numero entre 0 e 1: ")
        const num = parseFloat(answer);

        if (num >= 0 && num <= 1) {
            return num

        } else {
            console.log(chalk.bgRed('Erro: voce precisa escolher um numero entre 0 e 1'));
        }
    }
}


async function escolherPorcentagem(min, max) {
    const answer = await validaEscolherPorcentagem()

    const range = BigInt(max) - BigInt(min);

    const percentualRange = range * BigInt(Math.floor(parseFloat(answer) * 1e18)) / BigInt(1e18);
    min = BigInt(min) + BigInt(percentualRange);
    let key = BigInt(min)
    console.log('Comecando em: ', '0x' + min.toString(16));
    return [min, max, key];
}

module.exports = escolherPorcentagem
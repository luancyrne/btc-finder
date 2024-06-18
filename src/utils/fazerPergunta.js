const rl = require('./readInterface.js')

module.exports = function fazerPergunta(pergunta) {
    return new Promise((resolve) => rl.question(pergunta, resolve))
}
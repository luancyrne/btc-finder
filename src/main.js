const ranges = require('./ranges.js')
const encontrarBitcoins = require('./bitcoin-find.js')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let shouldStop = false;



let key = 0;
let min, max = 0;

console.clear();

console.log("\x1b[38;2;250;128;114m" + "╔════════════════════════════════════════════════════════╗\n" +
            "║" + "\x1b[0m" + "\x1b[36m" + "   ____ _____ ____   _____ ___ _   _ ____  _____ ____   " + "\x1b[0m" + "\x1b[38;2;250;128;114m" + "║\n" +
            "║" + "\x1b[0m" + "\x1b[36m" + "  | __ )_   _/ ___| |  ___|_ _| \\ | |  _ \\| ____|  _ \\  " + "\x1b[0m" + "\x1b[38;2;250;128;114m" + "║\n" +
            "║" + "\x1b[0m" + "\x1b[36m" + "  |  _ \\ | || |     | |_   | ||  \\| | | | |  _| | |_) | " + "\x1b[0m" + "\x1b[38;2;250;128;114m" + "║\n" +
            "║" + "\x1b[0m" + "\x1b[36m" + "  | |_) || || |___  |  _|  | || |\\  | |_| | |___|  _ <  " + "\x1b[0m" + "\x1b[38;2;250;128;114m" + "║\n" +
            "║" + "\x1b[0m" + "\x1b[36m" + "  |____/ |_| \\____| |_|   |___|_| \\_|____/|_____|_| \\_\\ " + "\x1b[0m" + "\x1b[38;2;250;128;114m" + "║\n" +
            "║" + "\x1b[0m" + "\x1b[36m" + "                                                        " + "\x1b[0m" + "\x1b[38;2;250;128;114m" + "║\n" +
            "╚══════════════════════\x1b[32m" + "Investidor Internacional - v0.5" + "\x1b[0m\x1b[38;2;250;128;114m═══╝" + "\x1b[0m");

rl.question(`Escolha uma carteira puzzle( ${1} - ${160}): `, (answer) => {
    
    if (parseInt(answer) < 1 || parseInt(answer) > 160) {
        console.log('Erro: voce precisa escolher um numero entre 1 e 160')
    }

    min = ranges[answer-1].min
    max = ranges[answer-1].max
    console.log('Carteira escolhida: ', answer, ' Min: ', min, ' Max: ', max )
    console.log('Numero possivel de chaves:',  parseInt(BigInt(max) - BigInt(min)).toLocaleString('pt-BR'))
    let status = ''
    if (ranges[answer-1].status == 1){
        status =  'Encontrada'
    } else  {
        status =  'Nao Encontrada'
    }

    console.log('Status: ', status)
    key = BigInt(min)
    
    rl.question(`Escolha uma opcao (${1} - Comecar do inicio, ${2} - Escolher uma porcentagem, ${3} - Escolher minimo): `, (answer2) => {
        if (answer2 == '2'){
            rl.question('Escolha um numero entre 0 e 1: ', (answer3) => {
                if (parseFloat(answer3) > 1 || parseFloat(answer3) < 0) {
                    console.log('Erro: voce precisa escolher um numero entre 0 e 1')
                    throw 'Numero invalido'
                }


                const range = BigInt(max) - BigInt(min);
                const percentualRange = range * BigInt(Math.floor(parseFloat(answer3) * 1e18)) / BigInt(1e18);
                min = BigInt(min) + BigInt(percentualRange);
                console.log('Comecando em: ', '0x'+min.toString(16));
                key = BigInt(min)
                encontrarBitcoins(key, min, max, () => shouldStop)
                rl.close();
            });
        } else if (answer2 == '3'){
            rl.question('Entre o minimo: ', (answer3) => {
                min = BigInt(answer3)
                key = BigInt(min)
                encontrarBitcoins(key, min, max, () => shouldStop)
                rl.close();
            });
        } else {
            min = BigInt(min)
            encontrarBitcoins(key, min, max, () => shouldStop)
            rl.close();
        }
    })
});

rl.on('SIGINT', () => {
    shouldStop = true;
    rl.close();
    process.exit();
});

process.on('SIGINT', () => {
    shouldStop = true;
    rl.close();
    process.exit();
});
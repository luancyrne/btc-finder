<<<<<<< HEAD
const CoinKey = require('coinkey')
const walletsArray = require('./wallets.js')
const fs = require('fs')
const path = require('node:path')
=======
import CoinKey from 'coinkey';
import walletsArray from './data/wallets.js';
import chalk from 'chalk';
import fs from 'fs';
>>>>>>> c8d26161d2c5941f8c73e8f6937a41cb44cd8113

const walletsSet = new Set(walletsArray);

async function encontrarBitcoins(key, min, max) {
    let segundos = 0;
    const startTime = Date.now();

    const zeroes = Array.from({ length: 65 }, (_, i) => '0'.repeat(64 - i));

    console.log('Buscando Bitcoins...');

    let running = true
    const executeLoop = async () => {
        while (running) {
            key++;
            let pkey = key.toString(16);
            pkey = `${zeroes[pkey.length]}${pkey}`;

            if (Date.now() - startTime > segundos) {
                segundos += 1000;
                console.log(segundos / 1000);
                if (segundos % 10000 === 0) {
                    const tempo = (Date.now() - startTime) / 1000;
                    console.clear();
                    console.log('Resumo: ');
                    console.log('Velocidade:', (Number(key) - Number(min)) / tempo, ' chaves por segundo');
                    console.log('Chaves buscadas: ', (key - min).toLocaleString('pt-BR'));
                    console.log('Ultima chave tentada: ', pkey);

                    const filePath = 'src/Ultima_chave.json';
                    const content = `{ "key": "${pkey}" }`;
                    try {
                        fs.writeFileSync(filePath, content, 'utf8');
                    } catch (err) {
                        console.error('Erro ao escrever no arquivo:', err);
                    }
                }
            }

            let publicKey = generatePublic(pkey);
            if (walletsSet.has(publicKey)) {
                const tempo = (Date.now() - startTime) / 1000;
                console.log('Velocidade:', (Number(key) - Number(min)) / tempo, ' chaves por segundo');
                console.log('Tempo:', tempo, ' segundos');
                console.log('Private key:', pkey);
                console.log('WIF:', generateWIF(pkey));

                const filePath = 'src/keys.json';
                const content = {
                    privateKeys: [{
                        privateKey: pkey,
                        WIF: generateWIF(pkey)
                    }]
                }

                try {
                    if (fs.existsSync(filePath)) {
                        const file = require(path.resolve(filePath))
                        let newContent = file;
                        newContent.privateKeys.push({
                            privateKey: pkey,
                            WIF: generateWIF(pkey)
                        })
                        return fs.writeFileSync(filePath, JSON.stringify(newContent));
                    }
                    fs.appendFileSync(filePath, JSON.stringify(content));
                    return console.log('Chave escrita no arquivo com sucesso.');
                } catch (err) {
                    console.error('Erro ao escrever chave em arquivo:', err);
                }

                console.log('ACHEI!!!! 🎉🎉🎉🎉🎉')
                running = false
            }

            await new Promise(resolve => setImmediate(resolve));
        }
    };

    try {
        await executeLoop();
    } catch (err) {
        if (err !== 'ACHEI!!!! 🎉🎉🎉🎉🎉') {
            console.error('Erro inesperado:', err);
            running = false
        }
    }

    console.log('Processo interrompido ou concluído.');
}

function generatePublic(privateKey) {
    let _key = new CoinKey(Buffer.from(privateKey, 'hex'));
    _key.compressed = true;
    return _key.publicAddress;
}

function generateWIF(privateKey) {
    let _key = new CoinKey(Buffer.from(privateKey, 'hex'));
    return _key.privateWif;
}

module.exports = encontrarBitcoins;

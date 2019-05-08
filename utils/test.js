const request = require('request');
const bitcoreExplorers = require('bitcore-explorers');
const bitcore = require('bitcore-explorers/node_modules/bitcore-lib');

const extendedPrivateKey = "tprv8ZgxMBicQKsPd9uHJwSL9wt9VpKpRuzWVHeCwsGPJ9cF2VZD7vLZGDB1sJz7PBWWiouxi8CpeAk18YgNUhaJZRXBQVL7S9JpdsMuqd7uwgx"
const HDPrivateKey = new bitcore.HDPrivateKey(extendedPrivateKey);
const derive = HDPrivateKey.derive("m/44'/1'/0'/0/0");

const url = "https://testnet.blockchain.info/unspent?active=";
const broadcastURL = "https://testnet.blockchain.info/pushtx";


var address = derive.privateKey.toAddress()
var wif = derive.privateKey.toWIF();
console.log("address : " + address.toString());
console.log("wif : " + wif);


var toAddress = "mk4r3NQSV5cjQfqGi8YzEdRM4uLzY2EeK8";
var amount = btcToSatoshi(0.0001);
var fee = 2000;

/*
const seed = "scorpion bleak when hundred illness detail sponsor theory kingdom web future demand";

seedBytes = bitcore.crypto.Hash.sha256(new Buffer(seed, 'hex'));
var HDPrivateKeyFromSeed = bitcore.HDPrivateKey.fromSeed(seedBytes, 'testnet');

const deriveFromSeed = HDPrivateKeyFromSeed.derive("m/44'/1'/0'/0/0");
var addressFromSeed = deriveFromSeed.privateKey.toAddress()
console.log("addressFromSeed : " + addressFromSeed.toString());

var wifFromSeed = deriveFromSeed.privateKey.toWIF();
console.log("wifFromSeed : " + wifFromSeed);
*/

function btcToSatoshi(btc) {
    return btc * 1e8;
}


/// testnet.blockchain.info
// request(url+address, function(error, response, body) {
//     if (error) {
//         console.log(error);
//     }
//     if (response.statusCode !== 200) {
//         console.log(response.statusCode);
//     }
//     unspent = JSON.parse(body);
//
//     var i = 0;
//     var balance = 0;
//     var utxos = [];
//
//     for (; i < unspent.unspent_outputs.length; i++)
//     {
//         var utxo = {
//             "txId" : unspent.unspent_outputs[i].tx_hash_big_endian,
//             "outputIndex" : unspent.unspent_outputs[i].tx_output_n,
//             "address" : address,
//             "script" : unspent.unspent_outputs[i].script,
//             "satoshis" : unspent.unspent_outputs[i].value
//         };
//         balance += unspent.unspent_outputs[i].value;
//         utxos.push(utxo);
//
//     }
//
//     console.log("balance : " + balance);
//     console.log("amount : " + amount);
//     console.log("fee : " + fee);
//
//     if ((balance - amount - fee) > 0) {
//         var transaction = new bitcore.Transaction()
//             .from(utxos)
//             .to(toAddress, amount)
//             .change(address)
//             .fee(fee)
//             .sign(wif);
//         // console.log(transaction.toString());
//
//         request.post(broadcastURL.toString()+"?tx="+ transaction.toString(),function(error, response, body) {
//             console.log('response=>', response);
//             console.log('body =>', body);
//             console.log('transaction =>', transaction);
//             if (error) {
//                 console.log(error);
//                 return
//             }
//             if (response.statusCode !== 200) {
//                 console.log(response.statusCode);
//                 return
//             }
//
//         });
//     } else {
//         console.log("not enough balance");
//         return
//     }
//
// });

////https://test-insight.bitpay.com
var insight = new bitcoreExplorers.Insight("testnet");
console.log(insight)
insight.getUnspentUtxos(address, function (error, utxos) {
    var balance = 0;

    for (var i = 0; i < utxos.length; i++) {
        balance += utxos[i]['satoshis'];
    }

    console.log('balance:' + balance);

    if ((balance - amount - fee) > 0) {
        var transaction = new bitcore.Transaction()
            .from(utxos)
            .to(toAddress, amount)
            .change(address)
            .fee(2000)
            .sign(wif);
        console.log(transaction.toString());

        insight.broadcast(transaction, function (error, body) {
            if (error) {
                console.log(error);
            } else {
                console.log("txid : " + body);
            }
        });

    }
});

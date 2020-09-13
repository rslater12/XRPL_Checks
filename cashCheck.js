'use strict'
//Cash Check
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://xrpl.ws'});
const address = "";
const secret = "";
const deliveryAddress = "";
var signed;

//cash check
function cashCheck(){
    //xrpl org method
   api.connect().then(() => {
         console.log('Connected')
         const options = {
               "maxLedgerVersionOffset": 60
             }
             return api.prepareCheckCash(deliveryAddress, {
               "checkID": checkID,
               "amount": {
                 "currency": "XRP",
                 "value": "1" 
               }
             }, options)

           }).then(prepared => {
             console.log("txJSON:", prepared.txJSON);

           const txJSON = prepared.txJSON;
               
                signed = api.sign(txJSON, secret)

               console.log("tx_blob is:", signed.signedTransaction)
               console.log("tx hash is:", signed.id)
        const tx_blob = signed.signedTransaction;

                return api.submit(tx_blob)
       }).then(response => {
         console.log("Preliminary Cash Check Transaction Result:", response.resultCode)

})
}

cashCheck()
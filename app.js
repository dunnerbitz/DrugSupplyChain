(function (Contract) {
    var web3_instance;
    var instance;
    var accounts;

// web3 API wird initialisiert
    function init(cb) {
        web3_instance = new Web3( //neuer Konstruktur wird erstellt mit 2 args
            (window.web3 && window.web3.currentProvider) ||
            new Web3.providers.HttpProvider(Contract.endpoint));

        accounts = web3.eth.accounts;

        var contract_interface = web3_instance.eth.contract(Contract.abi);
        instance = contract_interface.at(Contract.address);
        cb(); //callBackFunction wird aufgerufen -> Zeile 48
    }

    function getMessage(cb) {
        instance.message(function (error, result) { //unser initiierte instance mit dem contract wird mit der message aus der contract Datei ausgelesen
            cb(error, result);
        });
    }

    function updateMessage(){
        let newMessage = $("#message-input").val();
        if (newMessage && newMessage.length > 0){
            instance.update.sendTransaction(newMessage, {from: accounts[0], gas: 30000}, function(error, result){
                if(error){
                    alert("Error in der Transaktion");
                }
                else{
                    setTimeout(function(){ //da noch kein Block-Listener möglich, wird hier mit setTimeout gearbeitet
                        getMessage(function (error, result) {
                            if (error) {
                                console.error("Could not get article:", error);
                                return;
                            }
                            $('#message').html(result);
                        });
                    }, 1000);
                }
            });
        }
        else{
            alert("Keine neue Nachricht definiert");
        }
    }

    $(document).ready(function () { //.ready JQuery func, wenn Seite geladen ist, wird diese aufgerufen
        init(function () {
            getMessage(function (error, result) { //getMessage func in Zeile 16 wird aufgerufen
                if (error) {
                    console.error("Could not get article:", error);
                    return;
                }
                $('#message').append(result);
            });
        });
        $("#submit").click(function(){
            updateMessage();
        });
    });
})(Contracts['DrugSupplyChain']);

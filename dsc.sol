pragma solidity ^0.4.17;

contract DrugSupplyChain {
    string public message;

    function DrugSupplyChain(string message2) public {
        message=message2;
    }

    function update(string message2) public {
        message=message2;
    }
}

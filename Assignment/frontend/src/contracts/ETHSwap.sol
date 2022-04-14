// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Token.sol";

contract ETHSwap {
    LunCoin public token;
    address owner;
    
    constructor(LunCoin _token) public {
        token = _token;
        owner = msg.sender;
    }

    function buyTokens() public payable returns (bool) {
        // Calculate the number of tokens to buy
        uint tokenAmount = msg.value;
        
        require(tokenAmount > 0, "You need to send some Ether");
    
        // Transfer tokens to the user
        token.transferFrom(owner,msg.sender, tokenAmount);
        return true;
    }
}
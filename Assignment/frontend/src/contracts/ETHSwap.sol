// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Token.sol";

contract ETHSwap {
    LunCoin public token;
    address owner;
    
    // step to buy a token
    // 1. call approve function
    // 2 call allowance function
    // 3. call buyTokens function
    
    constructor(LunCoin _token) public {
        token = _token;
        owner = msg.sender;
    }

    function buyTokens() public payable returns (bool) {
        // Calculate the number of tokens to buy
        uint tokenAmount = 1;
        
        require(tokenAmount > 0, "You need to send some Ether");
    
        // Transfer tokens to the user
        token.transferFrom(owner,msg.sender, tokenAmount);
        return true;
    }
}